# == Schema Information
#
# Table name: products
#
#  id              :bigint           not null, primary key
#  name            :string
#  model_number    :string           not null, unique
#  product_type     :string
#  brand           :string
#  category        :string
#  sport           :string
#  gender          :string
#  franchise       :string           default(nil)
#  description_h5  :text
#  description_p   :text
#  care            :text
#  specifications  :text
#  is_featured     :boolean          default(false)
#  badge           :string
#  status          :string           default("active")
#  slug            :string
#  category_id     :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Product < ApplicationRecord
  has_one_attached :image
  has_one_attached :hover_image
  
  # Associations
  has_many :variants, inverse_of: :product, dependent: :destroy
  accepts_nested_attributes_for :variants, reject_if: :all_blank, allow_destroy: true

  has_many :reviews, dependent: :destroy
  has_many :cart_items, dependent: :destroy
  has_many :wish_items, dependent: :destroy
  has_many :order_items, dependent: :destroy

  has_and_belongs_to_many :tags

  belongs_to :model, optional: true
  belongs_to :collaboration, optional: true # Thêm optional nếu không bắt buộc

  # Constants (based on seed usage)
  FRANCHISE     = %w[Alphabounce Tubular]
  BRAND         = %w[Adidas Nike Puma UnderArmour Reebok Asics Originals Athletics Essentials]
  SPORT         = %w[Running Soccer Basketball Tennis Gym Training]
  PRODUCTTYPE   = %w[Wear Compression TankTop Jersey Hoodie Cleats]
  GENDER        = %w[Men Women Unisex Kids]
  CATEGORY      = %w[Shoes Apparel Accessories]

  # Validations
  validates :name, presence: true, length: { minimum: 1 }
  validates :model_number, presence: true, uniqueness: { case_sensitive: false }, length: { maximum: 13 }

  # Default sorting
  default_scope { order(id: :asc) }

  # Filter keys for query or search
  FILTER_KEYS = %w[
    slug gender category sport activity product_type size color material brand
    model collection min_price max_price shipping sort
  ]

  # Ransack filters
  def self.ransackable_attributes(_auth_object = nil)
    %w[
      id name brand category franchise gender model_number product_type
      specifications sport description_h5 description_p care
      status badge slug created_at updated_at
    ]
  end
end
