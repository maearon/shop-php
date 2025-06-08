FROM docker.elastic.co/elasticsearch/elasticsearch:8.11.0

# Copy custom configuration
COPY infrastructure/search/elasticsearch.yml /usr/share/elasticsearch/config/

# Install required plugins
RUN bin/elasticsearch-plugin install analysis-icu

EXPOSE 9200 9300

HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:9200/_cluster/health || exit 1
