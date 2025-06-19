import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// Dados dos empreendimentos do dump
const empreendimentosData = [
  {
    id: 'f0d597ef-d6b3-4e95-967d-b0a7fb26c3a8',
    description: '',
    status: 'ACTIVE',
    createdAt: '2025-06-18 19:41:18.268',
    updatedAt: '2025-06-18 19:41:18.268',
    bairro: 'ARUANA',
    construtora: 'DICON',
    dataEntrega: '2027-02-28 00:00:00',
    empreendimento: 'MORADAS DA ARUANA',
    tipo: 'APTO',
    renda: null,
    tabelaLink: 'https://dicon.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=8&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=178&situacao[]=1&situacao[]=2',
    book: '1750275678069-510214169.pdf',
    bookOriginalName: 'Moradas da Aruana.pdf',
    area_ate: 60.73,
    area_de: 46.85,
    unidades: 102
  },
  {
    id: '7a56778f-35e2-4376-98d9-d97b3487e36b',
    description: '',
    status: 'ACTIVE',
    createdAt: '2025-06-17 11:22:42.733',
    updatedAt: '2025-06-17 11:22:42.733',
    bairro: 'BARRA DOS COQUEIROS',
    construtora: 'IMPACTO',
    dataEntrega: '2026-12-31 00:00:00',
    empreendimento: 'MACAU BEACH RESIDENCE',
    tipo: 'Lote',
    renda: null,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=28&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=468&situacao[]=1&situacao[]=2',
    book: '1750159362679-956431279.pdf',
    bookOriginalName: 'Book Macau Beach (1).pdf',
    area_ate: 96.55,
    area_de: 56.20,
    unidades: 26
  },
  {
    id: 'b74821b7-772f-4181-8240-c0ac2987d513',
    description: 'ASAS',
    status: 'ACTIVE',
    createdAt: '2025-06-17 09:00:25.899',
    updatedAt: '2025-06-17 09:00:25.899',
    bairro: 'BARRA DOS COQUEIROS',
    construtora: 'IMPACTO',
    dataEntrega: '2026-12-31 00:00:00',
    empreendimento: 'VILLA DOS COQUEIROS',
    tipo: 'APTO',
    renda: 1700,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=26&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=462&situacao[]=1&situacao[]=2',
    book: '1750150927194-533879065.pdf',
    bookOriginalName: 'Book Villa dos Coqueiros.pdf',
    area_ate: 43.69,
    area_de: 43.69,
    unidades: 35
  },
  {
    id: '6ac3ec94-85d7-40d3-a6e1-95a1a2bc1bf6',
    description: 'TESTE',
    status: 'ACTIVE',
    createdAt: '2025-06-17 04:16:37.839',
    updatedAt: '2025-06-17 04:16:37.839',
    bairro: 'MARIVAN',
    construtora: 'IMPACTO',
    dataEntrega: '2026-12-31 00:00:00',
    empreendimento: 'VILLA AUREA',
    tipo: 'APTO',
    renda: 1800,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=30&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=467&situacao[]=1&situacao[]=2',
    book: '1750150322996-54979619.pdf',
    bookOriginalName: 'Book Digital - Villa Aurea.pdf',
    area_ate: 43.69,
    area_de: 43.69,
    unidades: 55
  },
  {
    id: '0df78dff-ae0e-4790-aad4-fb5a306d533d',
    description: '',
    status: 'ACTIVE',
    createdAt: '2025-06-18 02:07:24.01',
    updatedAt: '2025-06-18 02:07:24.01',
    bairro: 'COROA DO MEIO',
    construtora: 'STANZA',
    dataEntrega: '2026-05-30 00:00:00',
    empreendimento: 'MARALTO',
    tipo: 'APTO',
    renda: 7000,
    tabelaLink: 'https://stanza.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=12&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=339&situacao[]=1&situacao[]=2',
    book: '1750212982313-605236569.pdf',
    bookOriginalName: 'Book Maralto.pdf',
    area_ate: 55.67,
    area_de: 55.67,
    unidades: 4
  },
  {
    id: '9316e311-e3ff-48a3-8917-fa3a971d85ba',
    description: 'BONUS R$ 500,00\n\nO valor do condomínio é de R$424,11, taxa extra de R$49,00, referente à  cobertura das garagens, totalizando R$473,11.\n\nNo entanto, para pagamentos efetuados até o dia 10, é\n\nconcedido um desconto, e o valor fica em R$406,00.',
    status: 'ACTIVE',
    createdAt: '2025-06-18 02:37:39.863',
    updatedAt: '2025-06-18 02:37:39.863',
    bairro: 'INÁCIO BARBOSA',
    construtora: 'IMPACTO',
    dataEntrega: '2000-01-01 00:00:00',
    empreendimento: 'PORTO SOLLARE',
    tipo: 'APTO',
    renda: null,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=23&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=460&situacao[]=1&situacao[]=2',
    book: '1750214259834-410328557.pdf',
    bookOriginalName: 'Book Porto Sollare.pdf',
    area_ate: 55.40,
    area_de: 55.40,
    unidades: 1
  },
  {
    id: '9e1bcc4e-2798-4162-9ece-70849e094d94',
    description: '',
    status: 'ACTIVE',
    createdAt: '2025-06-18 02:40:10.971',
    updatedAt: '2025-06-18 02:40:10.971',
    bairro: 'ARUANA',
    construtora: 'IMPACTO',
    dataEntrega: '2028-10-31 00:00:00',
    empreendimento: 'SILVIA FONSECA DINIZ',
    tipo: 'APTO',
    renda: null,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=29&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=450&situacao[]=1&situacao[]=2',
    book: '1750272078627-989726456.pdf',
    bookOriginalName: 'Book Digital Silvia Fonseca Diniz.pdf',
    area_ate: 144.40,
    area_de: 92.71,
    unidades: 48
  },
  {
    id: '71bb0271-95ca-473c-8961-256b49418c3d',
    description: '',
    status: 'ACTIVE',
    createdAt: '2025-06-18 18:40:03.715',
    updatedAt: '2025-06-18 18:40:03.715',
    bairro: 'SANTA LUCIA',
    construtora: 'IMPACTO',
    dataEntrega: '2028-10-30 00:00:00',
    empreendimento: 'PORTO ARBORETO',
    tipo: 'APTO',
    renda: null,
    tabelaLink: 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=27&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=453&situacao[]=1&situacao[]=2',
    book: '1750272003658-842466967.pdf',
    bookOriginalName: 'Porto_Arboreto_Book_Digital_13.pdf',
    area_ate: 79.14,
    area_de: 56.20,
    unidades: 153
  }
];

