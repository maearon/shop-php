# Next.js 15 Social Media App

```
https://github.com/maearon/bugbook
├── ./src/app/layout.tsx
│   ├── @/components/ui/toaster.tsx
│   │   ├── @/components/ui/toast.ts
│   │   └── @/components/ui/use-toast.ts
│   ├── ./src/app/api/uploadthing/core.ts
│   │   ├── @/auth.ts
│   │   ├── @lib/prisma.ts
│   │   └── @/lib/stream
│   └── ./src/app/ReactQueryProvider.tsx
├── 
├── 
├── 
├── 
├── 
├── 
└── 
```

A full-stack social media app with infinite loading, optimistic updates, authentication, DMs, notifications, file uploads, and much more.

Watch the free tutorial on YouTube PART 1: https://www.youtube.com/watch?v=TyV12oBDsYI

```
Timestamps:
0:00 - Project overview
16:54 - Project & IDE setup (create-next-app, Shadcn UI, Prettier Tailwind plugin, Prisma, extensions)
40:52 - DB setup (Vercel Postgres + Prisma ORM)
46:02 - Lucia Auth setup (username, email, password login)
2:35:11 - Navbar, SessionProvider, user button
3:17:41 - Dark mode (next-themes)
3:24:00 - Responsive sticky sidebar/bottom bar
3:34:21 - Creating posts (TipTap editor)
3:52:06 - Loading posts server-side (server component)
4:08:42 - Trending topics sidebar (unstable_cache, Suspense)
4:35:25 - React Query introduction (useQuery, QueryClient, QueryClientProvider, ReactQueryDevTools)
4:52:59 - Ky setup
4:57:46 - useInfiniteQuery (infinite loading, cursor-based pagination, react-intersection-observer)
5:22:29 - React Query cache mutation (useMutation, setQueriesData vs invalidateQueries)
5:41:21 - Deleting posts
6:08:50 - Follow feature (React Query optimistic updates)
6:53:47 - Following feed (Shadcn UI customization)
7:01:21 - User profile page (generateMetadata, loading.tsx, not-found.tsx)
```

Watch the free tutorial on YouTube PART 2: https://www.youtube.com/watch?v=1nKETjqJluI&t

```
Timestamps:
0:00 - User tooltip & react-linkify-it
30:26 - Update user profile & upload avatar (UploadThing, react-cropper, react-image-file-resizer)
1:42:48 - Post media uploads (image & video)
2:38:48 - Drag & drop and copy-paste uploads
2:46:07 - Cron job to delete orphaned uploads (Vercel cron)
2:57:52 - Post details page
3:14:58 - Likes feature (optimistic updates)
3:35:14 - Bookmarks feature
3:50:27 - Comments feature (with infinite loading)
4:49:02 - Notifications feature (Prisma transactions)
5:39:06 - Direct messages feature (Stream Chat)
7:20:36 - Google signin (OAuth2, Lucia)
7:48:20 - Search feature (+ rewrites)
8:01:51 - Deployment (Vercel, custom install command)
```

![thumbnail 7](https://github.com/user-attachments/assets/686b37e4-3d16-4bc4-a7f2-9d152c3addf5)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install \
@hookform/resolvers \
@lucia-auth/adapter-prisma \
@prisma/client \
@radix-ui/react-dialog \
@radix-ui/react-dropdown-menu \
@radix-ui/react-label \
@radix-ui/react-slot \
@radix-ui/react-tabs \
@radix-ui/react-toast \
@radix-ui/react-tooltip \
@tanstack/react-query \
@tanstack/react-query-devtools \
@tiptap/extension-placeholder \
@tiptap/pm \
@tiptap/react \
@tiptap/starter-kit \
@uploadthing/react \
arctic \
bcrypt \
class-variance-authority \
clsx \
date-fns \
ky \
lucia \
lucide-react \
next \
next-themes \
prisma \
react \
react-cropper \
react-dom \
react-hook-form \
react-image-file-resizer \
react-intersection-observer \
react-linkify-it \
stream-chat \
stream-chat-react \
tailwind-merge \
tailwindcss-animate \
uploadthing \
zod
```

```bash
npm install -D \
@types/bcrypt \
@types/node \
@types/react \
@types/react-dom \
eslint \
eslint-config-next \
eslint-config-prettier \
postcss \
prettier \
prettier-plugin-tailwindcss \
tailwindcss \
typescript
```

```bash
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
