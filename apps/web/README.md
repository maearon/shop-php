```
maearon@maearon:~/code/shop-php/apps/web$ nvm i 20
Downloading and installing node v20.19.3...
Downloading https://nodejs.org/dist/v20.19.3/node-v20.19.3-linux-x64.tar.xz...
################################################################################################################################################################################# 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v20.19.3 (npm v10.8.2)
maearon@maearon:~/code/shop-php/apps/web$ nvm alias default v20.19.3
default -> v20.19.3
maearon@maearon:~/code/shop-php/apps/web$ nvm use default
Now using node v20.19.3 (npm v10.8.2)
maearon@maearon:~/code/shop-php/apps/web$ node -v
v20.19.3

```
```
maearon@maearon:~/code/shop-php/apps/web$ npx create-storybook@latest
info Installing dependencies...
info 

added 9 packages, and audited 499 packages in 3s

165 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
info Dependencies installed
╭───────────────────────────────────────────────────────╮
│                                                       │
│   Adding Storybook version 9.0.12 to your project..   │
│                                                       │
╰───────────────────────────────────────────────────────╯
✔ New to Storybook? › Yes: Help me with onboarding
Attention: Storybook now collects completely anonymous telemetry regarding usage. This information is used to shape Storybook's roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://storybook.js.org/telemetry

 • Detecting project type. ✓

  ✅ Getting the correct version of 5 packages
npm warn deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
npm warn deprecated move-concurrently@1.0.1: This package is no longer supported.
npm warn deprecated figgy-pudding@3.5.2: This module is no longer supported.
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm warn deprecated copy-concurrently@1.0.5: This package is no longer supported.
npm warn deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated
npm warn deprecated source-map-resolve@0.5.3: See https://github.com/lydell/source-map-resolve#deprecated
npm warn deprecated fs-write-stream-atomic@1.0.10: This package is no longer supported.
npm warn deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

added 1052 packages, and audited 1551 packages in 32s

252 packages are looking for funding
  run `npm fund` for details

21 vulnerabilities (3 moderate, 17 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
  ✅ Installing Storybook dependencies
. ✓
info Installing dependencies...
info 

up to date, audited 1551 packages in 3s

252 packages are looking for funding
  run `npm fund` for details

21 vulnerabilities (3 moderate, 17 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
info Dependencies installed
> npx storybook@9.0.12 add --yes @storybook/addon-a11y@9.0.12
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated rimraf@2.6.3: Rimraf versions prior to v4 are no longer supported
Verifying @storybook/addon-a11y
Installing @storybook/addon-a11y@^9.0.12

added 1 package, and audited 1552 packages in 3s

253 packages are looking for funding
  run `npm fund` for details

21 vulnerabilities (3 moderate, 17 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
Adding '@storybook/addon-a11y@9.0.12' to the "addons" field in .storybook/main.ts
Running postinstall script for @storybook/addon-a11y
> npx storybook@9.0.12 add --yes @storybook/addon-vitest@9.0.12
Verifying @storybook/addon-vitest
Installing @storybook/addon-vitest@^9.0.12

added 4 packages, and audited 1556 packages in 8s

254 packages are looking for funding
  run `npm fund` for details

21 vulnerabilities (3 moderate, 17 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
Adding '@storybook/addon-vitest@9.0.12' to the "addons" field in .storybook/main.ts
Running postinstall script for @storybook/addon-vitest

╭ 👋 Howdy! ─────────────────────────────────────────────────────────────────╮
│                                                                            │
│   I'm the installation helper for @storybook/addon-vitest                  │
│                                                                            │
│   Hold on for a moment while I look at your project and get it set up...   │
│                                                                            │
╰────────────────────────────────────────────────────────────────────────────╯
Scanning for affected files...
Scanning 862 files...

╭ 🙈 Let me cover this for you ──────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                                            │
│   You don't seem to have a coverage reporter installed. Vitest needs either V8 or Istanbul to generate coverage reports.   │
│                                                                                                                            │
│   Adding "@vitest/coverage-v8" to enable coverage reporting.                                                               │
│   Read more about Vitest coverage providers at https://vitest.dev/guide/coverage.html#coverage-providers                   │
│                                                                                                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

› Installing dependencies:
  vitest, @vitest/browser, playwright, @vitest/coverage-v8
info Installing dependencies...
info 

added 82 packages, removed 54 packages, and audited 1574 packages in 25s

215 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
info Dependencies installed

› Configuring Playwright with Chromium (this might take some time):
  npx playwright install chromium --with-deps
[sudo] password for maearon: 




› Creating a Vitest setup file for Storybook:
  /home/maearon/code/shop-php/apps/web/.storybook/vitest.setup.ts

› Creating a Vitest config file:
  /home/maearon/code/shop-php/apps/web/vitest.config.ts
› Setting up @storybook/addon-a11y for @storybook/addon-vitest:
info Automigration detected: addon-a11y-addon-test
info 
info Ran addon-a11y-addon-test migration
info Installing dependencies...
info 

added 1 package, and audited 1575 packages in 3s

215 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
info Dependencies installed

╭ 🎉 All done! ───────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                         │
│         @storybook/addon-vitest is now configured and you're ready to run your tests!                   │
│                                                                                                         │
│         Here are a couple of tips to get you started:                                                   │
│         • You can run tests with "npx vitest"                                                           │
│         • When using the Vitest extension in your editor, all of your stories will be shown as tests!   │
│                                                                                                         │
│         Check the documentation for more information about its features and options at:                 │
│         https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon                      │
│                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯

╭──────────────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Storybook was successfully installed in your project! 🎉                   │
│   Additional features: docs, test, onboarding                                │
│                                                                              │
│   To run Storybook manually, run npm run storybook. CTRL+C to stop.          │
│                                                                              │
│   Wanna know more about Storybook? Check out https://storybook.js.org/       │
│   Having trouble or want to chat? Join us at https://discord.gg/storybook/   │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

Running Storybook

> adidas-clone@0.1.0 storybook
> storybook dev -p 6006 --initial-path=/onboarding --quiet

storybook v9.0.12

info => Serving static files from /home/maearon/code/shop-php/node_modules/@chromatic-com/storybook/assets at /addon-visual-tests-assets
info => Serving static files from ././public at /
info Using tsconfig paths for react-docgen
9:47:19 AM [vite] (client) ✨ new dependencies optimized: styled-jsx/style
9:47:19 AM [vite] (client) ✨ optimized dependencies changed. reloading
9:59:29 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js
9:59:29 AM [vite] (client) Pre-transform error: Failed to load url /stories/Button.tsx (resolved id: /home/maearon/code/shop-php/apps/web/stories/Button.tsx) in /home/maearon/code/shop-php/apps/web/stories/Button.stories.ts. Does the file exist?
10:00:00 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js
10:08:23 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js (x2)
10:08:24 AM [vite] (client) ✨ new dependencies optimized: @radix-ui/react-slot, class-variance-authority, clsx, tailwind-merge
10:08:24 AM [vite] (client) ✨ optimized dependencies changed. reloading
10:17:28 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js
10:20:04 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js (x2)
10:22:47 AM [vite] (client) hmr update /@id/__x00__virtual:/@storybook/builder-vite/vite-app.js (x3)
```

