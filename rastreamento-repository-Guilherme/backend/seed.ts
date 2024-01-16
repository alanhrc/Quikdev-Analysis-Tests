const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {

  const hashedPassword = await bcrypt.hash('1234', 10);

  const user = await prisma.UserAccess.create({
    data: {
      name: 'Guilherme',
      email: 'admin2s@example.com',
      password: hashedPassword,
      role: ['Admin', 'admin'],
    },
  });


  await prisma.Order.create({
    data: {
      name: 'Exemplo de Pedido',
      address: 'Rua Exemplo, 123',
      status: 'Em separacao',
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
