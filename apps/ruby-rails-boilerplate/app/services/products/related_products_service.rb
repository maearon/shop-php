# app/services/products/related_products_service.rb

module Products
  class RelatedProductsService
    def initialize(product)
      @product = product
    end

    def call
      Product.where.not(id: @product.id)
             .where(category: @product.category, gender: @product.gender)
             .includes(:variants, :reviews)
             .limit(4)
    end
  end
end
