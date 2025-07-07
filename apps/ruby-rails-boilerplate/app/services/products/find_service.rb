# app/services/products/filter_service.rb

module Products
  class FilterService
    def initialize(scope, params)
      @scope = scope
      @params = params
    end

    def call
      apply_filters
      @scope
    end

    private

    def apply_filters
      apply_simple_filters
      apply_material_filter
      apply_color_filter
      apply_size_filter
      apply_model_filter
      apply_collection_filter
      apply_price_range_filter
      apply_shipping_filter
    end

    def apply_simple_filters
      {
        gender: :gender,
        category: :category,
        activity: :activity,
        product_type: :product_type,
        brand: :brand,
        sport: :sport
      }.each do |param_key, field|
        next unless @params[param_key].present?

        values = @params[param_key].split(',').map(&:downcase)
        @scope = @scope.where("LOWER(#{field}) IN (?)", values)
      end
    end

    def apply_material_filter
      return unless @params[:material].present?

      materials = @params[:material].split(',')
      @scope = @scope.where("LOWER(material) ILIKE ANY (ARRAY[?])", materials.map { |m| "%#{m.downcase}%" })
    end

    def apply_color_filter
      return unless @params[:color].present?

      colors = @params[:color].split(',')
      @scope = @scope.joins(:variants).where("LOWER(variants.color) ILIKE ANY (ARRAY[?])", colors.map { |c| "%#{c.downcase}%" }).distinct
    end

    def apply_size_filter
      return unless @params[:size].present?

      sizes = @params[:size].split(',')
      @scope = @scope.joins(:variants).where("variants.sizes && ARRAY[?]::varchar[]", sizes).distinct
    end

    def apply_model_filter
      return unless @params[:model].present?

      models = @params[:model].split(',')
      @scope = @scope.where("LOWER(model_number) ILIKE ANY (ARRAY[?])", models.map { |m| "%#{m.downcase}%" })
    end

    def apply_collection_filter
      return unless @params[:collection].present?

      collections = @params[:collection].split(',')
      @scope = @scope.where("LOWER(collection) ILIKE ANY (ARRAY[?])", collections.map { |c| "%#{c.downcase}%" })
    end

    def apply_price_range_filter
      if @params[:min_price].present?
        @scope = @scope.where("price >= ?", @params[:min_price].to_f)
      end
      if @params[:max_price].present?
        @scope = @scope.where("price <= ?", @params[:max_price].to_f)
      end
    end

    def apply_shipping_filter
      return unless @params[:shipping].present? && @params[:shipping].include?('prime')

      @scope = @scope.where(prime_shipping: true)
    end
  end
end
