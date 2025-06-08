# NPM Commands Guide

## 🚀 Quick Start

\`\`\`bash
# Setup development environment
npm run setup:dev

# Start all services with hot reload
npm run dev

# Check service health
npm run health
\`\`\`

## 📋 Available Commands

### Development
- `npm run dev` - Start all services with hot reload
- `npm run dev:detach` - Start in background (detached mode)
- `npm run dev:rebuild` - Stop and restart with fresh build

### Production
- `npm run up` - Start production environment
- `npm run up:prod` - Start with production compose file

### Service Management
- `npm run status` - Show service status
- `npm run health` - Check service health
- `npm run restart` - Restart all services
- `npm run restart:service --service=auth` - Restart specific service
- `npm run rebuild:service --service=auth` - Rebuild specific service

### Logs
- `npm run logs` - Show all service logs
- `npm run logs:auth` - Show auth service logs
- `npm run logs:order` - Show order service logs
- `npm run logs:cart` - Show cart service logs
- `npm run logs:catalog` - Show catalog service logs
- `npm run logs:payment` - Show payment service logs
- `npm run logs:media` - Show media service logs
- `npm run logs:gateway` - Show gateway logs
- `npm run logs:storefront` - Show storefront logs
- `npm run logs:admin` - Show admin dashboard logs

### Database Operations
- `npm run migrate` - Run all migrations
- `npm run migrate:auth` - Run auth service migrations
- `npm run migrate:order` - Run order service migrations
- `npm run migrate:media` - Run media service migrations
- `npm run migrate:reset` - Reset and re-run all migrations

### Data Seeding
- `npm run seed` - Seed all services with sample data
- `npm run seed:catalog` - Seed catalog service
- `npm run seed:media` - Seed media service
- `npm run seed:auth` - Seed auth service
- `npm run seed:reset` - Reset database and seed

### Testing
- `npm run test` - Run all tests
- `npm run test:unit` - Run unit tests only
- `npm run test:integration` - Run integration tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:auth` - Test auth service
- `npm run test:order` - Test order service
- `npm run test:cart` - Test cart service
- `npm run test:catalog` - Test catalog service
- `npm run test:payment` - Test payment service
- `npm run test:media` - Test media service
- `npm run test:watch` - Run tests in watch mode

### Building
- `npm run build` - Build all services and apps
- `npm run build:services` - Build backend services only
- `npm run build:apps` - Build frontend apps only
- `npm run build:gateway` - Build gateway only

### Cleanup
- `npm run down` - Stop all services
- `npm run down:volumes` - Stop and remove volumes (⚠️ data loss)
- `npm run clean` - Clean containers, networks, volumes
- `npm run clean:images` - Remove Docker images
- `npm run clean:all` - Complete cleanup

### Monitoring
- `npm run monitor` - Start monitoring stack (Prometheus, Grafana, Jaeger)
- `npm run monitor:down` - Stop monitoring stack

### Code Quality
- `npm run lint` - Lint all code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - TypeScript type checking

### Security
- `npm run security:scan` - Security vulnerability scan
- `npm run security:fix` - Fix security issues

### Backup & Restore
- `npm run backup` - Backup database
- `npm run restore` - Restore database from backup

### Deployment
- `npm run deploy:staging` - Deploy to staging
- `npm run deploy:production` - Deploy to production

### Documentation
- `npm run docs` - Generate documentation
- `npm run docs:api` - Generate API documentation

## 🔧 Service-Specific Commands

### Restart a specific service:
\`\`\`bash
npm run restart:service --service=auth
npm run restart:service --service=order
npm run restart:service --service=cart
\`\`\`

### Rebuild a specific service:
\`\`\`bash
npm run rebuild:service --service=catalog
npm run rebuild:service --service=payment
\`\`\`

### View logs for a specific service:
\`\`\`bash
npm run logs:auth
npm run logs:storefront
npm run logs:gateway
\`\`\`

## 🌍 Cross-Platform Compatibility

All commands work on:
- ✅ Windows 11
- ✅ macOS
- ✅ Linux

Thanks to `cross-env` and Node.js scripts, no more Makefile issues on Windows!

## 🚨 Troubleshooting

### Services won't start:
\`\`\`bash
npm run clean
npm run setup:dev
npm run dev
\`\`\`

### Database issues:
\`\`\`bash
npm run migrate:reset
npm run seed
\`\`\`

### Port conflicts:
\`\`\`bash
npm run down
# Check for processes using ports 3000, 3001, 80
npm run dev
\`\`\`

### Permission issues (Linux/macOS):
\`\`\`bash
sudo chown -R $USER:$USER .
npm run dev
