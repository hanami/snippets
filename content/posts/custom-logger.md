---
title: "Custom Logger"
preview: "Setup a custom logger for your Hanami project"
status: "Setup custom logger"
date: 2018-11-20T15:33:02+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "logging"]
versions: ["1.2"]
---

You can specify a custom logger in cases where you desire different logging behaviour. For example,
the [Timber logger](https://github.com/timberio/timber-ruby):

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...

  environment :production do
    logger Timber::Logger.new($stdout)

    # ...
  end
end
```

Use this logger as normal via `Hanami.logger`. It's important to note that any logger chosen
must conform to the default `::Logger` interface.
