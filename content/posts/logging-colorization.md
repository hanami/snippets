---
title: "Logging Colorization"
preview: "Colorize Hanami logger with your custom palette"
status: "Colorize logger with your custom palette"
date: 2018-11-20T15:35:45+01:00
draft: false
gems: ["hanami"]
tags: ["hanami", "logging"]
versions: ["1.2"]
---

Hanami uses a default color palette for standard output logging.

### Custom colorizer

You can build your own colorization strategy:

```ruby
# config/environment.rb
# ...
require_relative "./logger_colorizer"

Hanami.configure do
  # ...

  environment :development do
    logger level: :info, colorizer: LoggerColorizer.new
  end
end
```

```ruby
# config/logger_colorizer.rb
require "hanami/logger"
require "paint" # gem install paint

class LoggerColorizer < Hanami::Logger::Colorizer
  def initialize(colors: { app: [:red, :bright], severity: [:red, :blue], datetime: [:italic, :yellow] })
    super
  end

  private

  def colorize(message, color:)
    Paint[message, *color]
  end
end
```

### Disable colorization

In order to disable the colorization:

```ruby
# config/environment.rb
# ...

Hanami.configure do
  # ...

  environment :development do
    logger level: :info, colorizer: false
  end
end
```
