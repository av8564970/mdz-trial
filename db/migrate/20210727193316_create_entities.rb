class CreateEntities < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.timestamps
    end

    create_table :components do |t|
      t.belongs_to :post
      t.string :component_type, null: false
      t.text :payload, null: false, default: '{}' # JSON
      t.integer :ord, null: false, default: 0
      t.timestamps
    end

    add_foreign_key(:components, :posts, on_delete: :cascade)
  end
end
