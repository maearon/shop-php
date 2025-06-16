require 'bunny'

module Rabbitmq
  class ProductEventPublisher
    def self.publish(product)
      connection = Bunny.new(hostname: ENV.fetch("RABBITMQ_HOST", "localhost"))
      connection.start

      channel = connection.create_channel
      exchange = channel.topic("product_events", durable: true)

      exchange.publish(
        {
          event: "product.created",
          data: {
            id: product.id,
            title: product.title,
            price: product.price,
            image_url: Rails.application.routes.url_helpers.rails_blob_url(product.image, only_path: false),
            availableSizes: product.availableSizes,
            currency: product.currencyFormat
          }
        }.to_json,
        routing_key: "product.created",
        content_type: "application/json"
      )

      puts "📤 Published product.created event for product ##{product.id}"

      connection.close
    end
  end
end
