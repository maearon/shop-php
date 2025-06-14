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

# Copy Gemfile first
COPY ./apps/ruby-rails-boilerplate/Gemfile apps/ruby-rails-boilerplate/Gemfile.lock ./
RUN gem install bundler && bundle install --jobs=4 --retry=3

# Copy the rest of app
COPY ./apps/ruby-rails-boilerplate ./
COPY ./apps/ruby-rails-boilerplate/entrypoint.sh /usr/bin/entrypoint.sh

# Make sure entrypoint is executable
RUN chmod +x ./entrypoint.sh

# Precompile assets if production
ARG RAILS_ENV=development
ENV RAILS_ENV=${RAILS_ENV}
RUN if [ "$RAILS_ENV" = "production" ]; then \
      SECRET_KEY_BASE=dummy_key bundle exec rake assets:precompile; \
    fi

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:3000/up || exit 1

# Expose Rails port
EXPOSE 3000

# Switch user
USER appuser

# Set entrypoint
# ENTRYPOINT ["./entrypoint.sh"]
# Thêm trước CMD
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["/usr/bin/entrypoint.sh"]
CMD []
