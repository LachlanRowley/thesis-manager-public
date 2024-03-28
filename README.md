# COMP4050: APEX Project

A new system for thesis students.

## Stack Summary

This project implements **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client), using [SQLite](https://www.sqlite.org/index.html).

### The tutorials we used

This project was setup using [this](https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes) as inspiration. This is a template for a blog, but we have repurposed it for our use 😊. Be sure to read through its [readme](https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/README.md) for more info on the tech we use.

## Screen Designs

Interactive UI prototypes for the full system are accessible through **Figma**.

- [Student Dashboard](https://www.figma.com/proto/fMPgdZwoHasicMGWoE4L4C/APEX-Nepal-UI-Design?node-id=1-2&starting-point-node-id=1%3A2&mode=design&t=th6ay7LQcseZouA4-1)
- [Academic Dashboard](https://www.figma.com/proto/fMPgdZwoHasicMGWoE4L4C/APEX-Nepal-UI-Design?node-id=224-366&mode=design&t=xuSzfmhjuEvJTni0-1)
- [Program Lead Dashboard](https://www.figma.com/proto/fMPgdZwoHasicMGWoE4L4C/APEX-Nepal-UI-Design?node-id=732-465&starting-point-node-id=732%3A465&mode=design&t=286tumBQcmNyNwAT-1)

## How to get this running

1. Have Node.js and make sure its updated
2. Run this `npm install next@latest react@latest react-dom@latest`. This installs next.js
3. `npm install`. This installs all the packages necessary and their dependencies.
4. Run this `npx prisma migrate dev` or `npx prisma migrate reset`. This creates the database file from the schema (db structure) and seed (initial data). ([Learn more about exactly what it does here](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production#production-and-testing-environments))
5. Spin up the server and you're done. `npm run dev`
   <br>

---

<br>

> [!IMPORTANT]
> Here are some of the first things you should do if you encounter errors in running the project
>
> - Update node.js.
> - Delete the `node_modules` and `.next` folders. Run `npm cache clean --force` then `npm install`.
> - Delete the `prisma/migrations` folder and the `dev.db` and `dev.db-journal` files. Run `npx prisma migrate dev`.

## Authentication

### Installation

1. `npm install @prisma/client @auth/prisma-adapter`
2. `npm install prisma --save-dev`
3. `npm install bcrypt`

### Add .env.local file

1. Use command: `openssl rand -base64 32` to generate a key

2. Put this key into .env.local file:
   - `NEXTAUTH_SECRET=YOUR_KEY`

### Google Auth:

1. Create google OAuth 2.0 Client IDs in https://console.cloud.google.com/apis
   watch steps here: https://youtu.be/HtJKUQXmtok?si=JhV_4A7w0Nc3pbte

2. Put your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env file like this:

   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

3. Put your google accoutn into seed.ts:
   You can find these code in async function main().
   Change with your actual info.

```
  try {
    // First, create a User_type record if it doesn't already exist
    const userType = await prisma.user_type.upsert({
      where: { id: 'googleid' },
      update: {},
      create: {
        id: 'googleid',
      },
    });
    console.log('User type created or found:', userType);

    // Next, create a User record
    const newUser = await prisma.user.create({
      data: {
        email: 'YOUR_ACTIAL_EMAIL@gmail.com',
        uni_id: 'uni12345678',
        password: 'password',
        firstname: 'firstname',
        lastname: 'lastname',
        user_type_id: userType.id,
        program_lead: false,
      },
    });
    console.log('User created:', newUser);

    // Finally, create an Account record for Google OAuth
    const googleAccount = await prisma.account.create({
      data: {
        userId: newUser.id,
        providerType: 'oauth',
        provider: 'google',
        providerAccountId: '116127996025739467889',
        //actual providerAccountId can be found when you try to login in the terminal
      },
    });
    console.log('Google account created:', googleAccount);

  } catch (error) {
    console.error(error);
  }
```

## Docker

`docker build -t apex-dev .`
`docker run -d -p 3000:3000 apex-dev`

## Seeding

In the file `prisma/seed.ts`, before the main function, a line of code generates all fake data. The values inside the function can be manipulated such that the number of projects, students, and academics can be changed. Below details what values represent what as function parameters.
`const userData: Prisma.UserCreateInput[] = generateFakeUsers(generateFakeProjects(<amount of projects>), <min amount of academics>, <total amount of students>, <OPTIONAL VALUE: amount of students with a project>, <OPTIONAL VALUE: amount of students with project preferences>);`
