FactoryBot.define do
  factory :issue do
    sequence(:title) { |n| "My issue #{n}" }
    sequence(:description) { |n| "Issue #{n} description" }

    transient do
      with_labels { [] }
    end

    after(:create) do |issue, evaluator|
      evaluator.with_labels.each do |label_title|
        label = IssueLabel.find_by(title: label_title, project: issue.project) ||
          create(:issue_label, title: label_title, project: issue.project)

        create(:issue_label_link, issue: issue, issue_label: label)
      end
    end
  end
end
