FROM ruby:3.4.2

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    imagemagick \
    && rm -rf /var/lib/apt/lists/*

# Copy Gemfile
COPY services/image-service/Gemfile services/image-service/Gemfile.lock ./
RUN bundle install

# Copy source code
COPY services/image-service/ .

EXPOSE 8085

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8085/health || exit 1

# Development vs Production
CMD if [ "$RAILS_ENV" = "development" ]; then \
      bundle install && bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0 -p 8085; \
    else \
      bundle exec rails db:migrate && bundle exec puma -C config/puma.rb; \
    fi
