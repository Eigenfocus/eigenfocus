require 'rails_helper'

RSpec.describe "Managing notifications", type: :feature do
  let!(:user) { create(:user) }

  describe "marking notifications as read" do
    context "with unread notifications" do
      before do
        create_list(:notification, 3, read_at: nil)

        visit root_path
      end

      it "allows marking all notifications as read" do
        find(".cpy-notifications-dropdown").click

        expect(page).to have_css(".cpy-mark-as-read")

        click_button "Mark all as read"

        expect(page).not_to have_css(".cpy-mark-as-read")
      end

      it "allows marking individual notifications as read" do
        find(".cpy-notifications-dropdown").click

        within(".cpy-notification", match: :first) do
          find(".cpy-mark-as-read").click
        end

        expect(page).to have_content("Notification was marked as read")

        expect(all(".cpy-mark-as-read").count).to eq(2)

        expect(Notification.unread.count).to eq(2)
      end
    end

    context "with no unread notifications" do
      before do
        create_list(:notification, 3, read_at: Time.current)
        visit root_path
      end

      it "shows no unread indicator" do
        expect(page).not_to have_css(".cpy-mark-as-read")
      end

      it "does not show mark all as read button" do
        find(".cpy-notifications-dropdown").click
        expect(page).not_to have_button("Mark all as read")
      end
    end
  end
end
