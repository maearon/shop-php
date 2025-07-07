# app/services/products/sort_service.rb

module Products
  class SortService
    def initialize(scope, sort_param)
      @scope = scope
      @sort_param = sort_param
    end

    def call
      case @sort_param&.upcase
      when 'PRICE (LOW - HIGH)'
        @scope.order(price: :asc)
      when 'PRICE (HIGH - LOW)'
        @scope.order(price: :desc)
      when 'NEWEST'
        @scope.order(created_at: :desc)
      when 'TOP SELLERS'
        @scope.left_joins(:reviews)
              .group('products.id')
              .order('COUNT(reviews.id) DESC, products.average_rating DESC')
      else
        @scope.order(:name)
      end
    end
  end
end
