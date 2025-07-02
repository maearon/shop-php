class Api::ProductsController < Api::ApiController
  before_action :authenticate!, except: %i[index show]
  before_action :set_product, only: %i[show update destroy]
  before_action :set_cors_headers

  def index
    @products = Product.includes(:variants, :reviews)

    apply_slug_filters if params[:slug].present?
    apply_filters
    apply_sorting

    page = params[:page]&.to_i || 1
    per_page = params[:per_page]&.to_i || 24
    @products = @products.page(page).per(per_page)

    # render json: {
    #   products: serialize_products(@products),
    #   meta: {
    #     current_page: @products.current_page,
    #     total_pages: @products.total_pages,
    #     total_count: @products.total_count,
    #     per_page: per_page,
    #     filters_applied: build_applied_filters
    #   }
    # }
  end

   # GET /api/products/:model_number?slug=men-soccer-shoes
  # For product detail pages like /men-soccer-shoes/JP5593
  def show
    # Find product by model number (JP5593) instead of ID
    if params[:id].match?(/^[A-Z]{2}\d{4}$/) # Model number format like JP5593
      @product = Product.includes(:variants, :reviews).find_by!(jan_code: params[:id])
    else
      @product = Product.find(params[:id])
    end

    # render json: {
    #   product: serialize_product_detail(@product),
    #   related_products: get_related_products(@product),
    #   category_info: get_category_info,
    #   breadcrumb: generate_breadcrumb_from_slug
    # }
  end

  # GET /api/products/filters?slug=men-soccer-shoes
  # New endpoint for getting filter options
  def filters
    slug = params[:slug]
    base_products = Product.includes(:variants)

    # Apply slug-based filtering to get relevant products
    if slug.present?
      case slug.downcase
      when 'men-soccer-shoes'
        base_products = iwhere(base_products, gender: 'men', sport: 'soccer', category: 'shoes')
      when 'women-soccer-shoes'
        base_products = iwhere(base_products, gender: 'women', sport: 'soccer', category: 'shoes')
      when 'men-running-shoes'
        base_products = iwhere(base_products, gender: 'men', sport: 'running', category: 'shoes')
      when 'women-running-shoes'
        base_products = iwhere(base_products, gender: 'women', sport: 'running', category: 'shoes')
      when 'men-basketball-shoes'
        base_products = iwhere(base_products, gender: 'men', sport: 'basketball', category: 'shoes')
      when 'men-tops'
        base_products = iwhere(base_products, gender: 'men', category: 'tops')
      when 'women-tops'
        base_products = iwhere(base_products, gender: 'women', category: 'tops')
      end
    end

    # Get available filter options with counts
    filters = {
      gender: get_filter_counts(base_products, :gender),
      category: get_filter_counts(base_products, :category),
      activity: get_filter_counts(base_products, :activity),
      brand: get_filter_counts(base_products, :brand),
      sport: get_filter_counts(base_products, :sport),
      material: get_material_counts(base_products),
      colors: get_color_counts(base_products),
      sizes: get_size_counts(base_products),
      models: get_model_counts(base_products),
      collections: get_collection_counts(base_products),
      price_range: {
        min: base_products.minimum(:price)&.to_i || 0,
        max: base_products.maximum(:price)&.to_i || 500
      }
    }

    render json: filters
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
  # def filters
  #   render json: {
  #     genders: Product::GENDER,
  #     categories: Product::CATEGORY,
  #     sports: Product::SPORT,
  #     brands: Product::BRAND,
  #     sizes: Product::SIZES,
  #     price_ranges: [
  #       { label: "Under $50", min: 0, max: 50 },
  #       { label: "$50 - $100", min: 50, max: 100 },
  #       { label: "$100 - $150", min: 100, max: 150 },
  #       { label: "$150+", min: 150, max: nil }
  #     ]
  #   }
  # end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :stock, :category_id, :brand, :gender, :sport, :category, :jan_code, :specifications, :description_h5, :description_p, :care)
  end

  # private

  def set_cors_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
  end

  def iwhere(scope, conditions)
    where_clause = conditions.map { |k, _| "LOWER(#{k}) = ?" }.join(" AND ")
    values = conditions.values.map(&:downcase)
    scope.where(where_clause, *values)
  end

  def apply_slug_filters
    case params[:slug].downcase
    when 'men-soccer-shoes'
      @products = iwhere(@products, gender: 'men', sport: 'soccer', category: 'shoes')
    when 'women-soccer-shoes'
      @products = iwhere(@products, gender: 'women', sport: 'soccer', category: 'shoes')
    when 'men-running-shoes'
      @products = iwhere(@products, gender: 'men', sport: 'running', category: 'shoes')
    when 'women-running-shoes'
      @products = iwhere(@products, gender: 'women', sport: 'running', category: 'shoes')
    when 'men-basketball-shoes'
      @products = iwhere(@products, gender: 'men', sport: 'basketball', category: 'shoes')
    when 'men-tops'
      @products = iwhere(@products, gender: 'men', category: 'tops')
    when 'women-tops'
      @products = iwhere(@products, gender: 'women', category: 'tops')
    end
  end

  def apply_filters
    # Gender filter
    # Category filter
    # Activity filter
    # Product type filter
    # Brand filter
    # Sport filter
    {
      gender: :gender,
      category: :category,
      activity: :activity,
      product_type: :product_type,
      brand: :brand,
      sport: :sport
    }.each do |param_key, field|
      if params[param_key].present?
        values = params[param_key].split(',').map(&:downcase)
        @products = @products.where("LOWER(#{field}) IN (?)", values)
      end
    end

     # Material filter
    if params[:material].present?
      materials = params[:material].split(',')
      @products = @products.where("LOWER(material) ILIKE ANY (ARRAY[?])", materials.map { |m| "%#{m.downcase}%" })
    end

    # Color filter
    if params[:color].present?
      colors = params[:color].split(',')
      @products = @products.joins(:variants).where("LOWER(variants.color) ILIKE ANY (ARRAY[?])", colors.map { |c| "%#{c.downcase}%" }).distinct
    end

    # Size filter
    if params[:size].present?
      sizes = params[:size].split(',')
      @products = @products.joins(:variants).where("variants.sizes && ARRAY[?]::varchar[]", sizes).distinct
    end

    # Model filter
    if params[:model].present?
      models = params[:model].split(',')
      @products = @products.where("LOWER(model_number) ILIKE ANY (ARRAY[?])", models.map { |m| "%#{m.downcase}%" })
    end

    # Collection filter
    if params[:collection].present?
      collections = params[:collection].split(',')
      @products = @products.where("LOWER(collection) ILIKE ANY (ARRAY[?])", collections.map { |c| "%#{c.downcase}%" })
    end
    # Price range filter
    if params[:min_price].present?
      @products = @products.where('price >= ?', params[:min_price].to_f)
    end

    if params[:max_price].present?
      @products = @products.where('price <= ?', params[:max_price].to_f)
    end

    # Shipping filter
    if params[:shipping].present? && params[:shipping].include?('prime')
      @products = @products.where(prime_shipping: true)
    end
  end

  def apply_sorting
    case params[:sort]
    when 'PRICE (LOW - HIGH)'
      @products = @products.order(:price)
    when 'PRICE (HIGH - LOW)'
      @products = @products.order(price: :desc)
    when 'NEWEST'
      @products = @products.order(created_at: :desc)
    when 'TOP SELLERS'
      @products = @products.left_joins(:reviews)
                           .group('products.id')
                           .order('COUNT(reviews.id) DESC, products.average_rating DESC')
    else
      @products = @products.order(:name)
    end
  end
  
  # def serialize_products(products)
  #   products.map do |product|
  #     first_variant = product.variants.first
  #     {
  #       id: product.id,
  #       name: product.name,
  #       price: first_variant&.price,
  #       original_price: first_variant&.original_price,
  #       brand: product.brand,
  #       category: product.category,
  #       gender: product.gender,
  #       sport: product.sport,
  #       jan_code: product.jan_code,
  #       model_number: product.model_number,
  #       description: product.description,
  #       badge: determine_badge(product),
  #       image_url: product.image_url || '/placeholder.png?height=300&width=300',
  #       variants: serialize_variants(product.variants),
  #       slug: generate_slug(product),
  #       reviews_count: product.reviews.count,
  #       average_rating: product.average_rating || 0
  #     }
  #   end
  # end
  
  # def serialize_variants(variants)
  #   variants.map do |variant|
  #     {
  #       id: variant.id,
  #       color: variant.color,
  #       sizes: variant.sizes,
  #       images: variant.images || [],
  #       stock_quantity: variant.stock_quantity
  #     }
  #   end
  # end
  
  def determine_badge(product)
    return 'Best Seller' if product.reviews.count > 50 && product.average_rating > 4.0
    return 'New' if product.created_at > 30.days.ago
    return 'Sale' if product.original_price && product.original_price > product.price
    nil
  end
  
  def generate_slug(product)
    "#{product.gender}-#{product.category}-#{product.name}".parameterize
  end
  
  def build_applied_filters
    filters = {}
    
    # Add applied filters to response
    filters[:gender] = params[:gender].split(',') if params[:gender].present?
    filters[:category] = params[:category].split(',') if params[:category].present?
    filters[:activity] = params[:activity].split(',') if params[:activity].present?
    filters[:brand] = params[:brand].split(',') if params[:brand].present?
    filters[:sport] = params[:sport].split(',') if params[:sport].present?
    filters[:material] = params[:material].split(',') if params[:material].present?
    filters[:color] = params[:color].split(',') if params[:color].present?
    filters[:size] = params[:size].split(',') if params[:size].present?
    filters[:model] = params[:model].split(',') if params[:model].present?
    filters[:collection] = params[:collection].split(',') if params[:collection].present?
    filters[:sort] = params[:sort] if params[:sort].present?
    filters[:min_price] = params[:min_price] if params[:min_price].present?
    filters[:max_price] = params[:max_price] if params[:max_price].present?
    filters[:shipping] = params[:shipping].split(',') if params[:shipping].present?
    
    filters
  end
  
  def get_filter_counts(products, field)
    products.group(field).count.map do |value, count|
      { value: value, label: value.humanize, count: count }
    end
  end
  
  def get_material_counts(products)
    materials = {}
    products.pluck(:material).compact.each do |material|
      materials[material] = materials[material].to_i + 1
    end
    materials.map { |k, v| { value: k, label: k, count: v } }
  end
  
  def get_color_counts(products)
    colors = {}
    products.joins(:variants).pluck('variants.color').compact.each do |color|
      colors[color] = colors[color].to_i + 1
    end
    colors.map { |k, v| { value: k, label: k, count: v } }
  end
  
  def get_size_counts(products)
    sizes = {}
    products.joins(:variants).pluck('variants.sizes').flatten.compact.each do |size|
      sizes[size] = sizes[size].to_i + 1
    end
    sizes.map { |k, v| { value: k, label: k, count: v } }
  end
  
  def get_model_counts(products)
    models = {}
    products.pluck(:model_number).compact.each do |model|
      models[model] = models[model].to_i + 1
    end
    models.map { |k, v| { value: k, label: k, count: v } }
  end
  
  def get_collection_counts(products)
    collections = {}
    products.pluck(:collection).compact.each do |collection|
      collections[collection] = collections[collection].to_i + 1
    end
    collections.map { |k, v| { value: k, label: k, count: v } }
  end

  # def serialize_product_detail(product)
  #   {
  #     id: product.id,
  #     name: product.name,
  #     price: product.price,
  #     original_price: product.original_price,
  #     brand: product.brand,
  #     category: product.category,
  #     gender: product.gender,
  #     sport: product.sport,
  #     jan_code: product.jan_code,
  #     model_number: product.model_number,
  #     description: product.description,
  #     badge: determine_badge(product),
  #     image_url: product.image_url || '/placeholder.svg?height=300&width=250',
  #     variants: serialize_variants(product.variants),
  #     slug: generate_slug(product),
  #     reviews_count: product.reviews.count,
  #     average_rating: product.average_rating || 0,
  #     specifications: product.specifications,
  #     description_h5: product.description_h5,
  #     care: product.care,
  #     detailed_description: product.description,
  #     features: extract_product_features(product),
  #     size_guide: generate_size_guide(product)
  #   }
  # end

  def get_related_products(product)
    Product.where.not(id: product.id)
           .where(category: product.category, gender: product.gender)
           .includes(:variants, :reviews)
           .limit(4)
           .map { |p| serialize_product(p) }
  end

  def calculate_average_rating(product)
    return 0 if product.reviews.empty?
    product.reviews.average(:rating)&.round(1) || 0
  end

  def determine_badge(product)
    # Logic to determine if product should have a badge
    if product.reviews.count > 100 && calculate_average_rating(product) >= 4.5
      "Best seller"
    elsif product.created_at > 30.days.ago
      "New"
    elsif product.variants.any? { |v| v.original_price && v.price < v.original_price }
      "Sale"
    else
      nil
    end
  end

  def extract_product_features(product)
    # Extract features from product specifications or return default features
    if product.specifications.present?
      # Parse specifications JSON or text to extract features
      []
    else
      [
        "Get delivery dates",
        "Free standard shipping with adiClub", 
        "Free 30 day returns"
      ]
    end
  end

  def generate_size_guide(product)
    case product.category&.downcase
    when 'shoes'
      "True to size. We recommend ordering your usual size."
    when 'apparel'
      "Regular fit. Check our size chart for detailed measurements."
    else
      "Please refer to our size guide for the best fit."
    end
  end

  def generate_breadcrumb_from_slug
    slug = params[:slug]
    return "Home" unless slug.present?

    case slug
    when 'men-soccer-shoes'
      "Home / Soccer / Shoes"
    when 'men-tops'
      "Home / Men / Clothing / Tops"
    when 'women-running-shoes'
      "Home / Women / Running / Shoes"
    else
      "Home / #{generate_breadcrumb(slug)}"
    end
  end

  def generate_breadcrumb(slug)
    parts = slug.split('-')
    parts.map(&:capitalize).join(' / ')
  end
end
