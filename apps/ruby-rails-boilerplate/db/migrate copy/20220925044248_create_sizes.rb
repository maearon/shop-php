class CreateSizes < ActiveRecord::Migration[6.0]
  def change
    create_table :sizes do |t|
      t.string  :label, null: false    # e.g., "S", "M", "42"
      t.string  :system, null: false   # e.g., "alpha", "numeric", "one_size"
      t.string  :sizes, :location, :string, limit: 10
      t.integer :sizes, :stock, :integer, default: 0

      t.timestamps
    end

    add_index :sizes, [:label, :system], unique: true
  end
end