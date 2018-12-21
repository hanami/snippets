---
title: "Mount Applications"
preview: "Mount Hanami and Rack applications in Hanami projects"
status: "Mount Rack based applications in Hanami"
date: 2018-12-21T10:51:24+01:00
draft: false
gems: ["hanami"]
tags: ["routing", "rack"]
versions: ["1.0"]
---

If we want to mount an application, we should use `mount` within the Hanami environment configuration file.
The global configuration file is located at `config/environment.rb`.
Place `mount` within the `Hanami.configure` block.

```ruby
# config/environment.rb

Hanami.configure do
  mount Web::Application,     at: "/"
  mount OtherApplication.new, at: "/other"
  mount SinatraApp.new,       at: "/sinatra"

  # ...
end
```

All the HTTP requests starting with `/sinatra` will be routed to `SinatraApp`.
