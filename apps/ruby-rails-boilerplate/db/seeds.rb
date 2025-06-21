# Clear existing data
puts "Clearing existing data..."
Product.destroy_all

# Create sample products
puts "Creating sample products..."

# Men's Soccer Shoes
men_soccer_shoes = [
  {
    name: "Predator Elite FG",
    brand: "Athletics",
    category: "Shoes",
    gender: "Men",
    sport: "Soccer",
    jan_code: "1234567890123",
    price: 200,
    description_h5: "PREDATOR ELITE FG SOCCER CLEATS",
    description_p: "Dominate the field with these elite soccer cleats designed for precision and power.",
    care: "Clean with damp cloth. Air dry only.",
    specifications: "Firm ground outsole, synthetic upper, textile lining"
  },
  {
    name: "Copa Mundial",
    brand: "Athletics", 
    category: "Shoes",
    gender: "Men",
    sport: "Soccer",
    jan_code: "1234567890124",
    price: 150,
    description_h5: "COPA MUNDIAL SOCCER CLEATS",
    description_p: "Classic leather soccer cleats for the traditional player.",
    care: "Clean with leather cleaner. Air dry only.",
    specifications: "Firm ground outsole, kangaroo leather upper"
  }
]

# Men's Tops
men_tops = [
  {
    name: "Essentials 3-Stripes Tee",
    brand: "Essentials",
    category: "Apparel", 
    gender: "Men",
    sport: "Running",
    producttype: "Wear",
    jan_code: "1234567890125",
    price: 25,
    description_h5: "ESSENTIALS 3-STRIPES T-SHIRT",
    description_p: "Classic comfort meets iconic style in this essential tee.",
    care: "Machine wash cold. Tumble dry low.",
    specifications: "100% cotton, regular fit"
  },
  {
    name: "Techfit Compression Shirt",
    brand: "Athletics",
    category: "Apparel",
    gender: "Men", 
    sport: "Running",
    producttype: "Compression",
    jan_code: "1234567890126",
    price: 45,
    description_h5: "TECHFIT COMPRESSION SHIRT",
    description_p: "Muscle-supporting compression for peak performance.",
    care: "Machine wash cold. Do not bleach.",
    specifications: "Polyester blend, compression fit"
  }
]

# Women's Running Shoes
women_running_shoes = [
  {
    name: "Ultraboost 22",
    brand: "Athletics",
    category: "Shoes",
    gender: "Women",
    sport: "Running", 
    jan_code: "1234567890127",
    price: 180,
    description_h5: "ULTRABOOST 22 RUNNING SHOES",
    description_p: "Energy-returning running shoes for your daily miles.",
    care: "Clean with damp cloth. Air dry only.",
    specifications: "Boost midsole, Primeknit upper, Continental rubber outsole"
  },
  {
    name: "Supernova+",
    brand: "Athletics",
    category: "Shoes", 
    gender: "Women",
    sport: "Running",
    jan_code: "1234567890128", 
    price: 120,
    description_h5: "SUPERNOVA+ RUNNING SHOES",
    description_p: "Comfortable running shoes for everyday training.",
    care: "Clean with damp cloth. Air dry only.",
    specifications: "Bounce midsole, mesh upper, rubber outsole"
  }
]

# Kids' Soccer Shoes
kids_soccer_shoes = [
  {
    name: "Predator Edge.4 FxG J",
    brand: "Athletics",
    category: "Shoes",
    gender: "Kids",
    sport: "Soccer",
    jan_code: "1234567890129", 
    price: 60,
    description_h5: "PREDATOR EDGE.4 FXG JUNIOR SOCCER CLEATS",
    description_p: "Young players' soccer cleats for multiple surfaces.",
    care: "Clean with damp cloth. Air dry only.",
    specifications: "Flexible ground outsole, synthetic upper"
  }
]

all_products = men_soccer_shoes + men_tops + women_running_shoes + kids_soccer_shoes

all_products.each_with_index do |product_data, index|
  product = Product.create!(product_data)
  
  # Create variants for each product
  colors = ['Black', 'White', 'Red', 'Blue', 'Green']
  2.times do |variant_index|
    variant = product.variants.create!(
      color: colors[variant_index % colors.length]
    )
    
    # Create sizes for each variant
    if product.category == 'Shoes'
      shoe_sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12']
      shoe_sizes.each do |size|
        variant.sizes.create!(
          label: size,
          system: 'US',
          stock: rand(0..20)
        )
      end
    else
      clothing_sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      clothing_sizes.each do |size|
        variant.sizes.create!(
          label: size,
          system: 'US',
          stock: rand(0..50)
        )
      end
    end
  end
  
  puts "Created product: #{product.name} with #{product.variants.count} variants"
end

puts "Seed completed! Created #{Product.count} products with variants and sizes."
