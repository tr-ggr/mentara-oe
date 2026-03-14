import 'reflect-metadata';
import { auth } from '../app/auth/auth.js';
import { getBootstrapEnv } from '../app/config/env.js';
import { prisma } from '../app/prisma/prisma-client.js';

async function bootstrapAdmin() {
  const env = getBootstrapEnv();

  const existingUser = await prisma.user.findUnique({
    where: { email: env.BOOTSTRAP_ADMIN_EMAIL },
    select: { id: true, role: true },
  });

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        email: env.BOOTSTRAP_ADMIN_EMAIL,
        password: env.BOOTSTRAP_ADMIN_PASSWORD,
        name: env.BOOTSTRAP_ADMIN_NAME,
      },
      headers: new Headers(),
    });
  }

  await prisma.user.update({
    where: { email: env.BOOTSTRAP_ADMIN_EMAIL },
    data: { role: 'admin' },
  });

  console.log(`Bootstrap admin ready: ${env.BOOTSTRAP_ADMIN_EMAIL}`);
}

bootstrapAdmin()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
