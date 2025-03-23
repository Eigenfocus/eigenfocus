# Using Concerns or Modules

If a behaviour is used only by classes within the same namespace, we can just place it in the namespace folder. Example: `app/models/visualization/clusterable.rb`

If a behaviour is used by unrelated classes, we can place it in the corresponding `concerns` folders: `app/models/concerns` or `app/services/concerns`.

# Do not use modules to "make the class more aesthetic or feel shorter"
We should only use modules to share behaviour. Do not use modules just to split the code of a class/module into multiple files.

The only exception is the `application_helper` as it's "just" a helper and doing this avoids code conflicts.
