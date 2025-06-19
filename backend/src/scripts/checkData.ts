import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== VERIFICAÇÃO DOS DADOS IMPORTADOS ===\n');

  // Verificar construtoras
  console.log('CONSTRUTORAS:');
  const construtoras = await prisma.construtora.findMany({
    include: {
      _count: {
        select: {
          empreendimentos: true
        }
      }
    },
    orderBy: {
      nome: 'asc'
    }
  });

  for (const construtora of construtoras) {
    console.log(`- ${construtora.nome} (${construtora._count.empreendimentos} empreendimentos)`);
    if (construtora.link) {
      console.log(`  Link: ${construtora.link}`);
    }
  }

  console.log('\n=== EMPREENDIMENTOS ===');
  const empreendimentos = await prisma.empreendimento.findMany({
    include: {
      construtora: true
    },
    orderBy: [
      { construtora: { nome: 'asc' } },
      { empreendimento: 'asc' }
    ]
  });

  for (const emp of empreendimentos) {
    console.log(`- ${emp.empreendimento}`);
    console.log(`  Construtora: ${emp.construtora.nome}`);
    console.log(`  Bairro: ${emp.bairro}`);
    console.log(`  Tipo: ${emp.tipo}`);
    console.log(`  Unidades: ${emp.unidades}`);
    console.log(`  Área: ${emp.area_de || 'N/A'} - ${emp.area_ate || 'N/A'} m²`);
    console.log(`  Renda: ${emp.renda ? `R$ ${emp.renda}` : 'N/A'}`);
    console.log(`  Status: ${emp.status}`);
    console.log('');
  }

  console.log(`Total de construtoras: ${construtoras.length}`);
  console.log(`Total de empreendimentos: ${empreendimentos.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 