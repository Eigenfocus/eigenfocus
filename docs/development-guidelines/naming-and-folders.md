# Service & Module namespace names

- Namespaces can be singular or plural (which one is used depends on the context)
- Namespaces can reuse the model constant (e.g. `User::Admin`)
- A STI Children class is ALWAYS namespaced within the parent class

Example:

```
class Visualization < ApplicationRecord
end

class Visualization::Board < Visualization
end

class Visualization::Timeline < Visualization
end
```

- A "belongs_to" relationship can be (or no to be) namespaced within the parent class.
In some cases this makes sense, in other cases it doesn't.

Example:

*When to namespace relations*
Namespacing a grouping `Visualization::Grouping` is ok as it belongs_to a visualization and doesn't even exists without a visualization

*When to NOT namespace relations*
It doesn't make much sense to namespace `Issue::TimeEntry` just because time entry belongs_to a issue. Time entries can also exists outside the concept of an issue

**Using Project to namespace everything**
Almost all classes can be namespaced inside a `Project` so we've decided to just flat this level for the models.

# Folders

- `app/models` contains only "Active Record" stuff - Classes or modules related to AR behaviour.
- Any other domain related class, that doesn't fit in other s `Rails app folder`, should be in `app/services`
