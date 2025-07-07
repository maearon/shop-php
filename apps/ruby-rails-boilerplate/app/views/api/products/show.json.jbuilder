json.extract! @product, :id, :name, :model_number, :gender, :franchise, :product_type, :brand,
                         :category, :sport, :description_h5, :description_p, :specifications,
                         :care, :created_at, :updated_at

json.title @product.name
json.slug @product.slug
json.currencyId currency_code(locale.to_s)
json.currencyFormat I18n.t("number.currency.format.unit", locale: locale.to_s)
json.isFreeShipping true

# ✅ Main image từ product.image
main_image =
  if @product.image.attached?
    begin
      url_for(@product.image.variant(resize_to_limit: [500, 500]))
    rescue
      "/placeholder.svg"
    end
  else
    "/placeholder.svg"
  end

json.main_image_url "#{request.base_url}#{main_image}"

# ✅ Hover image từ product.hover_image
hover_image =
  if @product.hover_image.attached?
    begin
      url_for(@product.hover_image.variant(resize_to_limit: [500, 500]))
    rescue
      "/placeholder.svg"
    end
  else
    "/placeholder.svg"
  end

json.hover_image_url "#{request.base_url}#{hover_image}"

# 👉 Tất cả biến thể (variants)
json.variants @product.variants do |variant|
  json.id variant.id
  json.color variant.color
  json.price variant.price
  json.compare_at_price variant.compare_at_price
  json.sku variant.sku
  json.stock variant.stock
  json.sizes variant.sizes.pluck(:label)
  json.product_id variant.product_id
  json.created_at variant.created_at
  json.updated_at variant.updated_at

  avatar_url =
    if variant.avatar.attached?
      begin
        url_for(variant.avatar.variant(resize_to_limit: [500, 500]))
      rescue
        "/placeholder.svg"
      end
    else
      "/placeholder.svg"
    end

  hover_url =
    if variant.hover.attached?
      begin
        url_for(variant.hover.variant(resize_to_limit: [500, 500]))
      rescue
        "/placeholder.svg"
      end
    else
      "/placeholder.svg"
    end

  json.avatar_url "#{request.base_url}#{avatar_url}"
  json.hover_url "#{request.base_url}#{hover_url}"

  # 🔁 Detail images
  image_urls = variant.images.select(&:attached?).map do |img|
    begin
      url_for(img.variant(resize_to_limit: [500, 500]))
    rescue
      nil
    end
  end.compact

  json.image_urls image_urls.map { |url| "#{request.base_url}#{url}" }
end

# Optional: breadcrumb + related products
json.breadcrumb @breadcrumb if defined?(@breadcrumb)
json.related_products @related_products if defined?(@related_products)
