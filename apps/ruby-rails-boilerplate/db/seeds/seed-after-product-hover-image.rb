product = Product.find(1)

# Xoá ảnh cũ nếu có
product.image.purge if product.image.attached?
product.hover_image.purge if product.hover_image.attached?

# Đường dẫn thư mục chứa ảnh
dir_path = Rails.root.join("app/assets/images/products/1/thumnail")
image_files = Dir.glob("#{dir_path}/*.jpg").sort_by { |path| File.mtime(path) }

# Cập nhật ảnh chính
if image_files[0]
  product.image.attach(
    io: File.open(image_files[0]),
    filename: File.basename(image_files[0]),
    content_type: "image/jpeg"
  )
  puts "✅ Attached main image: #{File.basename(image_files[0])}"
else
  puts "⚠️ No image found for main image"
end

# Cập nhật ảnh hover nếu có ảnh thứ hai
if image_files[1]
  product.hover_image.attach(
    io: File.open(image_files[1]),
    filename: File.basename(image_files[1]),
    content_type: "image/jpeg"
  )
  puts "✅ Attached hover image: #{File.basename(image_files[1])}"
else
  puts "⚠️ No second image found for hover"
end

puts "✅ Done updating images for product ##{product.id}"
