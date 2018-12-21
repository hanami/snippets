---
title: "Named Routes"
preview: "Create unique names for routes to be used in Hanami actions, views, and templates"
status: "Create unique names for routes to reference them in Hanami apps"
date: 2018-12-21T11:01:22+01:00
draft: false
gems: ["hanami"]
tags: ["routing"]
versions: ["1.0"]
---

We can specify a unique name for each route, in order to generate paths from the router or to test them.
The unique name is assigned, using the `:as` option.

```ruby
# apps/web/config/routes.rb

root              to: "home#index"
get "/hello",     to: "greet#index", as: :greeting
get "/books/:id", to: "books#show",  as: :book
```

When a Hanami application starts, it generates a Ruby module at the runtime under our application namespace: eg. `Web.routes`.
We can use it to generate a relative or absolute URI for our route.

```ruby
Web.routes.path(:root)     # => "/"
Web.routes.url(:root)      # => "http://localhost:2300/"

Web.routes.path(:greeting) # => "/hello"
Web.routes.url(:greeting)  # => "http://localhost:2300/hello"
```

When we have one or more variables, they can be specified as a Hash.

```ruby
Web.routes.path(:book, id: 1) # => "/books/1"
Web.routes.url(:book, id: 1)  # => "http://localhost:2300/books/1"
```

Absolute URL generation is dependent on `scheme`, `host` and `port` settings in `apps/web/application.rb`.

Generating routes from `Web.routes` is helpful, because that module can be accessed from anywhere.
However, this syntax is noisy.

Hanami has _routing helpers_ available as `routes` in: **actions**, **views**, and **templates**.

```ruby
<%= routes.path(:greeting) %>
<%= routes.url(:greeting) %>
```

Or

```ruby
<%= routes.greeting_path %>
<%= routes.greeting_url %>
```

Learn more at [Routing basig usage guide](https://guides.hanamirb.org/routing/basic-usage/#named-routes).
