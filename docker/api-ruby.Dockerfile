# Use stable Ruby image
FROM ruby:3.4.2

# Install Node.js and Yarn using corepack
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && corepack enable

# Install base dependencies
RUN apt-get install -y \
    libvips-dev \
    build-essential \
    libpq-dev \
    git && \
    apt-get clean autoclean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN adduser --disabled-login --gecos "" appuser

# Create app directory and set permissions
RUN mkdir -p /app && chown -R appuser:appuser /app
WORKDIR /app

# Copy Gemfile first to leverage caching
COPY apps/ruby-rails-boilerplate/Gemfile apps/ruby-rails-boilerplate/Gemfile.lock ./
RUN gem install bundler && bundle install --jobs=4 --retry=3

# Copy remaining app files
COPY apps/ruby-rails-boilerplate/ .

# Change ownership to appuser after copying files
RUN chown -R appuser:appuser /app

# Precompile assets only if in production
ARG RAILS_ENV=development
ENV RAILS_ENV=${RAILS_ENV}
RUN if [ "$RAILS_ENV" = "production" ]; then \
      SECRET_KEY_BASE=dummy_key bundle exec rake assets:precompile; \
    fi

# Expose Rails port
EXPOSE 8085

# Switch to non-root user
USER appuser

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8085/up || exit 1

# Development vs Production
CMD if [ "$RAILS_ENV" = "development" ]; then \
      bundle install && bundle exec rails db:migrate && bundle exec rails server -b 0.0.0.0 -p 8085; \
    else \
      bundle exec rails db:migrate && bundle exec puma -C config/puma.rb; \
    fi