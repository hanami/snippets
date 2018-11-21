---
title: "Rack Middleware"
preview: "Configure Rack middleware stack for your Hanami project"
status: "Configure Rack middleware stack"
date: 2018-11-21T11:04:31+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "rack"]
versions: ["1.2"]
---

Hanami exposes a project level [Rack middleware stack](http://www.rubydoc.info/github/rack/rack/master/file/SPEC) to be configured like this:

```ruby
# config/environment.rb

Hanami.configure do
  # ...
  middleware.use MyRackMiddleware
end
```

It's worth noticing that this is equivalent to add a middleware in `config.ru` file.
The only difference is that third-party plugins can hook into `Hanami.configure` to inject their own middleware.

Read more at [https://guides.hanamirb.org/projects/rack-middleware/](https://guides.hanamirb.org/projects/rack-middleware/)
