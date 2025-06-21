# Clear existing data
puts "Clearing existing products..."
Product.destroy_all

# Create sample products
puts "Generating 93 sample products..."

# Enums
ALPHA_SIZES   = %w[XS S M L XL XXL]
NUMERIC_SIZES = (36..45).to_a.map(&:to_s)
LOCATIONS     = %w[US VN JP]
IMAGE_DIR     = "#{Rails.root}/app/assets/images/img"

93.times do |i|
  i += 1

  # Đa dạng hóa brand, sport, producttype
  brands        = %w[Adidas Nike Puma UnderArmour Reebok Asics]
  sports        = %w[Running Soccer Basketball Tennis Gym Training]
  producttypes  = %w[Wear Compression TankTop Jersey Hoodie]
  genders       = %w[Men Women Unisex]
  categories    = %w[Shoes Apparel Accessories]

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
    specifications: "High-performance fabric, ergonomic design, moisture-wicking",
    price: rand(25..220),
    variants_attributes: {
      0 => { color: 'Black', price: rand(25..220), originalprice: rand(250..300), sku: "SKU#{i}-A" },
      1 => { color: 'White', price: rand(25..220), originalprice: rand(250..300), sku: "SKU#{i}-B" },
      2 => { color: 'Red',   price: rand(25..220), originalprice: rand(250..300), sku: "SKU#{i}-C" },
      3 => { color: 'Blue',  price: rand(25..220), originalprice: rand(250..300), sku: "SKU#{i}-D" }
    }
  )

  # Attach images
  t = i % 12
  t = 12 if t.zero?

  variant1 = product.variants[0]
  variant1.avatar.attach(io: File.open("#{IMAGE_DIR}/item#{t}.png"), filename: "item#{t}.png", content_type: 'image/png')
  variant1.hover.attach(io: File.open("#{IMAGE_DIR}/item#{t}.png"), filename: "item#{t}.png", content_type: 'image/png')

  product.variants[0].images.attach(io: File.open("#{IMAGE_DIR}/detail1.png"), filename: "detail1.png", content_type: "image/png")
  product.variants[1].images.attach(io: File.open("#{IMAGE_DIR}/detail2.png"), filename: "detail2.png", content_type: "image/png")
  product.variants[2].images.attach(io: File.open("#{IMAGE_DIR}/detail3.png"), filename: "detail3.png", content_type: "image/png")
  product.variants[3].images.attach(io: File.open("#{IMAGE_DIR}/detail4.png"), filename: "detail4.png", content_type: "image/png")

  # Assign sizes via join table
  product.variants.each do |variant|
    sizes = if product.category == "Shoes"
      NUMERIC_SIZES.map { |label| Size.find_by!(label: label, system: "numeric", location: "US") }
    elsif product.category == "Apparel"
      ALPHA_SIZES.map { |label| Size.find_by!(label: label, system: "alpha", location: "US") }
    else
      [Size.find_by!(label: "One Size", system: "one_size", location: "US")]
    end

    sizes.each do |size|
      VariantSize.create!(
        variant: variant,
        size: size,
        stock: rand(1..30)
      )
    end
  end

  puts "✅ Created product #{i}: #{product.name}"
end

puts "🎉 Seed completed with #{Product.count} products!"
