---
title: "Hanami Logger"
date: 2018-09-17T11:11:19+02:00
preview: "Learn the basic, yet powerful, usage of Hanami::Logger"
status: "Do you know Hanami::Logger is a full featured logger for Ruby? It works with several IO targets, several log levels, it can output JSON, it offers time or file size rotation policies and it's able to filter (nested) sensitive data."
draft: false
gems: ["utils"]
tags: ["logging"]
---

Do you know `Hanami::Logger` is a full featured logger for Ruby? It works with several IO targets, several log levels, it can output JSON, it offers time or file size rotation policies and it's able to filter (nested) sensitive data.

```ruby
# gem install hanami-utils
require "hanami/logger"

# Use stdout
logger = Hanami::Logger.new
# Use file. It auto creates intermediary directories
logger = Hanami::Logger.new(stream: "log/development.log")
# Use a generic IO. It's useful for testing.
logger = Hanami::Logger.new(stream: StringIO.new)

# Outputs JSON to make logs parseable
logger = Hanami::Logger.new(formatter: :json)

# Set warning leve, it works with `:warn` too
logger = Hanami::Logger.new(level: Hanami::Logger::WARN)

# Daily log rotation
logger = Hanami::Logger.new("bookshelf", "daily", stream: "log/production.log")
# Leave 10 old log files where the size is about 1,024,000 bytes
logger = Hanami::Logger.new("bookshelf", 10, 1_024_000, stream: "log/production.log")

# Filter sensitive data
filters = %w[password password_confirmation credit_card user.login]
logger = Hanami::Logger.new(filters: filters)



# Usage
logger.info("Hello, world!")
```

Install it with:

```bash
$ gem install hanami-utils
```
