---
title: "Hanami::Repository Dynamic Ordering"
preview: "Sort database records with parametrized order policy"
status: "Learn how to support database records sorting based on user input"
date: 2018-10-29T17:27:35+01:00
draft: false
gems: ["hanami"]
tags: ["model"]
versions: ["1.0"]
---

If you want to support records sorting based on user input.
Imagine clicking a column to sort field to be ascending or descending.

The `Hanami::Model::Sql` module exposes `.asc` and `.desc` methods to generate a `SORT` `ASC` or `DESC` sort policy.
You want to dynamically invoke one of these methods, based on the value of `direction`, by using `public_send`.
For security reasons, we want to whitelist the allowed values of `direction`. Otherwise, any method can be invoked on `Hanami::Model::Sql`.

Finally we use the dynamic block accepted by `#order` to set the sorting policy.

```ruby
# lib/bookshelf/repositories/post_repository.rb
# frozen_string_literal: true

class PostRepository < Hanami::Repository
  def sort_by(column, direction)
    unless ORDER_DIRECTIONS.include?(direction.to_sym)
      message = "unknown direction: #{direction.inspect}"
      raise ArgumentError.new(message)
    end

    policy = Hanami::Model::Sql.public_send(direction, column.to_sym)
    posts.order { policy }
  end

  ORDER_DIRECTIONS = %i[asc desc].freeze
  private_constant :ORDER_DIRECTIONS
end
```
