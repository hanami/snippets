---
title: "Basic Logging"
preview: "Learn how to configure basic logging for your Hanami project"
status: "Basic logging configuration"
date: 2018-11-20T15:07:13+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "logging"]
versions: ["1.0"]
---

This is the basic logging configuration for a Hanami project:

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...

  environment :development do
    logger level: :debug
  end

  environment :production do
    logger level: :info, formatter: :json

    # ...
  end
end
```

By default it uses standard output because it’s a [best practice](http://12factor.net/logs) that most hosting SaaS companies [suggest using](https://devcenter.heroku.com/articles/rails4#logging-and-assets).

If you want to use a file, pass `stream: "path/to/file.log"` as an option.

Each environment requires different logging behaviors, use `environment` blocks to define the differences.

Read more at [https://guides.hanamirb.org/projects/logging/](https://guides.hanamirb.org/projects/logging/)
