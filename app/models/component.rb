class Component < ApplicationRecord
  belongs_to :post, optional: true

  validates :post_id,
            numericality: { allow_nil: true }
  validates :component_type,
            presence: true,
            inclusion: { in: %w(string boolean relation), message: "Invalid value: '%{value}'" }
  # TODO(alx-v): validate :payload against some schema
  validates :ord,
            presence: true,
            numericality: { greater_than_or_equal_to: 0 }
end
