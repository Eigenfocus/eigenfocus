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

ActiveRecord::Schema[8.0].define(version: 2025_03_04_171250) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "app_metadata", force: :cascade do |t|
    t.string "token"
    t.string "last_released_version"
    t.datetime "last_released_version_checked_at"
    t.datetime "last_used_at"
    t.json "onboarding_survey_response", default: {}
    t.string "survey_token"
  end

  create_table "grouping_issue_allocations", force: :cascade do |t|
    t.integer "position", null: false
    t.integer "issue_id", null: false
    t.integer "grouping_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["grouping_id", "position"], name: "index_grouping_issue_allocations_on_grouping_id_and_position", unique: true
    t.index ["grouping_id"], name: "index_grouping_issue_allocations_on_grouping_id"
    t.index ["issue_id"], name: "index_grouping_issue_allocations_on_issue_id"
  end

  create_table "groupings", force: :cascade do |t|
    t.string "title"
    t.integer "visualization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", null: false
    t.boolean "hidden", default: false, null: false
    t.index ["visualization_id", "position"], name: "index_groupings_on_visualization_id_and_position", unique: true
    t.index ["visualization_id"], name: "index_groupings_on_visualization_id"
  end

  create_table "issue_label_links", force: :cascade do |t|
    t.integer "issue_id", null: false
    t.integer "issue_label_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id", "issue_label_id"], name: "index_issue_label_links_on_issue_id_and_issue_label_id", unique: true
    t.index ["issue_id"], name: "index_issue_label_links_on_issue_id"
    t.index ["issue_label_id"], name: "index_issue_label_links_on_issue_label_id"
  end

  create_table "issue_labels", force: :cascade do |t|
    t.string "title", null: false
    t.integer "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_issue_labels_on_project_id"
    t.index ["title"], name: "index_issue_labels_on_title"
  end

  create_table "issues", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "project_id"
    t.index ["project_id"], name: "index_issues_on_project_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "title", null: false
    t.text "content"
    t.json "announcement_modes", default: [], null: false
    t.boolean "external_link", default: false
    t.string "external_id"
    t.datetime "read_at"
    t.datetime "published_at"
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

  create_table "time_entries", force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.integer "issue_id"
    t.string "description", default: ""
    t.integer "total_logged_time_in_minutes", default: 0, null: false
    t.datetime "started_at"
    t.date "reference_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["issue_id"], name: "index_time_entries_on_issue_id"
    t.index ["project_id"], name: "index_time_entries_on_project_id"
    t.index ["user_id"], name: "index_time_entries_on_user_id"
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
    t.json "favorite_issue_labels", default: [], null: false
    t.index ["project_id"], name: "index_visualizations_on_project_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "grouping_issue_allocations", "groupings"
  add_foreign_key "grouping_issue_allocations", "issues"
  add_foreign_key "groupings", "visualizations"
  add_foreign_key "issue_label_links", "issue_labels"
  add_foreign_key "issue_label_links", "issues"
  add_foreign_key "issues", "projects"
  add_foreign_key "time_entries", "projects"
  add_foreign_key "time_entries", "users"
  add_foreign_key "visualizations", "projects"
end
