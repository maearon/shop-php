# Alpha sizes for clothing
%w[XS S M L XL XXL].each do |label|
  Size.find_or_create_by!(label: label, system: "alpha")
end

# Numeric sizes for shoes
(36..45).each do |n|
  Size.find_or_create_by!(label: n.to_s, system: "numeric")
end

# One-size for accessories
Size.find_or_create_by!(label: "One Size", system: "one_size")
