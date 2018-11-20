---
title: "Custom Rake Tasks"
preview: "How to add custom Rake tasks"
status: "Learn how to add custom Rake tasks to your Hanami project"
date: 2018-11-20T14:49:44+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "rake"]
versions: ["1.0"]
---

If you want to add customer Rake tasks to your Hanami project, you have two ways: `Rakefile` and `.rake` files.

## Rakefile

`Rakefile` is the main Rake file of the project.
Add here your Rake tasks to perform general related activities.

The special `:environment` task can be used as a task dependency to load the entire code of the project.

```ruby
# Rakefile
namespace :db do
  desc "Database backup"
  task backup: :environment do
    # ...
  end
end
```

## `.rake` files

If your list of Rake tasks is growing, you may want to split them per categories in several files:

```shell
$ mkdir -p rakelib
```

```ruby
# rakelib/catalog.rake
namespace :catalog do
  desc "Export the entire catalog"
  task export: :environment do
    # ...
  end
end
```

## List your tasks

Here's how to list your Rake tasks:

```shell
$ bundle exec rake -T
rake catalog:export  # Export the entire catalog
rake db:backup       # Database backup
rake environment     # Load the full project
rake spec            # Run RSpec code examples
```
