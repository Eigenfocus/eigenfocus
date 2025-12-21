class Header::RunningTimeEntriesComponent < ViewComponent::Base
  attr_reader :count

  def initialize(count:)
    @count = count
  end

  def show_button?
    count > 0
  end
end
