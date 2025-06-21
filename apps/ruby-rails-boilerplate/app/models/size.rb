# == Schema Information
#
# Table name: sizes
class Size < ApplicationRecord
  has_many :variant_sizes
  has_many :variants, through: :variant_sizes
  # belongs_to :variant

  validates :label, presence: true
  validates :system, presence: true
  validates :stock, presence: true, numericality: { greater_than_or_equal_to: 0 }

  def self.ransackable_attributes(auth_object = nil)
    %w[id label system stock variant_id created_at updated_at]
  end
end
