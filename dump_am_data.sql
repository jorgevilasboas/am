--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Empreendimento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('f0d597ef-d6b3-4e95-967d-b0a7fb26c3a8', '', 'ACTIVE', '2025-06-18 19:41:18.268', '2025-06-18 19:41:18.268', 'ARUANA', 'DICON', '2027-02-28 00:00:00', 'MORADAS DA ARUANA', 'APTO', NULL, 'https://dicon.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=8&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=178&situacao[]=1&situacao[]=2', '1750275678069-510214169.pdf', 'Moradas da Aruana.pdf', 60.73, 46.85, 102);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('7a56778f-35e2-4376-98d9-d97b3487e36b', '', 'ACTIVE', '2025-06-17 11:22:42.733', '2025-06-17 11:22:42.733', 'BARRA DOS COQUEIROS', 'IMPACTO', '2026-12-31 00:00:00', 'MACAU BEACH RESIDENCE', 'Lote', NULL, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=28&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=468&situacao[]=1&situacao[]=2', '1750159362679-956431279.pdf', 'Book Macau Beach (1).pdf', 96.55, 56.20, 26);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('b74821b7-772f-4181-8240-c0ac2987d513', 'ASAS', 'ACTIVE', '2025-06-17 09:00:25.899', '2025-06-17 09:00:25.899', 'BARRA DOS COQUEIROS', 'IMPACTO', '2026-12-31 00:00:00', 'VILLA DOS COQUEIROS', 'APTO', 1700, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=26&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=462&situacao[]=1&situacao[]=2', '1750150927194-533879065.pdf', 'Book Villa dos Coqueiros.pdf', 43.69, 43.69, 35);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('6ac3ec94-85d7-40d3-a6e1-95a1a2bc1bf6', 'TESTE', 'ACTIVE', '2025-06-17 04:16:37.839', '2025-06-17 04:16:37.839', 'MARIVAN', 'IMPACTO', '2026-12-31 00:00:00', 'VILLA AUREA', 'APTO', 1800, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=30&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=467&situacao[]=1&situacao[]=2', '1750150322996-54979619.pdf', 'Book Digital - Villa Aurea.pdf', 43.69, 43.69, 55);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('0df78dff-ae0e-4790-aad4-fb5a306d533d', '', 'ACTIVE', '2025-06-18 02:07:24.01', '2025-06-18 02:07:24.01', 'COROA DO MEIO', 'STANZA', '2026-05-30 00:00:00', 'MARALTO', 'APTO', 7000, 'https://stanza.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=12&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=339&situacao[]=1&situacao[]=2', '1750212982313-605236569.pdf', 'Book Maralto.pdf', 55.67, 55.67, 4);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('9316e311-e3ff-48a3-8917-fa3a971d85ba', 'BONUS R$ 500,00
O valor do condomínio é de R$424,11, taxa extra de R$49,00, referente à  cobertura das garagens, totalizando R$473,11.
No entanto, para pagamentos efetuados até o dia 10, é
concedido um desconto, e o valor fica em R$406,00.', 'ACTIVE', '2025-06-18 02:37:39.863', '2025-06-18 02:37:39.863', 'INÁCIO BARBOSA', 'IMPACTO', '2000-01-01 00:00:00', 'PORTO SOLLARE', 'APTO', NULL, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=23&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=460&situacao[]=1&situacao[]=2', '1750214259834-410328557.pdf', 'Book Porto Sollare.pdf', 55.40, 55.40, 1);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('9e1bcc4e-2798-4162-9ece-70849e094d94', '', 'ACTIVE', '2025-06-18 02:40:10.971', '2025-06-18 02:40:10.971', 'ARUANA', 'IMPACTO', '2028-10-31 00:00:00', 'SILVIA FONSECA DINIZ', 'APTO', NULL, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=29&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=450&situacao[]=1&situacao[]=2', '1750272078627-989726456.pdf', 'Book Digital Silvia Fonseca Diniz.pdf', 144.40, 92.71, 48);
INSERT INTO public."Empreendimento" (id, description, status, "createdAt", "updatedAt", bairro, construtora, "dataEntrega", empreendimento, tipo, renda, "tabelaLink", book, "bookOriginalName", area_ate, area_de, unidades) VALUES ('71bb0271-95ca-473c-8961-256b49418c3d', '', 'ACTIVE', '2025-06-18 18:40:03.715', '2025-06-18 18:40:03.715', 'SANTA LUCIA', 'IMPACTO', '2028-10-30 00:00:00', 'PORTO ARBORETO', 'APTO', NULL, 'https://impacto.cvcrm.com.br/corretor/relatorios/tabeladepreco/html?q%5B1%7Ce.idempreendimento%5D=27&q%5B1%7Cb.idbloco%5D=&q%5B1%7Ct.idtabela%5D=453&situacao[]=1&situacao[]=2', '1750272003658-842466967.pdf', 'Porto_Arboreto_Book_Digital_13.pdf', 79.14, 56.20, 153);


--
-- Data for Name: Lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Lead" (id, nome, email, telefone, "createdAt", "updatedAt", anotacoes, "crmLink", "dataNascimento", entrada, renda) VALUES ('2a312044-60bf-4ee8-8081-8a0416dee6d2', 'Adelma', NULL, '(79) 99951-0991', '2025-06-17 12:16:38.113', '2025-06-17 12:34:50.517', 'Interesse em RECANTO DO SANTA MARIA. ', 'https://sistemasupremo.com.br/corretor/leads-atender.php?clea_id=2513059', NULL, 0, 1500);
INSERT INTO public."Lead" (id, nome, email, telefone, "createdAt", "updatedAt", anotacoes, "crmLink", "dataNascimento", entrada, renda) VALUES ('f735d553-3a6d-4852-83c5-b4001e25075a', 'Eliane', NULL, '(79) 99869-5053', '2025-06-17 13:24:52.904', '2025-06-17 13:24:52.904', NULL, 'https://sistemasupremo.com.br/corretor/leads-atender.php?clea_id=2463754', NULL, NULL, NULL);
INSERT INTO public."Lead" (id, nome, email, telefone, "createdAt", "updatedAt", anotacoes, "crmLink", "dataNascimento", entrada, renda) VALUES ('d46bd9e5-ae9c-4d38-84dc-86a7d31c1c72', 'Celia', NULL, '+55 79 99848-8259', '2025-06-18 17:47:16.177', '2025-06-18 17:47:16.177', 'Viu anuncio de 500 reais de entrada e se interessou. Nao tem condicoes de comprar (renda + idade), ia tentar convencer a filha. mandei villa aurea, porto aruana e moradas da aruana. aguardando documentacao.', 'https://sistemasupremo.com.br/corretor/leads-atender.php?clea_id=2527099', NULL, NULL, NULL);


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", role, aprovado) VALUES ('5dc5e81d-5b0b-4cc7-8542-52b5bb9d9606', 'Admin', 'admin@admin.com', '$2a$12$2JsgOPZzjQstiD.XTg0fZOnK6WdNRj1Ic5xPQjLhfj44TEpRSc/eW', '2025-06-17 03:09:58.267', '2025-06-17 06:56:10.154', 'ADMIN', true);
INSERT INTO public."User" (id, name, email, password, "createdAt", "updatedAt", role, aprovado) VALUES ('7bb07127-ee58-4d69-80c1-a4f968a328b5', 'maria', 'maria@gmail.com', '$2a$12$YFCsC0LyGoKBfXYx6m/lzeDkzD3BfpDD6jsUR3kYhKiWaYVhR3/au', '2025-06-17 11:09:36.741', '2025-06-17 11:09:36.741', 'USER', false);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('cfaa39e8-d71b-48da-916d-fc8711d48a76', '7aedae46f69d3c37a8f0a04f54fca59a7faecfd2405d662079d6f2cc58214aa9', '2025-06-17 03:09:51.770179+00', '20250617023925_start', NULL, NULL, '2025-06-17 03:09:51.765863+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2734e49b-2c8e-4deb-9b6c-95a86f4e3d5e', 'cb9ba121aafed1577c7da8b2955f399826387023a07e1ec1ab576289becaf24b', '2025-06-17 03:14:48.674257+00', '20250617031448_add_empreendimento', NULL, NULL, '2025-06-17 03:14:48.667666+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('075cdf69-c3e0-4933-b4f2-fa85b165acb3', 'bd32541abe71175a11c4a940b2edb82289ddaff6362753250b57cd42cddfca4b', '2025-06-17 09:11:33.328196+00', '20250617091133_add_area_fields', NULL, NULL, '2025-06-17 09:11:33.324407+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1aa369a5-45f5-46dc-9ab6-e0ae9faa05bd', '38890c160557754d768e6b8cba07f72a7696356516d9bad4a50a7d38cd3b3c9a', '2025-06-17 03:58:37.798849+00', '20250617035837_update_empreendimento_fields', NULL, NULL, '2025-06-17 03:58:37.794545+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f45ca9de-29f6-4ba4-8895-47c581a8219b', 'd9d61e1d36db971b83b0dceb5709c6ba1c804ed4bcbcc03c929307c84840bdca', '2025-06-17 04:15:01.965726+00', '20250617041501_update_user_role', NULL, NULL, '2025-06-17 04:15:01.961261+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('17e95646-85df-43f7-b37a-7ef8df769c33', 'b6583f66ba124b88678b5a7c0b849c49df059c8b356f4e1a3af0e7781f70c46e', '2025-06-17 05:52:49.939879+00', '20250617055249_nada', NULL, NULL, '2025-06-17 05:52:49.931647+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('75b9f29d-6587-42a3-97fe-e26b551a193e', '7a5a68ad0b8b923791f835bc8001306697125e8aab1289dd6b50f9a36d3d7488', '2025-06-17 14:19:21.138164+00', '20250617141845_add_unidades_to_empreendimento', NULL, NULL, '2025-06-17 14:19:21.133617+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('25b6fcea-b33f-4183-830c-187283c2ff08', '572465cadbfdf07af455249729c1eb6f96f7134272470d16c77307f82346c173', '2025-06-17 06:08:39.669973+00', '20250617060839_add_lead_model', NULL, NULL, '2025-06-17 06:08:39.665927+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('9cb844ef-b3bf-4cf8-b7f0-316119d68719', 'fbc57f46ab68b172f66d17bd5cc4b2f323e43f3c055c6009e2f938d7d1386fb6', '2025-06-17 06:13:15.560023+00', '20250617061315_make_lead_fields_optional', NULL, NULL, '2025-06-17 06:13:15.556438+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('26eb5e3b-5b96-4b60-878f-686c5f2e9ec7', 'd9f6ad7ab2a635f50b307b56736539233d2680ae8da57c611ddc69fd50189b8f', '2025-06-17 06:49:44.723523+00', '20250617064944_add_aprovado_to_user', NULL, NULL, '2025-06-17 06:49:44.718815+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('7c455a47-6171-44dc-b6ba-e1be9ff0dc22', 'eea2965385966847893e2f1d61d7173213840698ce8fd486238812cbf66bbcb6', '2025-06-17 14:19:28.802451+00', '20250617141928_unidades', NULL, NULL, '2025-06-17 14:19:28.799349+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('2243245a-6be3-4968-8be3-7dd257405dbc', '5c3f093c8c70639ef6627f2a4735be400a6f404d09bb3077e26f10dfffc63b98', '2025-06-17 07:25:57.955316+00', '20250617072557_add_renda_to_empreendimento', NULL, NULL, '2025-06-17 07:25:57.951601+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('128a9b69-e7ca-4ac2-8ba6-11b3eab533fc', 'dbf9f156e76d0d57aff92a6a3f60f80283cd9bfb6cf45fdab79952b410019002', '2025-06-17 07:35:05.142564+00', '20250617073505_add_tabela_link_to_empreendimento', NULL, NULL, '2025-06-17 07:35:05.137887+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('149d3754-90de-42a4-bde7-33d39acde102', '78c30067ffb53cc6220f77da2a85a2c7de575b1737449dcab4c05657dc57b4d2', '2025-06-17 07:55:40.35168+00', '20250617075540_add_cv_and_book_to_empreendimento', NULL, NULL, '2025-06-17 07:55:40.348093+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('039351fa-8f6b-4047-948a-aa28a757bb0b', '3726b635607d576d0ab0c5a932e6b4c350a7ce08b4a7dd11b29103fa101673be', '2025-06-17 14:21:18.911444+00', '20250617142118_unidades_optional', NULL, NULL, '2025-06-17 14:21:18.908957+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('f7373865-e0a1-4e15-b346-709ddbd49672', '29afd728e66532433fb7fd7152c75664af06a3c171c6e996ec119d353fe5b9ea', '2025-06-17 08:04:43.940752+00', '20250617080443_add_book_field', NULL, NULL, '2025-06-17 08:04:43.936619+00', 1);
INSERT INTO public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) VALUES ('1016ee04-07c9-48f6-95a1-be02e5c26ef9', '0432e36c49660796c67943b6d929daa5997b881c04822239feeaa2ad09e47d16', '2025-06-17 08:15:17.778133+00', '20250617081517_add_book_original_name', NULL, NULL, '2025-06-17 08:15:17.77402+00', 1);


--
-- PostgreSQL database dump complete
--

