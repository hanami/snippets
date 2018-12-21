---
title: "Router Rack Endpoints"
preview: "Mount any kind of Rack compatible endpoint in Hanami"
status: "Mount Rack compatible endpoints in router"
date: 2018-12-21T10:41:53+01:00
draft: false
gems: ["hanami", "router"]
tags: ["router", "rack"]
versions: ["1.0"]
---

Hanami is compatible with [Rack SPEC](http://www.rubydoc.info/github/rack/rack/master/file/SPEC), and so the endpoints that we use **MUST** be compliant as well.

A valid endpoint can be a proc, an object, a class, an action, or an **application** that responds to `#call`.

```ruby
get "/proc",       to: ->(env) { [200, {}, ["Hello from Hanami!"]] }
get "/action",     to: "home#index"
get "/middleware", to: Middleware
get "/rack-app",   to: RackApp.new
get "/rails",      to: ActionControllerSubclass.action(:new)
```

When we use a string, it tries to instantiate a class from it:

```ruby
get "/rack-app", to: "rack_app" # it will map to RackApp.new
```

Learn more at [Routing overview guide](https://guides.hanamirb.org/routing/overview/#rack).
