---
title: "Hanami Router"
date: 2018-09-17T11:22:57+02:00
preview: "Get started in less than a minute."
status: "hanami-router is a fast, full featured, Rack compatible HTTP router for Ruby. Get started in less than a minute."
draft: false
gems: ["router"]
tags: ["http"]
---

`hanami-router` is a fast, full featured, Rack compatible, HTTP router for Ruby.
Get started in less than a minute.

```ruby
# 1. $ gem install rack hanami-router

# 2. $ vim config.ru
require "hanami/router"

app = Hanami::Router.new do
  get "/", to: ->(env) { [200, {}, ["Hello, World!"]}
end

# 3. $ rackup
```

Read more at: https://github.com/hanami/router#usage
