---
title: "Automate testing with guard"
preview: "Run your tests with guard automatically while you develop"
date: 2019-02-25T23:40:57+02:00
draft: true
gems: ["guard"]
tags: ["testing"]
---

You can run your tests while you develop by having `guard` watch for changes to your files, or just a simple 'save file' event.

First install guard.

Either manually install it, along with the correlating test suite plugin (in this case rspec). The process depends a bit on how you manage your local ruby, but generally it will involve something like:

```
gem install guard
gem install guard-rspec
```

HINT: There is a myriad of plugins available for guard, as it can manage other testing suites, bundler, rake, etc. Have a look at that later.

Binding it to your Hanami project, it makes a lot of sense to add it to your Gemfile under the test group. Do not require it here, as it is not necessary to load it when your app starts up. Putting it here is more of an organisational convention, as `development` is the default environment.

```
group :development do
  gem 'guard', require: false
  gem 'guard-rspec', require: false
end
```

Now either create a Guardfile in the project's root folder manually or by running

```
[bundle exec] guard init
```

A very basic `Guardfile` for a Hanami project could look like this, replace your test suite provider accordingly:

```
guard :rspec, cmd: 'rspec', all_after_pass: false, all_on_start: false do
  watch(%r{^spec/(.+)_spec\.rb$})
  watch(%r{^apps/(.+)\.rb$}) { |m| "spec/#{m[1]}_spec.rb" }
  watch(%r{^lib/(.+)\.rb$}) { |m| "spec/lib/#{m[1]}_spec.rb" }
end
```

Now, while you develop, have a terminal open, cd into your project and run `guard -c` (-c for clearing the terminal before each test run)

Now open any file under the `watch`ed paths, save it and see it being run.

HINT: the slightly contrived example matches files in the apps and lib directory with their respective counterparts in the spec directory. This should correspond with a vanilla project, but your milage may vary.
