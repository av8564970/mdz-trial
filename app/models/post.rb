class Post < ApplicationRecord
  has_many :components, dependent: :destroy
end
