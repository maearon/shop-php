puts "Clearing existing products..."
Product.destroy_all
Product.reset_pk_sequence
Variant.destroy_all
Variant.reset_pk_sequence
VariantSize.destroy_all
VariantSize.reset_pk_sequence

puts "Ensuring sizes exist..."

ALPHA_SIZES   = %w[XS S M L XL XXL]
NUMERIC_SIZES = (36..45).to_a.map(&:to_s)
LOCATIONS     = %w[US VN]
IMAGE_DIR          = "#{Rails.root}/app/assets/images/img"
PRODUCTS_IMAGE_DIR = Rails.root.join("app/assets/images/products")

# Tạo size cho từng hệ và từng location
LOCATIONS.each do |loc|
  ALPHA_SIZES.each do |label|
    Size.find_or_create_by!(label: label, system: "alpha", location: loc)
  end

  NUMERIC_SIZES.each do |label|
    Size.find_or_create_by!(label: label, system: "numeric", location: loc)
  end
end

# One Size dùng cho các sản phẩm không phân biệt size
Size.find_or_create_by!(label: "One Size", system: "one_size", location: "GLOBAL")

puts "Generating 93 sample products..."

brands        = %w[Adidas Nike Puma UnderArmour Reebok Asics Originals Athletics Essentials]
sports        = %w[Running Soccer Basketball Tennis Gym Training]
producttypes  = %w[Wear Compression TankTop Jersey Hoodie Cleats]
genders       = %w[Men Women Unisex Kids]
categories    = %w[Shoes Apparel Accessories]

93.times do |i|
  i += 1
  brand        = brands.sample
  sport        = sports.sample
  producttype  = producttypes.sample
  gender       = genders.sample
  category     = categories.sample
  name         = "#{brand} #{producttype} #{i}"

  product = Product.create!(
    name: name,
    gender: gender,
    franchise: 'Tubular',
    producttype: producttype,
    brand: brand,
    category: category,
    sport: sport,
    jan_code: "0886#{i}",
    description_h5: "Premium #{producttype} for #{sport}",
    description_p: "Experience comfort and performance with the new #{name}.",
    care: "Machine wash cold. Tumble dry low.",
    specifications: "High-performance fabric, ergonomic design, moisture-wicking"
  )

  %w[Black White Red Blue].each_with_index do |color, idx|
    variant = product.variants.create!(
      color: color,
      price: rand(25..220),
      originalprice: rand(250..300),
      sku: "SKU#{i}-#{('A'.ord + idx).chr}",
      stock: 10
    )

    # Attach images
    t = i % 12
    t = 12 if t.zero?

    dir_path = PRODUCTS_IMAGE_DIR.join(i.to_s)

    # Avatar
    avatar_path = Dir.glob("#{dir_path}/#{i}.jpg").first
    if idx == 0 && avatar_path
      variant.avatar.attach(io: File.open(avatar_path), filename: "#{i}.jpg", content_type: "image/jpeg")
      variant.hover.attach(io: File.open(avatar_path), filename: "#{i}.jpg", content_type: "image/jpeg")
    end

    # Attach all detail images (1dt1.jpg, 1dt2.jpg, ...)
    detail_images = Dir.glob("#{dir_path}/#{i}dt*.jpg").sort
    detail_images.each do |img_path|
      variant.images.attach(io: File.open(img_path), filename: File.basename(img_path), content_type: "image/jpeg")
    end

    # Gán size
    sizes = case category
            when "Shoes"
              NUMERIC_SIZES.map { |label| Size.find_by!(label: label, system: "numeric", location: "US") }
            when "Apparel"
              ALPHA_SIZES.map { |label| Size.find_by!(label: label, system: "alpha", location: "US") }
            else
              [Size.find_by!(label: "One Size", system: "one_size", location: "GLOBAL")]
            end

    sizes.each do |size|
      VariantSize.create!(variant: variant, size: size, stock: rand(1..30))
    end
  end

  puts "✅ Created product #{i}: #{product.name}"
end

puts "🎉 Seed completed with #{Product.count} products!"
