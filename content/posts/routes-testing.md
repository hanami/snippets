---
title: "Routes Testing"
preview: "Unit testing for Hanami routes"
status: "Unit testing for Hanami routes"
date: 2018-12-21T11:33:39+01:00
draft: false
gems: ["hanami"]
tags: ["routing", "testing"]
versions: ["1.0"]
---

Hanami has builtin facilities for routing unit tests.

We can assert the generated routes, to do so, we're gonna create a spec file for the purpose.
`Web.routes` is the class that holds all the routes for the application named `Web`.

It exposes a method to generate a path, which takes the [name of a route](/named-routes) as a symbol.
Here's how to test it.

```ruby
# spec/web/routes_spec.rb

RSpec.describe Web.routes do
  context "path generation" do
    it "generates '/books/23'" do
      actual = subject.path(:book, id: 23)
      expect(actual).to eq("/books/23")
    end
  end

  context "route recognition" do
    it "recognizes 'PATCH /books/23'" do
      env   = Rack::MockRequest.env_for("/books/23", method: "PATCH")
      route = subject.recognize(env)

      expect(route.routable?).to be(true)

      expect(route.path).to   eq("/books/23")
      expect(route.verb).to   eq("PATCH")
      expect(route.params).to eq(id: "23")
    end
  end
end
```

Learn more at [Routing testing guide](https://guides.hanamirb.org/routing/testing/).
