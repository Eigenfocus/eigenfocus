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

ActiveRecord::Schema[8.0].define(version: 2024_12_20_183735) do
  create_table "grouping_issue_allocations", force: :cascade do |t|
    t.integer "position"
    t.integer "issue_id", null: false
    t.integer "grouping_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["grouping_id"], name: "index_grouping_issue_allocations_on_grouping_id"
    t.index ["issue_id"], name: "index_grouping_issue_allocations_on_issue_id"
  end

  create_table "groupings", force: :cascade do |t|
    t.string "title"
    t.integer "visualization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", null: false
    t.index ["visualization_id"], name: "index_groupings_on_visualization_id"
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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

  add_foreign_key "grouping_issue_allocations", "groupings"
  add_foreign_key "grouping_issue_allocations", "issues"
  add_foreign_key "groupings", "visualizations"
  add_foreign_key "visualizations", "projects"
end
