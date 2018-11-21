---
title: "Project Initializers"
preview: "Setup code while Hanami is booting with project initializers"
status: "Setup code while Hanami is booting"
date: 2018-11-21T10:56:09+01:00
draft: false
gems: ["hanami"]
tags: ["hanami"]
versions: ["1.0"]
---

A project can **optionally** have one or more custom initializers.

An initializer is a Ruby file used to setup third-party libraries or some other aspect of the code.

They are run as the **last** thing after the dependencies, the framework and the project code are loaded, but **before** the server or the console is started.

For instance, if we want to setup [Bugsnag](https://bugsnag.com) for our project we can do:

```ruby
# config/initializers/bugsnag.rb
require "bugsnag"

Bugsnag.configure do |config|
  config.api_key = ENV["BUGSNAG_API_KEY"]
end
```

Project initializers must be added under `config/initializers` and they are executed in **alphabetical order**.

Read more at [https://guides.hanamirb.org/projects/initializers/](https://guides.hanamirb.org/projects/initializers/)
