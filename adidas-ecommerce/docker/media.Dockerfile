FROM ruby:3.2-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy Gemfile
COPY services/media-service/Gemfile services/media-service/Gemfile.lock ./
RUN bundle install

# Copy source code
COPY services/media-service/ .

# Create entrypoint script
RUN echo '#!/bin/bash\n\
if [ "$RAILS_ENV" = "development" ]; then\n\
  bundle exec rails server -b 0.0.0.0 -p 8085\n\
else\n\
  bundle exec puma -C config/puma.rb\n\
fi' > start.sh && chmod +x start.sh

EXPOSE 8085

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8085/health || exit 1

CMD ["./start.sh"]
