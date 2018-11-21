---
title: "HTTP Early Hints"
preview: "Tell the browser to fetch assets ahead of time with HTTP Early Hints"
status: "Configure HTTP Early Hints to tell the browser to fetch assets ahead of time"
date: 2018-11-21T11:10:27+01:00
draft: true
gems: ["hanami"]
tags: ["hanami", "assets", "http2"]
versions: ["1.2"]
---

HTTP/2 adoption is still slow, so the IETF backported HTTP/2 "server push" workflow to HTTP/1.1, by introducing the HTTP status [`103 Early Hints`](https://datatracker.ietf.org/doc/rfc8297/).
In this case the server sends **one or more HTTP responses for a single request**.
The last one must be the traditional `200 OK` that returns the HTML of the page, whereas the first `n` can include a special header `Link` to tell the browser to fetch the asset ahead of time.

From the project configuration, you can simply enable the feature:

```ruby
# config/environment.rb
Hanami.configure do
  # ...
  early_hints true
end
```

You need [Puma](http://puma.io/) `3.11.0+` with Early-Hints enabled:

```ruby
# Gemfile
gem "puma"
```

```ruby
# config/puma.rb
early_hints true
```

As last step, you need a web server that supports HTTP/2 and Early Hints like [h2o](https://h2o.examp1e.net/).

Read more at [https://guides.hanamirb.org/projects/http2-early-hints/](https://guides.hanamirb.org/projects/http2-early-hints/)
