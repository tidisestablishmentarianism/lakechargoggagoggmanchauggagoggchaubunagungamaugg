This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Install notes (native modules)

`better-sqlite3` ships prebuilt binaries for every platform we support and sets
`"gypfile": false`, so nothing needs to be compiled. Older npm versions ignore
that flag when the tree comes from `package-lock.json` and run a pointless
`node-gyp rebuild` — which fails on a machine without Python + a C++ toolchain
(that's the `gyp ERR! find VS ... missing any Windows SDK` error).

The root `package.json` therefore declares:

```json
"allowScripts": { "better-sqlite3": false, "esbuild": true, "unrs-resolver": true }
```

npm 11.13+ honours it and skips the build, and the prebuilt
`better-sqlite3/prebuilds/<platform>-<arch>.node` is loaded instead.

If you are on npm 10.x (no `allowScripts` support) and hit that error, any of
these work:

```bash
npm install --ignore-scripts   # prebuilds need no install scripts on our deps
npm rebuild --ignore-scripts
```

or just install the build tools once (Visual Studio "Desktop development with C++"
incl. a Windows SDK + Python on Windows; `python3 make g++` on Linux; Xcode CLT on macOS).

## Getting Started

First, run the development server:

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
