# Forge Interactive Video Tutorials

## Stack details

- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/) for CSS styling
- [Planetscale](https://planetscale.com/) for data persistence
- [Prisma](https://www.prisma.io/) for ORM
- [NextAuth](https://next-auth.js.org/) for wallet authentication via WAGMI / SIWE
- [Mux](https://mux.com) for video streaming and thumbnail generation
- [Mux Player](https://docs.mux.com/guides/video/mux-player) for video playback

## Progressive Decentralization

I'm a cheapskate, everything will hopefully move to IPFS or Arweave. But ain't got time fo dat now.

### Database Setup

First, make sure you have `mysql-client` installed locally so you can take full advantage of the `pscale` CLI tool down the road. 

```
brew install mysql-client
```

Next, install the [Planetscale CLI](https://github.com/planetscale/cli). Again, on MacOS, this command will do the trick:

```
brew install planetscale/tap/pscale
```

Next, authorize the Planetscale CLI with your newly created account by running:

```
pscale auth
```

Create a new database in your Planetscale account.
```
pscale database create `your db`
```

## Modifying the database schema


```
pscale branch create `your-db` `you-new-branch`

# after a few moments, close and reopen db proxy to the new branch
pscale connect your-db your-new-branch --port 3309

# change your schema in the prisma/schema.prisma file... then,
npx prisma generate
npx prisma db push

# deploy when ready
pscale deploy-request your-db my-new-branch

# shipit
pscale deploy-request deploy your-db 1
```

## Inspecting the database

```
npx prisma studio
```