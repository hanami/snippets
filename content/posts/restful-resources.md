---
title: "RESTful Resources"
preview: "How to setup RESTful resources for Hanami"
status: "How to setup RESTful resources for Hanami"
date: 2018-12-21T11:18:02+01:00
draft: false
gems: ["router", "hanami"]
tags: ["routing", "rest"]
versions: ["1.0"]
---

Hanami supports advanced features for RESTful resources:

```ruby
# apps/web/config/routes.rb

resources :books, only: [:new, :create, :show] do
  member do
    get "toggle"
  end

  collection do
    get "search"
  end
end
```

The example above will generate the following [named routes](/named/routes):

```shell
                Name Method     Path                           Action

         toggle_book GET, HEAD  /books/:id/toggle              Web::Controllers::Books::Toggle
        search_books GET, HEAD  /books/search                  Web::Controllers::Books::Search
            new_book GET, HEAD  /books/new                     Web::Controllers::Books::New
               books POST       /books                         Web::Controllers::Books::Create
                book GET, HEAD  /books/:id                     Web::Controllers::Books::Show
```

Learn more at [Routing RESTful guide](https://guides.hanamirb.org/routing/restful-resources/).
