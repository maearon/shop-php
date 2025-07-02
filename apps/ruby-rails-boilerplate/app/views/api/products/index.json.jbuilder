json.products @products do |product|
  variant = product.variants.first

  json.id product.id
  json.jan_code product.jan_code
  json.title product.name
  json.name product.name
  json.description product.description_p || product.description
  json.description_h5 product.description_h5
  json.specifications product.specifications
  json.care product.care

  json.gender product.gender
  json.franchise product.franchise
  json.producttype product.producttype
  json.brand product.brand
  json.category product.category
  json.sport product.sport

  json.currencyId currency_code(locale.to_s)
  json.currencyFormat I18n.t("number.currency.format.unit", locale: locale.to_s)
  json.isFreeShipping true

  json.availableSizes variant&.sizes || []
  json.price variant&.price
  json.original_price variant&.originalprice
  json.installments variant&.stock

  json.created_at product.created_at
  json.updated_at product.updated_at

  # 👇 Render tất cả variants
  json.variants product.variants do |variant|
    json.id variant.id
    json.color variant.color
    json.price variant.price
    json.original_price variant.originalprice
    json.sku variant.sku
    json.stock variant.stock
    json.sizes variant.sizes
    json.product_id variant.product_id
    json.created_at variant.created_at
    json.updated_at variant.updated_at

    json.images variant.images.map { |image|
      "#{request.ssl? ? 'https' : 'http'}://#{request.env['HTTP_HOST']}#{url_for(image.variant(resize_to_limit: [500, 500]))}"
    }.compact

    json.avatar_url(
      "#{request.ssl? ? 'https' : 'http'}://#{request.env['HTTP_HOST']}#{url_for(image.variant(resize_to_limit: [500, 500]))}"
    )
  end

  # 👇 Ảnh đại diện là ảnh của variant đầu tiên
  main_variant = product.variants.first
  json.image_url(
    "#{request.ssl? ? 'https' : 'http'}://#{request.env['HTTP_HOST']}#{url_for(image.variant(resize_to_limit: [500, 500]))}"
  )
end

json.meta do
  json.current_page @products.current_page
  json.total_pages @products.total_pages
  json.total_count @products.total_count
  json.per_page @products.limit_value
  json.filters_applied build_applied_filters
end
