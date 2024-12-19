# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_18_171427) do
  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.datetime "archived_at"
    t.boolean "time_tracking_enabled", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "locale", limit: 5
    t.string "timezone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "favorite_theme_key"
  end

  create_table "visualizations", force: :cascade do |t|
    t.string "type", default: "board"
    t.integer "project_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_visualizations_on_project_id"
  end

  add_foreign_key "visualizations", "projects"
end
