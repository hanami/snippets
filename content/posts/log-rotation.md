---
title: "Log Rotation"
preview: "Log rotation for your Hanami project"
status: "Log rotation"
date: 2018-11-20T15:19:30+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "logging"]
versions: ["1.0"]
---

By default, Hanami logger uses standard output because it's a [best practice](http://12factor.net/logs) that most hosting SaaS companies [suggest using](https://devcenter.heroku.com/articles/rails4#logging-and-assets).

If you want to use a file, pass `stream: 'path/to/file.log'` as an option.

Here's how to setup daily log rotation:

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...

  environment :production do
    logger "daily", level: :info, formatter: :json,
                    stream: "log/production.log"

    # ...
  end
end
```

If `log/` directory is missing, it will be **created at the server startup**.

Alternatively, you can decide to put a limit to the number of files (let's say `10`) and the size of each file (eg `1,024,000` bytes, aka `1` megabyte):

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...

  environment :production do
    logger 10, 1_024_000, level: :info, formatter: :json,
                          stream: "log/production.log"

    # ...
  end
end
```

You can speficy [arbitrary arguments](https://ruby-doc.org/stdlib/libdoc/logger/rdoc/Logger.html#class-Logger-label-How+to+create+a+logger), that are compatible with Ruby's `Logger`.

Learn more at [https://guides.hanamirb.org/projects/logging/](https://guides.hanamirb.org/projects/logging/#arbitrary-arguments)
