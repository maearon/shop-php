# == Schema Information
#
# Table name: variants
class Variant < ApplicationRecord
  include CheckVariant
  COLOR = %w{ Black Grey White Red Pink Orange Yellow Green Blue Purple Beige Brown Gold Silver Multicolor }

  has_many :cart_items
  has_many :wish_items
  has_many :order_items
  belongs_to :product, inverse_of: :variants
  has_many :variant_sizes
  has_many :sizes, through: :variant_sizes

  has_one_attached :avatar
  has_one_attached :hover
  has_many_attached :images

  validates_numericality_of :price, greater_than_or_equal_to: 1
  validates_numericality_of :stock, :originalprice, greater_than_or_equal_to: 0
  validates :avatar,   content_type: { in: %w[image/jpeg image/gif image/png],
                                      message: "must be a valid image format" },
                      size: { less_than: 100.megabytes,
                            message: "should be less than 5MB" }
  # validates_uniqueness_of :id, scope: :product_id

  default_scope { order id: :asc }
  # has_many :sizes, dependent: :destroy
  accepts_nested_attributes_for :sizes, reject_if: :all_blank, allow_destroy: true

  validates :color, presence: true
  validates :product_id, presence: true

  def self.ransackable_attributes(auth_object = nil)
    %w[id color product_id created_at updated_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[product sizes]
  end
end
