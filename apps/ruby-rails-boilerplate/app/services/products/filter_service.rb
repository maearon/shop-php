module Products
  class FilterService
    attr_reader :scope, :params

    def initialize(scope, params)
      @scope = scope
      @params = params
    end

    def apply
      apply_slug_filters
      apply_dynamic_filters
      apply_material_color_size_model_collection
      apply_price_shipping
      scope.distinct
    end

    def apply_slug_only
      apply_slug_filters
      scope
    end

    def self.build_applied_filters(params)
      filters = {}
      %i[gender category activity brand sport material color size model collection sort min_price max_price shipping].each do |key|
        filters[key] = params[key].split(',') if params[key].present? && key != :sort
        filters[key] = params[key] if key == :sort && params[key].present?
      end
      filters
    end

    private

    def apply_slug_filters
      case params[:slug]&.downcase
      when 'men-soccer-shoes'
        @scope = iwhere(gender: 'men', sport: 'soccer', category: 'shoes')
      when 'women-soccer-shoes'
        @scope = iwhere(gender: 'women', sport: 'soccer', category: 'shoes')
      when 'men-running-shoes'
        @scope = iwhere(gender: 'men', sport: 'running', category: 'shoes')
      when 'women-running-shoes'
        @scope = iwhere(gender: 'women', sport: 'running', category: 'shoes')
      when 'men-basketball-shoes'
        @scope = iwhere(gender: 'men', sport: 'basketball', category: 'shoes')
      when 'men-tops'
        @scope = iwhere(gender: 'men', category: 'tops')
      when 'women-tops'
        @scope = iwhere(gender: 'women', category: 'tops')
      end
    end

    def apply_dynamic_filters
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
          @scope = scope.where("LOWER(#{field}) IN (?)", values)
        end
      end
    end

    def apply_material_color_size_model_collection
      if params[:material].present?
        materials = params[:material].split(',')
        @scope = scope.where("LOWER(material) ILIKE ANY (ARRAY[?])", materials.map { |m| "%#{m.downcase}%" })
      end

      if params[:color].present?
        colors = params[:color].split(',')
        @scope = scope.joins(:variants).where("LOWER(variants.color) ILIKE ANY (ARRAY[?])", colors.map { |c| "%#{c.downcase}%" })
      end

      if params[:size].present?
        sizes = params[:size].split(',')
        @scope = scope.joins(:variants).where("variants.sizes && ARRAY[?]::varchar[]", sizes)
      end

      if params[:model].present?
        models = params[:model].split(',')
        @scope = scope.where("LOWER(model_number) ILIKE ANY (ARRAY[?])", models.map { |m| "%#{m.downcase}%" })
      end

      if params[:collection].present?
        collections = params[:collection].split(',')
        @scope = scope.where("LOWER(collection) ILIKE ANY (ARRAY[?])", collections.map { |c| "%#{c.downcase}%" })
      end
    end

    def apply_price_shipping
      if params[:min_price].present?
        @scope = scope.where('price >= ?', params[:min_price].to_f)
      end

      if params[:max_price].present?
        @scope = scope.where('price <= ?', params[:max_price].to_f)
      end

      if params[:shipping].present? && params[:shipping].include?('prime')
        @scope = scope.where(prime_shipping: true)
      end
    end

    def iwhere(conditions)
      clause = conditions.map { |k, _| "LOWER(#{k}) = ?" }.join(" AND ")
      values = conditions.values.map(&:downcase)
      scope.where(clause, *values)
    end
  end
end
