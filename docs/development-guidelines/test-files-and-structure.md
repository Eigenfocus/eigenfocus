# Test files and structure

# Feature specs
We want to minimize potential conflicts between the FREE and PRO edition and - when they happen - we want to be able to easily solve them.

Also, in some cases, the feature has changed so much that it's better to start from scratch.

For this reason we've decided to use a specific structure for the features specs where each file is as granular as possible.

## Folder structure and file names
Here's an example of the structure for a basic CRUD:

```

spec/
└── features/
    ├── projects/
    │   ├── list_spec.rb
    │   ├── filter_spec.rb
    │   ├── create_spec.rb
    │   ├── update_spec.rb
    │   └── remove_spec.rb
```

Some guidelines:

- The first level of the folder is the domain of the feature
- Use file names mirroring domain names and words (e.g use remove and not destroy)
- Use verbs for the file names (e.g use list and not index). Also avoid using `listing`, `editing`, `showing`, `creating`, `destroying` etc.

When in doubt where to put a certain file, just ask yourself: "Where does this action start?".

Example: The time tracking from the issue modal tests should be in the `issue` folder and not in the `time_tracking` folder.

```
spec/
└── features/
    ├── issues/
    │   ├── time_tracking_spec.rb
    │   └── ...
    └── time_tracking/
        ├── list_spec.rb
        ├── start_spec.rb
        └── ...
```

## Reusing the same spec file for very similar features
For cases where the action is reversible with very similar setups, we can create just one spec file such as `time_tracking/start_stop_spec.rb` or `issues/archive_unarchive_spec.rb`. But, keep in mind that if the file starts growing in a way that it may cause future conflicts with other repositories, it's better to split it.

## User permissions

In our PRO Edition we have multiple users and permissions. All permissions are handled by separated classes so it's not necessary to test each one of them in features specs.

For specific cases such as testing if the project is visible or not depending on the membership, we can use a dedicated `projects/permissions_spec.rb` file.

## Spec file scenarios names

As the user permission/roles tests are handled by separated classes, we can describe the action directly in the spec file name.

Example:

```ruby
describe "Listing projects" do
  context "with permissions" do
    # mock pundit
    # tests...
  end

  context "without permissions" do
    # No permission for you tests
  end
end
```

## Spec file scenarios names

Describe the action directly and do not use "As a X...". Example:

## Specific specs for PRO Edition

- If a spec from the FREE edition is not valid for the PRO edition, we can tag it with a `disable_in_pro_edition` that will prevent it from running in the PRO edition.
- This tag can only be used in the PRO edition and in `describe/context` blocks. This means that you can't use it in `it/specify` examples blocks. This is intentional in order to facilitate future conflicts resolutions as we will forced to create a new spec file in the `spec/features/pro-edition` folder.
- You can create PRO Edition specific specs under the `spec/features/pro-edition` folder.