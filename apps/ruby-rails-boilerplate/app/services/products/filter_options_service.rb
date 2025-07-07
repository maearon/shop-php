# app/services/products/filter_options_service.rb

module Products
  class FilterOptionsService
    def initialize(products)
      @products = products
    end

    def call
      {
        gender: count_for(:gender),
        category: count_for(:category),
        activity: count_for(:activity),
        brand: count_for(:brand),
        sport: count_for(:sport),
        material: material_counts,
        colors: color_counts,
        sizes: size_counts,
        models: model_counts,
        collections: collection_counts,
        price_range: price_range
      }
    end

    private

    def count_for(field)
      @products.group(field).count.map do |value, count|
        { value: value, label: value&.humanize, count: count }
      end
    end

    def material_counts
      @products.pluck(:material).compact.group_by(&:itself).transform_values(&:count).map do |material, count|
        { value: material, label: material, count: count }
      end
    end

    def color_counts
      @products.joins(:variants).pluck('variants.color').compact.group_by(&:itself).transform_values(&:count).map do |color, count|
        { value: color, label: color, count: count }
      end
    end

    def size_counts
      sizes = Hash.new(0)
      @products.joins(:variants).pluck('variants.sizes').flatten.compact.each do |size|
        sizes[size] += 1
      end
      sizes.map { |size, count| { value: size, label: size, count: count } }
    end

    def model_counts
      @products.pluck(:model_number).compact.group_by(&:itself).transform_values(&:count).map do |model, count|
        { value: model, label: model, count: count }
      end
    end

    def collection_counts
      @products.pluck(:collection).compact.group_by(&:itself).transform_values(&:count).map do |col, count|
        { value: col, label: col, count: count }
      end
    end

    def price_range
      {
        min: @products.minimum(:price)&.to_i || 0,
        max: @products.maximum(:price)&.to_i || 500
      }
    end
  end
end
