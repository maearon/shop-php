# app/services/products/size_guide_service.rb

module Products
  class SizeGuideService
    def initialize(product)
      @product = product
    end

    def call
      case @product.category&.downcase
      when 'shoes'
        "True to size. We recommend ordering your usual size."
      when 'apparel'
        "Regular fit. Check our size chart for detailed measurements."
      else
        "Please refer to our size guide for the best fit."
      end
    end
  end
end