// Mapeamento de construtoras para links
const construtorasLinks = {
  'DICON': 'https://dicon.cvcrm.com.br/corretor/index/inicio',
  'IMPACTO': 'https://impacto.cvcrm.com.br/corretor/index/inicio',
  'STANZA': 'https://stanza.cvcrm.com.br/corretor/index/inicio'
};

async function main() {
  console.log('Iniciando importação dos empreendimentos...');

  // Primeiro, vamos garantir que todas as construtoras existam
  const construtorasNecessarias = [...new Set(empreendimentosData.map(emp => emp.construtora))];
  
  console.log('Verificando/criando construtoras...');
  for (const nomeConstrutora of construtorasNecessarias) {
    const existing = await prisma.construtora.findFirst({
      where: { nome: nomeConstrutora }
    });

    if (!existing) {
      const link = construtorasLinks[nomeConstrutora as keyof typeof construtorasLinks];
      await prisma.construtora.create({
        data: {
          nome: nomeConstrutora,
          link: link || null,
        },
      });
      console.log(`Construtora criada: ${nomeConstrutora}`);
    } else {
      console.log(`Construtora já existe: ${nomeConstrutora}`);
    }
  }

  // Agora vamos importar os empreendimentos
  console.log('Importando empreendimentos...');
  for (const empData of empreendimentosData) {
    // Buscar a construtora
    const construtora = await prisma.construtora.findFirst({
      where: { nome: empData.construtora }
    });

    if (!construtora) {
      console.error(`Construtora não encontrada: ${empData.construtora}`);
      continue;
    }

    // Verificar se o empreendimento já existe
    const existing = await prisma.empreendimento.findUnique({
      where: { id: empData.id }
    });

    if (existing) {
      console.log(`Empreendimento já existe: ${empData.empreendimento}`);
      continue;
    }

    // Criar o empreendimento
    try {
      await prisma.empreendimento.create({
        data: {
          id: empData.id,
          construtoraId: construtora.id,
          empreendimento: empData.empreendimento,
          bairro: empData.bairro,
          tipo: empData.tipo,
          dataEntrega: new Date(empData.dataEntrega),
          description: empData.description,
          status: empData.status,
          renda: empData.renda,
          tabelaLink: empData.tabelaLink,
          book: empData.book,
          bookOriginalName: empData.bookOriginalName,
          area_de: empData.area_de ? new Decimal(empData.area_de.toString()) : null,
          area_ate: empData.area_ate ? new Decimal(empData.area_ate.toString()) : null,
          unidades: empData.unidades,
          createdAt: new Date(empData.createdAt),
          updatedAt: new Date(empData.updatedAt),
        },
      });
      console.log(`Empreendimento criado: ${empData.empreendimento} (${empData.construtora})`);
    } catch (error) {
      console.error(`Erro ao criar empreendimento ${empData.empreendimento}:`, error);
    }
  }

  console.log('Importação concluída!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 