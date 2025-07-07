module Api
  class ProductsController < Api::ApiController
    before_action :authenticate!, except: %i[index show filters]
    before_action :set_product, only: %i[update destroy]
    before_action :set_cors_headers

    def index
      products = Products::FindService.new(params).call
      meta = Products::MetaService.new(products, params).call

      render :index, locals: { products:, meta: }
    end

    def show
      product = Product
                  .includes(variants: [:sizes, images_attachments: :blob])
                  .find_by!(model_number: params[:model_number])

      related_products = Products::RelatedProductsService.new(product).call
      breadcrumb = Products::BreadcrumbService.new(params[:slug]).call

      render json: {
        data: product,
        related_products: related_products,
        breadcrumb: breadcrumb
      }
    end

    def filters
      base_products = Products::SlugFilterService.new(Product.includes(:variants), params[:slug]).call
      filters = Products::FilterOptionsService.new(base_products).call
      render json: filters
    end

    def create
      product = Product.new(product_params)
      if product.save
        Rabbitmq::ProductEventPublisher.publish(product)
        render json: product, status: :created
      else
        response422_with_error(product.errors.messages)
      end
    end

    def update
      if @product.update(product_params)
        render json: @product, status: :ok
      else
        response422_with_error(@product.errors.messages)
      end
    end

    def destroy
      @product.destroy
      response200
    end

    private

    def set_product
      @product = Product.find_by!(model_number: params[:id])
    end

    def product_params
      params.require(:product).permit(
        :name, :description_h5, :description_p, :care, :specifications,
        :brand, :gender, :sport, :category, :product_type,
        :model_number, :franchise, :slug, :badge, :status, :is_featured,
        :model_base_id, :collaboration_id, tag_ids: []
      )
    end

    def set_cors_headers
      response.headers['Access-Control-Allow-Origin'] = '*'
      response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
      response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    end
  end
end
