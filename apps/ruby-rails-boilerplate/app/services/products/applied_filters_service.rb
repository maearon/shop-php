# app/services/products/applied_filters_service.rb

module Products
  class AppliedFiltersService
    def initialize(params)
      @params = params
    end

    def call
      filters = {}

      {
        gender: :gender,
        category: :category,
        activity: :activity,
        brand: :brand,
        sport: :sport,
        material: :material,
        color: :color,
        size: :size,
        model: :model,
        collection: :collection,
        shipping: :shipping
      }.each do |param_key, filter_key|
        filters[filter_key] = @params[param_key].split(',') if @params[param_key].present?
      end

      filters[:sort] = @params[:sort] if @params[:sort].present?
      filters[:min_price] = @params[:min_price] if @params[:min_price].present?
      filters[:max_price] = @params[:max_price] if @params[:max_price].present?

      filters
    end
  end
end
