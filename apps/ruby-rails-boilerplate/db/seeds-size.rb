# # Alpha sizes for clothing
# %w[XS S M L XL XXL].each do |label|
#   Size.find_or_create_by!(label: label, system: "alpha")
# end

# # Numeric sizes for shoes
# (36..45).each do |n|
#   Size.find_or_create_by!(label: n.to_s, system: "numeric")
# end

# # One-size for accessories
# Size.find_or_create_by!(label: "One Size", system: "one_size")




# Alpha sizes cho US
# %w[XS S M L XL XXL].each do |label|
#   Size.find_or_create_by!(label: label, system: "alpha", location: "US") do |s|
#     s.stock = rand(0..100)
#   end
# end

# Alpha sizes cho VN
%w[XS S M L XL XXL].each do |label|
  Size.find_or_create_by!(label: label, system: "alpha", location: "VN") do |s|
    s.stock = rand(0..50)
  end
end

# Numeric sizes cho Shoes tại US
# (36..45).each do |n|
#   Size.find_or_create_by!(label: n.to_s, system: "numeric", location: "US") do |s|
#     s.stock = rand(0..200)
#   end
# end

# Numeric sizes cho Shoes tại US
(36..45).each do |n|
  Size.find_or_create_by!(label: n.to_s, system: "numeric", location: "VN") do |s|
    s.stock = rand(0..200)
  end
end

# One size cho phụ kiện toàn cầu
# Size.find_or_create_by!(label: "One Size", system: "one_size", location: "GLOBAL") do |s|
#   s.stock = 999
# end


