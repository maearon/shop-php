json.id cart_item.id
json.product_id cart_item.product_id
json.variant_id cart_item.variant_id
json.quantity cart_item.quantity

json.product do
  json.name cart_item.product.name
  json.price cart_item.product.price
  # Add more fields as needed
end

json.variant do
  json.name cart_item.variant.name
  json.sku cart_item.variant.sku
  # Add more fields as needed
end
