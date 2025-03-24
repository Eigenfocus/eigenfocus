
# When to create and use modules and concerns?
We should only use modules to share behaviour.

Do not use modules just to split the code of a class/module into multiple files without the intention of reusing the behaviour in other classes.

Example:

```ruby

class Project < ApplicationRecord
  # Attributes
  attribute :use_template, :string

  # Hooks
  after_create :apply_template, if: -> { use_template.present? }

  private def apply_template
    template = Project::Templatable::Template.find(use_template)
    Project::Templatable::TemplateApplier.new(self, template).apply
  end

  private def ensure_is_archived
    unless archived?
      errors.add(:base, :must_be_archived_to_destroy)
      throw(:abort)
    end
  end
end
```

Unless you have other models that use the same behaviour, and other classes such as `TemplateApplier` and `Template` are built with this in mind, you should not create a module just to make the `Project` model file shorter.

```ruby
# Bad
class Project
  include Project::Templatable
end
```

## The exception
The only exception is the `application_helper` as it's "just" a helper and doing this avoids code conflicts.


# Where to place our modules and concerns?

If a behaviour is used only by classes within the same namespace, you can place it in the namespace folder. Example: `app/models/visualization/clusterable.rb`

If a behaviour is used by unrelated classes, we can place it in the `concerns` folders: `app/models/concerns` or `app/services/concerns`.
