import prisma from "../../src/utils/prisma";
import bcrypt from "bcrypt";
const password = bcrypt.hashSync("admin", 12);

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@devnet.com",
      password: password,
      bio: "admin",
      image: "https://static.productionready.io/images/smiley-cyrus.jpg",
      isAdmin: true,
      role: {
        create: {
          name: "admin",
        },
      },
    },
  });
}

main()
  .then(async () => {
    console.log("Seeding finished.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
