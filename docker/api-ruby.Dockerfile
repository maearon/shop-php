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
    # dos2unix \
    git && \
    apt-get clean autoclean && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN adduser --disabled-login --gecos "" appuser

# App directory
RUN mkdir -p /app && chown -R appuser:appuser /app
WORKDIR /app

# Copy only Gemfile first for layer caching
COPY ./apps/ruby-rails-boilerplate/Gemfile ./apps/ruby-rails-boilerplate/Gemfile.lock ./
RUN gem install bundler && bundle install --jobs=4 --retry=3

# Copy app source
COPY ./apps/ruby-rails-boilerplate ./ 
# RUN apt-get install -y dos2unix nano

# Copy entrypoint
COPY ./apps/ruby-rails-boilerplate/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

# Use entrypoint to handle pid cleanup
ENTRYPOINT ["/usr/bin/entrypoint.sh"]

# Precompile assets if production
ARG RAILS_ENV=development
ENV RAILS_ENV=${RAILS_ENV}
RUN if [ "$RAILS_ENV" = "production" ]; then \
      SECRET_KEY_BASE=dummy_key bundle exec rake assets:precompile; \
    fi

# Expose port
EXPOSE 3000

# Default command
CMD ["rails", "server", "-b", "0.0.0.0"]

# Healthcheck for production
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/up || exit 1
