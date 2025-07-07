# app/services/products/slug_filter_service.rb

module Products
  class SlugFilterService
    SLUG_FILTER_MAP = {
      'men-soccer-shoes' => { gender: 'men', sport: 'soccer', category: 'shoes' },
      'women-soccer-shoes' => { gender: 'women', sport: 'soccer', category: 'shoes' },
      'men-running-shoes' => { gender: 'men', sport: 'running', category: 'shoes' },
      'women-running-shoes' => { gender: 'women', sport: 'running', category: 'shoes' },
      'men-basketball-shoes' => { gender: 'men', sport: 'basketball', category: 'shoes' },
      'men-tops' => { gender: 'men', category: 'tops' },
      'women-tops' => { gender: 'women', category: 'tops' }
    }

    def initialize(scope, slug)
      @scope = scope
      @slug = slug&.downcase
    end

    def call
      return @scope unless @slug.present? && SLUG_FILTER_MAP[@slug]

      conditions = SLUG_FILTER_MAP[@slug]
      where_clause = conditions.map { |k, _| "LOWER(#{k}) = ?" }.join(" AND ")
      values = conditions.values.map(&:downcase)
      @scope.where(where_clause, *values)
    end
  end
end
