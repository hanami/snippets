---
title: "Controller Exception Handling"
preview: "Custom exception handling at the controller level"
status: "Learn how to render custom error responses"
date: 2019-01-27T15:33:41+01:00
draft: true
gems: ["hanami", "hanami-controller"]
tags: ["controller", "api"]
versions: ["1.0"]
---

Hanami automatically handles exceptions for you. The default behaviour in production is to catch all exceptions and render an error HTML page. In the development and test environment exceptions are not caught by the framework's exception handling, instead you'll be presented with a stack trace for debugging.

You can define this behaviour in the `apps/[your_app_name]/application.rb` file, just look for the `handle_exceptions` setting in the environment specific configuration blocks and uncomment it. The comments reflect the default setting, i.e., if you want to change the behaviour, you'll need to change the setting from `true` to `false` or vice versa depending on the environment block.

```ruby
# apps/web/application.rb

module Web
  class Application < Hanami::Application
    # ...

    # Handle exceptions with HTTP statuses
    handle_exceptions true

    configure :test do
      # Don't handle exceptions in tests, render the stack trace
      handle_exceptions false
    end

    configure :development do
      # Don't handle exceptions in development, render the stack trace
      handle_exceptions false
    end

    # ...
  end
end
```

The default behaviour is fine if you are rendering HTML pages, however, for APIs you should always return responses in the respective format, e.g., JSON or XML.

Let's assume you are implementing a JSON API for managing a Library. Your current task is to implement a checkout procedure and you need to decide what happens when two patrons try to borrow the last available copy of a book.
Thanks to ACID guarantees of your database you are sure that when you book the last copy for one patron, the other will fail to book it. However, you need to gracefully handle this scenario.

Your controller could look something like this:

```ruby
# apps/inventory_api/controllers/loans/create.rb
module InventoryApi
  module Controllers
    module Loans
      class Create
        include InventorApi::Action

        handle_exception Inventory::OutOfStock => :borrowing_failed
        expose :loan
        
        params do
          required(:book_id).filled
          required(:patron_id).filled
        end

        def call(params)
          patron = PatronRepository.new.find(params[:patron_id])
          book = BookRepository.new.find(params[:book_id])
          # calling borrow may raise Inventory::OutOfStock
          @loan = Inventory.borrow(book, patron)
        end

        def borrowing_failed(_exception)
          error = {
            status: "not_found",
            code: "out_of_stock",
            title: "No more copies of the requested book are available",
          }

          halt 404, JSON.dump(errors: [error])
        end
      end
    end
  end
end
```

By using `handle_exception Inventory::OutOfStock => :borrowing_failed` we tell Hanami to call `#borrowing_failed` when the `Inventory::OutOfStock` exception is raised. The `#borrowing_failed` method is then handed the exception object for further inspection, but we don't actually need that object in our example.
Instead we simply render a [JSON:API](https://jsonapi.org/format/) error response to tell the client that no copy is left for borrowing.

Since we wish to document that this actually works, we write a test for this behaviour. However, when we run our test the expected JSON response is not rendered, instead we are presented with a stack trace.

We remeber that this is due to Hanami's default behaviour in face of exceptions. For our test to succeed we need to change how Hanami handles exceptions in the test environment for this controller.
We could change it for all controllers of this application with the following configuration:

```ruby
# apps/inventory_api/application.rb

module InventoryApi
  class Application < Hanami::Application
    # ...

    configure :test do
      handle_exceptions true
    end

    # ....
  end
end
```

Or we could change it for just this one controller by adding `configure { handle_exceptions true }` to our controller. But then we'd also change it for the development environment. Which may not be what we want if our exception handling is more general. Usually we wish to see the stack trace in development mode.

If you want to know more about exception handling in Hanami, have a look at the [documentation](https://www.rubydoc.info/gems/hanami-controller/#Exceptions_management).
