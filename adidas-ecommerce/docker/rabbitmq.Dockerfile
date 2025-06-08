FROM rabbitmq:3.13-management-alpine

# Copy custom configuration
COPY infrastructure/queue/rabbitmq.conf /etc/rabbitmq/

# Enable management plugin
RUN rabbitmq-plugins enable --offline rabbitmq_management

EXPOSE 5672 15672

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD rabbitmq-diagnostics ping
