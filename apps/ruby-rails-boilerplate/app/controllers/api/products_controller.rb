class Api::ProductsController < Api::ApiController
  before_action :authenticate!, except: %i[index show]
  before_action :set_product, only: %i[show update destroy]

  def index
    # Handle slug-based filtering
    # query = params[:q].present? ? { name_cont: params[:q] } : {}
    filters = build_filters_from_slug
    
    # Combine with search query if present
    if params[:q].present?
      filters[:name_cont] = params[:q]
    end

    # Apply additional filters from params
    filters.merge!(extract_filter_params)
    
    # @products = Product.ransack(query).result(distinct: true).page(params[:page])
    @products = Product.ransack(filters).result(distinct: true)
                      .includes(:variants)
                      .page(params[:page])
                      .per(params[:per_page] || 20)

    # Return metadata for frontend
    render json: {
      products: @products.map { |product| serialize_product(product) },
      meta: {
        current_page: @products.current_page,
        total_pages: @products.total_pages,
        total_count: @products.total_count,
        per_page: @products.limit_value,
        filters_applied: filters,
        category_info: get_category_info
      }
    }
  end

  def show
    # @product.variants.each do |variant|
    #   puts "Variant #{variant.color}:"
    #   variant.sizes.each do |size|
    #     puts "- #{size.label} (#{size.system})"
    #   end
    # end

    # render json: @product

    # render json: {
    #   product: serialize_product_detail(@product),
    #   related_products: get_related_products(@product)
    # }
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      Rabbitmq::ProductEventPublisher.publish(@product)
      render json: @product, status: :created
      # render json: serialize_product(@product), status: :created
    else
      response422_with_error(@product.errors.messages)
    end
  end

  def update
    if @product.update(product_params)
      render json: @product, status: :ok
      # render json: serialize_product(@product), status: :ok
    else
      response422_with_error(@product.errors.messages)
    end
  end

  def destroy
    @product.destroy
    response200
  end

  # New endpoint for getting filter options
  def filters
    render json: {
      genders: Product::GENDER,
      categories: Product::CATEGORY,
      sports: Product::SPORT,
      brands: Product::BRAND,
      sizes: Product::SIZES,
      price_ranges: [
        { label: "Under $50", min: 0, max: 50 },
        { label: "$50 - $100", min: 50, max: 100 },
        { label: "$100 - $150", min: 100, max: 150 },
        { label: "$150+", min: 150, max: nil }
      ]
    }
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :stock, :category_id, :brand, :gender, :sport, :category, :jan_code, :specifications, :description_h5, :description_p, :care)
  end

  def build_filters_from_slug
    slug = params[:slug]
    return {} unless slug.present?

    filters = {}
    
    # Map slug to filters based on our category config
    case slug
    when 'men-soccer-shoes'
      filters[:gender_eq] = 'Men'
      filters[:sport_eq] = 'Soccer'
      filters[:category_eq] = 'Shoes'
    when 'men-tops'
      filters[:gender_eq] = 'Men'
      filters[:category_eq] = 'Apparel'
      filters[:producttype_eq] = 'Wear'
    when 'women-running-shoes'
      filters[:gender_eq] = 'Women'
      filters[:sport_eq] = 'Running'
      filters[:category_eq] = 'Shoes'
    when 'kids-soccer-shoes'
      filters[:gender_eq] = 'Kids'
      filters[:sport_eq] = 'Soccer'
      filters[:category_eq] = 'Shoes'
    when /^men/
      filters[:gender_eq] = 'Men'
    when /^women/
      filters[:gender_eq] = 'Women'
    when /^kids/
      filters[:gender_eq] = 'Kids'
    end

    # Extract additional filters from slug patterns
    if slug.include?('shoes')
      filters[:category_eq] = 'Shoes'
    elsif slug.include?('clothing') || slug.include?('tops') || slug.include?('pants')
      filters[:category_eq] = 'Apparel'
    elsif slug.include?('accessories')
      filters[:category_eq] = 'Accessories'
    end

    if slug.include?('soccer')
      filters[:sport_eq] = 'Soccer'
    elsif slug.include?('running')
      filters[:sport_eq] = 'Running'
    elsif slug.include?('football')
      filters[:sport_eq] = 'Football'
    end

    filters
  end

  def extract_filter_params
    filters = {}
    
    # Handle standard filter parameters
    filters[:gender_eq] = params[:gender] if params[:gender].present?
    filters[:category_eq] = params[:category] if params[:category].present?
    filters[:sport_eq] = params[:sport] if params[:sport].present?
    filters[:brand_eq] = params[:brand] if params[:brand].present?
    
    # Handle price range
    if params[:min_price].present?
      filters[:price_gteq] = params[:min_price]
    end
    if params[:max_price].present?
      filters[:price_lteq] = params[:max_price]
    end

    # Handle size filtering (through variants)
    if params[:size].present?
      filters[:variants_sizes_label_eq] = params[:size]
    end

    # Handle color filtering (through variants)
    if params[:color].present?
      filters[:variants_color_eq] = params[:color]
    end

    filters
  end

  def serialize_product(product)
    {
      id: product.id,
      name: product.name,
      price: product.price || 0,
      brand: product.brand,
      category: product.category,
      gender: product.gender,
      sport: product.sport,
      jan_code: product.jan_code,
      description: product.description_p,
      image_url: "/placeholder.svg?height=400&width=400", # Replace with actual image logic
      variants: product.variants.map { |variant| serialize_variant(variant) },
      slug: generate_product_slug(product)
    }
  end

  def serialize_product_detail(product)
    serialize_product(product).merge({
      specifications: product.specifications,
      description_h5: product.description_h5,
      care: product.care,
      reviews_count: product.reviews.count,
      average_rating: calculate_average_rating(product)
    })
  end

  def serialize_variant(variant)
    {
      id: variant.id,
      color: variant.color,
      sizes: variant.sizes.map { |size| 
        {
          id: size.id,
          label: size.label,
          system: size.system,
          available: size.stock > 0
        }
      }
    }
  end

  def get_category_info
    slug = params[:slug]
    return {} unless slug.present?

    # Return category information based on slug
    case slug
    when 'men-soccer-shoes'
      {
        title: "MEN'S SOCCER SHOES",
        breadcrumb: "Men / Soccer / Shoes",
        description: "Find your perfect pair of men's soccer shoes. From firm ground to artificial turf, we have the right cleats for every playing surface."
      }
    when 'men-tops'
      {
        title: "MEN'S TOPS",
        breadcrumb: "Men / Clothing / Tops", 
        description: "Discover our collection of men's tops. From t-shirts to tank tops, find the perfect fit for your active lifestyle."
      }
    when 'women-running-shoes'
      {
        title: "WOMEN'S RUNNING SHOES",
        breadcrumb: "Women / Running / Shoes",
        description: "Step up your running game with our women's running shoes. Designed for comfort, performance and style."
      }
    when 'kids-soccer-shoes'
      {
        title: "KIDS' SOCCER SHOES", 
        breadcrumb: "Kids / Soccer / Shoes",
        description: "Get your young athlete ready for the field with our kids' soccer shoes collection."
      }
    else
      {
        title: slug.upcase.gsub('-', ' '),
        breadcrumb: generate_breadcrumb(slug),
        description: "Discover our collection of #{slug.gsub('-', ' ')}."
      }
    end
  end

  def generate_product_slug(product)
    "#{product.gender&.downcase}-#{product.category&.downcase}-#{product.id}"
  end

  def generate_breadcrumb(slug)
    parts = slug.split('-')
    parts.map(&:capitalize).join(' / ')
  end

  def get_related_products(product)
    Product.where.not(id: product.id)
           .where(category: product.category, gender: product.gender)
           .limit(4)
           .map { |p| serialize_product(p) }
  end

  def calculate_average_rating(product)
    return 0 if product.reviews.empty?
    product.reviews.average(:rating)&.round(1) || 0
  end
end
