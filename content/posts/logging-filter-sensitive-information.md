---
title: "Logging Filter Sensitive Information"
preview: "Prevent sensitive information to be logged by your Hanami project"
status: "How to prevent sensitive information to be logged"
date: 2018-11-20T15:14:10+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "logging"]
versions: ["1.1"]
---

Hanami automatically logs the body of non-GET HTTP requests.

When a user submits a form, all the fields and their values will appear in the log.

To avoid sensitive informations to be logged, you can filter them:

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...
  environment :development do
    logger level: :debug, filter: %w[password password_confirmation]
  end
end
```

Heres the comparison before and after:

```log
[bookshelf] [INFO] [2018-11-20 18:17:54 +0200] HTTP/1.1 POST 302 ::1 /signup 5 {"signup"=>{"username"=>"jodosha", "password"=>"secret", "password_confirmation"=>"secret", "bio"=>"lorem"}} 0.00593
```

```log
[bookshelf] [INFO] [2018-11-20 18:17:54 +0200] HTTP/1.1 POST 302 ::1 /signup 5 {"signup"=>{"username"=>"jodosha", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]", "bio"=>"lorem"}} 0.00593
```

It also supports fine grained patterns to disambiguate params with the same name.
For instance, we have a billing form with street number and credit card number, and we want only to filter the credit card:

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...
  environment :development do
    logger level: :debug, filter: %w[credit_card.number]
  end
end
```

```log
[bookshelf] [INFO] [2018-11-20 18:43:04 +0200] HTTP/1.1 PATCH 200 ::1 /billing 2 {"billing"=>{"name"=>"Luca", "address"=>{"street"=>"Centocelle", "number"=>"23", "city"=>"Rome"}, "credit_card"=>{"number"=>"[FILTERED]"}}} 0.009782
```

Note that `billing => address => number` wasn't filtered while `billing => credit_card => number` was filtered instead.

If you want to disable logging of the body completely, it can be easily achieved
with custom formatter:

```ruby
class NoParamsFormatter < ::Hanami::Logger::Formatter
  def _format(hash)
    hash.delete :params
    super hash
  end
end
```

and than just telling logger to use our new formatter for logging

```ruby
logger level: :debug, formatter: NoParamsFormatter.new
```

Read more at [https://guides.hanamirb.org/projects/logging/](https://guides.hanamirb.org/projects/logging/#filter-sensitive-informations)
