import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const construtoras = [
    { nome: 'MRV Engenharia', link: 'https://www.mrv.com.br' },
    { nome: 'Impacto', link: 'https://impacto.cvcrm.com.br/corretor/index/inicio' },
    { nome: 'Celi', link: 'https://celi.cvcrm.com.br/corretor/index/inicio' },
    { nome: 'Dicon', link: 'https://dicon.cvcrm.com.br/corretor/index/inicio' },
    { nome: 'Jota Nunes', link: 'https://jotanunes.cvcrm.com.br/corretor/index/inicio' },
    { nome: 'Stanza', link: 'https://stanza.cvcrm.com.br/corretor/index/inicio' },
  ];

  console.log('Criando construtoras...');

  for (const construtora of construtoras) {
    // Check if construtora already exists
    const existing = await prisma.construtora.findFirst({
      where: { nome: construtora.nome }
    });

    if (existing) {
      console.log(`Construtora já existe: ${construtora.nome}`);
    } else {
      await prisma.construtora.create({
        data: {
          nome: construtora.nome,
          link: construtora.link,
        },
      });
      console.log(`Construtora criada: ${construtora.nome}`);
    }
  }

  console.log('Seed concluído!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 