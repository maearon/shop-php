class Size < ApplicationRecord
  has_many :variant_sizes
  has_many :variants, through: :variant_sizes
end