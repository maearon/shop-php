# app/services/products/breadcrumb_service.rb

module Products
  class BreadcrumbService
    def initialize(slug)
      @slug = slug
    end

    def call
      return "Home" unless @slug.present?

      predefined = {
        'men-soccer-shoes' => "Home / Soccer / Shoes",
        'women-running-shoes' => "Home / Women / Running / Shoes",
        'men-tops' => "Home / Men / Clothing / Tops",
        'women-tops' => "Home / Women / Clothing / Tops"
      }

      predefined[@slug] || default_breadcrumb
    end

    private

    def default_breadcrumb
      "Home / " + @slug.to_s.split('-').map(&:capitalize).join(' / ')
    end
  end
end
