class CreateReflections < ActiveRecord::Migration[6.0]
  def change
    create_table :reflections do |t|
      t.string :content
      t.integer :day_id
    end
  end
end
