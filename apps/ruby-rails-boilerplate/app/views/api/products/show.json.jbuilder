json.extract! @product, :id, :name, :jan_code, :gender, :franchise, :producttype, :brand,
                         :category, :sport, :description_h5, :description_p, :specifications,
                         :care, :created_at, :updated_at

json.variants @product.variants do |variant|
  json.id variant.id
  json.color variant.color
  json.price variant.price
  json.originalprice variant.originalprice
  json.sku variant.sku
  json.stock variant.stock
  json.size variant.sizes.pluck(:label) # Assuming each size has a label json.size variant.sizes.map { |s| s.label }
  json.images variant.images.select(&:persisted?).map { |image|
    "#{request.ssl? ? 'https' : 'http'}://#{request.env['HTTP_HOST']}#{url_for(image)}"
  }
  json.product_id variant.product_id
  json.created_at variant.created_at
  json.updated_at variant.updated_at
end
