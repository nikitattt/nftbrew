# NFTBrew - daily newsletter with market updates on your beloved NFT projects

![Mail preview](https://i.imgur.com/poG2Tjr.png)

## Link to the website: https://nftbrewbarista.xyz

## Project walk-through

This is the Next project with the [EIP-4361](https://docs.login.xyz/general-information/siwe-overview/eip-4361) for authentication, Planetscale for data storage, [Zora API](https://api.zora.co/) for NFT collections data retrieval.

Uses RainbowKit, wagmi, zustand, NextAuth, Prisma, Apollo, axios and swr.

On `environment variables`: all `env` files with `.example` suffixes are copies of required `env` files. Just remove `.example` and add required variables

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
