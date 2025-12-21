class RunningTimeEntriesButtonComponent < ViewComponent::Base
  attr_reader :count

  def initialize(count:)
    @count = count
  end

  def render?
    count > 0
  end
end
