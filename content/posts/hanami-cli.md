---
title: "Hanami CLI"
preview: "Build your full featured Ruby CLI in a minute"
status: "Build your full featured Ruby CLI in a minute"
date: 2018-09-17T11:34:38+02:00
draft: false
gems: ["cli"]
tags: ["command line"]
---

Build your full featured Ruby CLI in a minute

```ruby
# 1. $ gem install hanami-cli
# 2. $ vim foo

#!/usr/bin/env ruby
require "hanami/cli"

module Foo
  module CLI
    module Commands
      extend Hanami::CLI::Registry

      class Hello < Hanami::CLI::Command
        argument :name, required: true

        def call(name:, **)
          puts "Hello, #{name}"
        end
      end

      register "hello", Hello, aliases: ["hi"]
    end
  end
end

Hanami::CLI.new(Foo::CLI::Commands).call

# 3. $ chmod +x foo

# $ ./foo hello Luca
# Hello, Luca

# $ ./foo hi Luca
# $ ./foo hello
# $ ./foo hello --help
```

More at: https://github.com/hanami/cli
