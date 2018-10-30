---
title: "Hanami Repository Bulk Update"
preview: "Update multiple database records at once"
status: "Learn how to efficiently update a collection of records"
date: 2018-10-30T15:45:16+01:00
draft: true
gems: ["hanami"]
tags: ["model"]
versions: ["1.0"]
---

Imagine that your team is tasked to implement a feature that enables a human to
review and publish a list of books. Most of the work has already been done, what
remains is to update the `published_at` attribute of the subset of books that
were reviewed. To that end you'll implement a `publish` method on the
`BookRepository` that takes the list of reviewed books and updates them.

```ruby
# lib/bookshelf/repositories/book_repository.rb
# frozen_string_literal: true

class BookRepository < Hanami::Repository
  def publish(reviewed_books)
    books
      .where(id: reviewed_books.map(&:id))
      .update(published_at: Time.now)
  end
end
```

The feature is a success and your users are happy. It turns out that there are
a lot more bulk operations that users would like to be able to do. For now we
want to enable users to set discounts for books in bulk. Again the UI is already
updated and all we have left to do is implement this in our repository.

```ruby
# lib/bookshelf/repositories/book_repository.rb
# frozen_string_literal: true

class BookRepository < Hanami::Repository
  def publish(reviewed_books)
    update_all(reviewed_books, published_at: Time.now)
  end
  
  def discount(books_on_sale, reduction_rate)
    # we validate the reduction rate at the controller level, it may even be a
    # value object
    update_all(books_on_sale, discount: reduction_rate.to_f)
  end

  private

  def update_all(books_to_update, **attribute_value_pairs)
    books
      .where(id: books_to_update.map(&:id))
      .update(**attribute_value_pairs)
  end
end
```

While it is tempting to just implement the generic `update_all` method publicly
and use it outside of the repository this flexibility would come at a cost. The
knowledge of what publishing books or granting discounts means would potentially
be spread across our code base.

Instead we define less flexible but intention revealing methods that naturally
attract behaviour pertaining to their responsibility.
