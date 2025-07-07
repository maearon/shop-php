# app/services/products/feature_service.rb

module Products
  class FeatureService
    def initialize(product)
      @product = product
    end

    def call
      return default_features unless @product.specifications.present?

      # Tuỳ ý xử lý parsing nếu specifications là JSON hoặc string
      begin
        parsed = JSON.parse(@product.specifications)
        parsed["features"] || default_features
      rescue JSON::ParserError
        default_features
      end
    end

    private

    def default_features
      [
        "Get delivery dates",
        "Free standard shipping with adiClub",
        "Free 30 day returns"
      ]
    end
  end
end
