# app/services/products/badge_service.rb

module Products
  class BadgeService
    def initialize(product)
      @product = product
    end

    def call
      return "Best seller" if best_seller?
      return "New" if new_product?
      return "Sale" if on_sale?
      nil
    end

    private

    def best_seller?
      @product.reviews.count > 100 && average_rating >= 4.5
    end

    def new_product?
      @product.created_at > 30.days.ago
    end

    def on_sale?
      @product.variants.any? do |variant|
        variant.original_price.present? && variant.price < variant.original_price
      end
    end

    def average_rating
      @product.reviews.average(:rating)&.round(1) || 0
    end
  end
end