```
📦 frontend/
│   ├── apps/web/hooks/useAuth.ts (đã tạo mới)
│   ├── apps/web/context/AuthContext.tsx (đã tạo mới)
│   ├── apps/web/lib/token.ts (đã tạo mới)
│   ├── apps/web/api/authApi.ts (đã tạo mới)
│   ├── apps/web/api/userApi.ts 
│   └── apps/web/app/layout.tsx
│
📦 express-gateway/
│   └── routes.yaml (proxy /auth/oauth → backend) apps\api-gateway\config\gateway.config.yml
│
📦 backend-api-java/ (Spring Boot)
│   └── apps\spring-boilerplate\src\main\java\com\example\springboilerplate\controller\api\AuthApiController.java
│   └── apps\spring-boilerplate\src\main\java\com\example\springboilerplate\service\AuthService.java (đã tạo mới vì /login đang chỉ gọi đến apps/spring-boilerplate/src/main/java/com/example/springboilerplate/security/JwtTokenProvider.java) 
│   └── apps\spring-boilerplate\src\main\java\com\example\springboilerplate\model\User.java
│   └── apps\spring-boilerplate\src\main\java\com\example\springboilerplate\repository\UserRepository.java
│   └── utils/JwtUtil.java (đã tạo apps\spring-boilerplate\src\main\java\com\example\springboilerplate\utils\JwtUtil.java)
```


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install tailwindcss@3.4.1 postcss autoprefixer


rm -rf node_modules .next package-lock.json
npm install
npm run dev


npm list tailwindcss postcss autoprefixer @tailwindcss/postcss


npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss


npx eslint --init


npm install -D postcss autoprefixer


npx shadcn@latest add input

npx shadcn@latest add button

npx shadcn@latest init


npm install -D @tailwindcss/postcss



TURBOPACK_TRACE=true npm run dev



npm install @reduxjs/toolkit react-redux

npm install \
@hookform/resolvers \
@radix-ui/react-checkbox \
@radix-ui/react-slot \
@radix-ui/react-tabs \
@reduxjs/toolkit \
axios \
class-variance-authority \
clsx \
formik \
lucide-react \
react-hook-form \
react-js-pagination \
react-loading-skeleton \
react-redux \
react-toastify \
tailwind-merge \
tailwindcss-animate \
yup \
zod

npm install -D \
@types/node \
@types/react \
@types/react-dom \
autoprefixer \
eslint \
eslint-config-next \
postcss \
tailwindcss \
typescript

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
