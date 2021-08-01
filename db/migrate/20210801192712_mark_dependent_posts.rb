class MarkDependentPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :is_dependent, :boolean, null: false, default: false
  end
end
