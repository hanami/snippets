---
title: "PostGIS Point Type"
preview: "Using PostGIS's point type"
status: "Learn how to store and retrieve geographical data"
date: 2019-04-20T10:46:12+03:00
draft: true
gems: ["hanami", "hanami-model"]
tags: ["model", "postgis"]
versions: ["1.0"]
---

This solution was inspired by this [message](https://gitter.im/hanami/chat?at=589ca3d76b2d8dd55221aabe) and the previous discussion.

In cases, when you want to work with geographical data types provided by [PostGIS](https://postgis.net),
you should write your own implementation matching your needs.
In this snippet, you can see, how to create a type for database schema, which supports bi-directional mapping.

First of all, make sure that PostgreSQL and PostGIS are installed and work correctly.
To do this run the following commands in your terminal:


```bash
psql

\c your_database

SELECT PostGIS_full_version();
```
You should see the detailed info about your PostGIS version

To convert data stored in DB into a usable format we need to install [rgeo](https://github.com/rgeo/rgeo). Add it to your Gemfile:
```ruby
gem 'rgeo'
```

Add type `GEOGRAPHY(POINT, 4326)` to your columns.
```ruby
Hanami::Model.migration do
  change do
    create_table :geo_objects do
      primary_key :id

      column :coordinates, 'GEOGRAPHY(POINT, 4326)', null: false
    end
  end
end
```

Next, let's describe in our tests, what behavior we expect from our type.
```ruby
# spec/[your_project_name]/types/point_spec.rb

describe Point do
  subject { described_class[data] }

  describe 'Convertation into RGeo::Geographic::SphericalPointImpl' do
    shared_examples 'type' do
      it 'converts into RGeo::Geographic::SphericalPointImpl' do
        expect(subject).to be_a RGeo::Geographic::SphericalPointImpl
      end

      it 'has valid longitude and latitude' do
        expect(subject.longitude).to be 30.5634961
        expect(subject.latitude).to be 50.427712
      end
    end

    describe 'string in Well Known Binary format' do
      let(:data) { '0101000020E61000006DECC84741903E40AA0D4E44BF364940' }

      it_behaves_like 'type'
    end

    describe 'from object with #longitude and #latitude methods' do
      let(:data) { OpenStruct.new(longitude: 30.5634961, latitude: 50.427712) }

      it_behaves_like 'type'
    end

    describe 'RGeo::Geographic::SphericalPointImpl' do
      let(:data) do
        RGeo::Geographic::SphericalPointImpl.new(
          RGeo::Geographic.spherical_factory(srid: 4326),
          30.5634961,
          50.427712
        )
      end

      it_behaves_like 'type'
    end
  end

  describe '#to_sql_literal' do
    let(:data) { '0101000020E61000006DECC84741903E40AA0D4E44BF364940' }

    it 'converts class to sql expression' do
      expect(subject.sql_literal(nil)).to eq 'ST_MakePoint(30.5634961, 50.427712)'
    end
  end

  describe 'invalid input' do
    let(:data) { { lon: 30.5634961, lat: 50.427712 } }

    it 'throws an error' do
      expect { subject }.to raise_error(ArgumentError)
    end
  end
end
```

And now we can implement expected behavior.
```ruby
# lib/[your_project_name]/types/point.rb

rgeo_spherical_factory = RGeo::Geographic.spherical_factory(srid: 4326)

create_point = lambda do |point|
  RGeo::Geographic::SphericalPointImpl.new(
    rgeo_spherical_factory, point.longitude, point.latitude
  )
end

parse_point = lambda do |point_in_srid_4326|
  RGeo::WKRep::WKBParser
    .new(rgeo_spherical_factory, support_ewkb: true, default_srid: 4326)
    .parse(point_in_srid_4326)
end

to_point = lambda do |input|
  point = if input.respond_to?(:longitude) && input.respond_to?(:latitude)
            create_point.call(input)
          elsif input.is_a? String
            parse_point.call(input)
          elsif input.is_a? RGeo::Geographic::SphericalPointImpl
            input
          else
            raise ArgumentError,
                  'An input should respond to "longitude" and "latitude" ' \
                  'or be a String or be a RGeo::Geographic::SphericalPointImpl'
          end

  point.define_singleton_method :sql_literal do |_dataset|
    "ST_MakePoint(#{point.longitude}, #{point.latitude})"
  end

  point
end

Point = Dry::Types::Definition
        .new(RGeo::Geographic::SphericalPointImpl)
        .constructor(to_point)
```
Method `sql_literal` is needed to let Sequel know, how to save this type in the database.

When a new type is ready, you can use it in your schema.
```ruby
class GeoObjectRepository < Hanami::Repository
  schema do
    attribute :id, Hanami::Entity::Types::Int
    attribute :coordinates, Point
  end
end
```

That's it. Now you can easily use geographical points in your application.
```ruby
repository = GeoObjectRepository.new

repository.create(coordinates: OpenStruct.new(longitude: 30.755372, latitude: 46.479152))

repository.first
# => #<GeoObject:0x00007f93e5ab64b0 @attributes={:id=>195, :coordinates=>#<RGeo::Geographic::SphericalPointImpl:0x3fc9f2d5ad58 "POINT (30.755372 46.479152)">}>
```
