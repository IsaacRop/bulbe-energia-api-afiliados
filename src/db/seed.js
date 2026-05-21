// src/db/seed.js
// Execute com: node src/db/seed.js
 
const Database = require('better-sqlite3');
const path = require('path');
 
const db = new Database(path.resolve(__dirname, '../../bulbe.db'));
 
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
 
// ─── Garante que as tabelas existem (idempotente) ────────────────────────────
// O schema abaixo é o mesmo definido em src/db/conexão.js
db.exec(`
  CREATE TABLE IF NOT EXISTS afiliados (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT    NOT NULL UNIQUE,
    url   TEXT
  );
 
  CREATE TABLE IF NOT EXISTS categorias (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT    NOT NULL UNIQUE
  );
 
  CREATE TABLE IF NOT EXISTS produtos (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    nome          TEXT    NOT NULL,
    descricao     TEXT,
    preco         REAL    NOT NULL,
    imagem        TEXT,
    afiliado_id   INTEGER NOT NULL REFERENCES afiliados(id),
    categoria_id  INTEGER REFERENCES categorias(id)
  );
`);
 
// ─── Seed ─────────────────────────────────────────────────────────────────────
 
const seedAll = db.transaction(() => {
 
  // ── 1. Afiliados ──────────────────────────────────────────────────────────
  // Dados idênticos ao afiliados.json do frontend.
  // O campo "url" usa os campos "logo" e "site" originais separados por "|"
  // para manter compatibilidade com a tabela simples da conexão.js.
  // Caso queira colunas separadas, basta ajustar o CREATE TABLE acima.
 
  const afiliados = [
    { nome: 'Amazon',       url: 'https://www.amazon.com.br'        },
    { nome: 'Araujo',       url: 'https://www.araujo.com.br'        },
    { nome: 'Leroy Merlin', url: 'https://www.leroymerlin.com.br'   },
    { nome: 'Ponto Frio',   url: 'https://www.pontofrio.com.br'     },
    { nome: 'Positivo',     url: 'https://www.meupositivo.com.br'   },
  ];
 
  const insertAfiliado = db.prepare(`
    INSERT INTO afiliados (nome, url)
    VALUES (@nome, @url)
    ON CONFLICT(nome) DO UPDATE SET url = excluded.url
  `);
 
  for (const a of afiliados) insertAfiliado.run(a);
 
  // Helper: retorna id pelo nome
  const afiliadoId = (nome) =>
    db.prepare('SELECT id FROM afiliados WHERE nome = ?').get(nome).id;
 
  // ── 2. Categorias ─────────────────────────────────────────────────────────
  // Extraídas diretamente dos dados do produtos.json do frontend.
 
  const categorias = [
    'Energia Solar',
    'Casa Inteligente',
    'Esporte e Lazer',
    'Eletrônicos',
    'Eletrodomésticos',
    'Saúde',
    'Informática',
  ];
 
  const insertCategoria = db.prepare(`
    INSERT INTO categorias (nome)
    VALUES (?)
    ON CONFLICT(nome) DO NOTHING
  `);
 
  for (const c of categorias) insertCategoria.run(c);
 
  // Helper: retorna id pelo nome
  const catId = (nome) =>
    db.prepare('SELECT id FROM categorias WHERE nome = ?').get(nome).id;
 
  // ── 3. Produtos ───────────────────────────────────────────────────────────
  // Dados reais do src/data/produtos.json do frontend.
  // Campo "imagem" usa o mesmo valor do campo "imagem" original (nome do arquivo).
  // O frontend já serve as imagens localmente — aqui mantemos apenas o nome.
 
  const insertProduto = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco, imagem, afiliado_id, categoria_id)
    VALUES (@nome, @descricao, @preco, @imagem, @afiliado_id, @categoria_id)
    ON CONFLICT DO NOTHING
  `);
 
  const produtos = [
 
    // ── Amazon ──────────────────────────────────────────────────────────────
    {
      nome: 'Carregador e Painel Solar 21W ALLPOWERS',
      descricao: 'Painel solar inteligente altamente eficiente com 2 saídas de carregamento para dispositivos.',
      preco: 280.16,
      imagem: 'carregador-painel.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Energia Solar'),
    },
    {
      nome: 'Carregador Solar Portátil 10000mAh',
      descricao: 'Powerbank ecológico com painel solar integrado e duas saídas USB.',
      preco: 99.00,
      imagem: 'carregador-solar-portatil.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Energia Solar'),
    },
    {
      nome: 'Luminária Solar de Parede com Sensor',
      descricao: 'Luminária solar automática com sensor de presença e bateria de longa duração.',
      preco: 36.90,
      imagem: 'luminaria-sensor.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Garrafa Térmica Inteligente com Display Digital',
      descricao: 'Exibe a temperatura da bebida e mantém líquidos frios ou quentes por até 12h.',
      preco: 454.26,
      imagem: 'garrafa-inteligente.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Esporte e Lazer'),
    },
    {
      nome: 'Fone Bluetooth soundcore',
      descricao: 'Fone de ouvido com 60h de autonomia e almofadas removíveis.',
      preco: 233.39,
      imagem: 'fone.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Eletrônicos'),
    },
    {
      nome: 'Purificador de Água com Economia de Energia',
      descricao: 'Sistema de purificação eficiente que reduz o consumo de energia e desperdício.',
      preco: 548.91,
      imagem: 'purificador.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Echo Dot (Geração mais recente)',
      descricao: 'O Echo Dot com o melhor som já lançado.',
      preco: 398.99,
      imagem: 'echo-dot.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Eletrônicos'),
    },
    {
      nome: 'Rádio meteorológico de Emergência',
      descricao: 'Rádio solar com carregador de manivela, lanterna e receptor AM/FM/NOAA.',
      preco: 189.90,
      imagem: 'radio-solar-eoxsmile.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Energia Solar'),
    },
    {
      nome: 'Compressor de ar portátil recarregável',
      descricao: 'Compressor digital sem fio com display de pressão e bateria integrada.',
      preco: 149.00,
      imagem: 'compressor_de_ar.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Eletrônicos'),
    },
    {
      nome: 'Carregador Portátil Universal por Indução',
      descricao: 'Powerbank com carregamento wireless, saída USB-C e USB-A.',
      preco: 219.00,
      imagem: 'carregador-portatil.jpg',
      afiliado_id: afiliadoId('Amazon'),
      categoria_id: catId('Eletrônicos'),
    },
 
    // ── Leroy Merlin ────────────────────────────────────────────────────────
    {
      nome: 'Kit Energia Solar Residencial 450Wp',
      descricao: 'Kit completo com inversor, controlador de carga e painéis solares.',
      preco: 7623.79,
      imagem: 'kit-energia.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Energia Solar'),
    },
    {
      nome: 'Lixeira Inteligente com Sensor',
      descricao: 'Lixeira automática com sensor de movimento e fechamento hermético.',
      preco: 139.90,
      imagem: 'lixeira-inteligente.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Tomada Inteligente Wi-Fi',
      descricao: 'Permite controle remoto de aparelhos e monitoramento de consumo elétrico.',
      preco: 189.90,
      imagem: 'tomada-inteligente.webp',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Lâmpada LED Inteligente E27 10W Luz RGB',
      descricao: 'Lâmpada que economiza cerca de 90% da energia se comparada com lâmpadas tradicionais.',
      preco: 49.90,
      imagem: 'lampada-rgb.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Ar Condicionado Split Inverter Quente e Frio',
      descricao: '9000BTUs com Wifi 220V Midea.',
      preco: 1899.00,
      imagem: 'Ar_Condicionado.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Lava-Louças 10 Serviços Electrolux',
      descricao: 'Lava-louças com 10 serviços, 6 programas de lavagem e painel eletrônico.',
      preco: 2299.00,
      imagem: 'lava-louças.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Placa Solar Fotovoltaica',
      descricao: 'Painel monocristalino de alta eficiência para sistemas fotovoltaicos.',
      preco: 1150.00,
      imagem: 'placa-solar.jpg',
      afiliado_id: afiliadoId('Leroy Merlin'),
      categoria_id: catId('Energia Solar'),
    },
 
    // ── Araujo ───────────────────────────────────────────────────────────────
    {
      nome: 'Plugue de Tomada Inteligente Multilaser Wi-Fi',
      descricao: 'Plugue inteligente Wi-Fi com controle remoto e monitoramento de consumo de energia.',
      preco: 46.39,
      imagem: 'plugue-multilaser.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Ventilador de Mesa Mondial Super Power 40cm VSP-40B',
      descricao: 'Ventilador de mesa 40cm com 3 velocidades e grade de aço.',
      preco: 149.90,
      imagem: 'ventilador-mondial-vsp40b.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Teclado Multilaser USB Compacto TC193',
      descricao: 'Teclado USB compacto ABNT2 com teclas de atalho multimídia.',
      preco: 49.90,
      imagem: 'teclado-multilaser-tc193.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Informática'),
    },
    {
      nome: 'Fone de Ouvido Tipo-C Maketech PC-052P',
      descricao: 'Fone com entrada USB-C, microfone integrado e controle de volume no fio.',
      preco: 39.90,
      imagem: 'fone-maketech-pc052p.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Eletrônicos'),
    },
    {
      nome: 'Aparelho de Pressão Incoterm Automático Pulso MP060',
      descricao: 'Monitor de pressão arterial de pulso digital com memória para 60 medições.',
      preco: 89.90,
      imagem: 'aparelho-pressao-mp060.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Saúde'),
    },
    {
      nome: 'Carregador de Tomada Elgin',
      descricao: 'Carregador duplo USB de parede com proteção contra sobrecarga.',
      preco: 29.90,
      imagem: 'carregador-tomada.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Eletrônicos'),
    },
    {
      nome: 'Kit Monitor de Glicemia G-Tech Lite',
      descricao: 'Glicosímetro com 10 tiras reagentes e lancetas inclusas.',
      preco: 59.90,
      imagem: 'monitor-glicemia.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Saúde'),
    },
    {
      nome: 'Umidificador de Ar Multilaser',
      descricao: 'Umidificador ultrassônico com reservatório de 2L e luz noturna.',
      preco: 79.90,
      imagem: 'umidificador.jpg',
      afiliado_id: afiliadoId('Araujo'),
      categoria_id: catId('Saúde'),
    },
 
    // ── Positivo ─────────────────────────────────────────────────────────────
    {
      nome: 'Smart Plug Max Wi-Fi 16A Positivo Casa Inteligente',
      descricao: 'Tomada inteligente Wi-Fi 16A com controle por app e compatível com Alexa.',
      preco: 99.90,
      imagem: 'smart-plug-positivo.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Smart Robô Aspirador Wi-Fi Laser PRA800',
      descricao: 'Aspirador robô com mapeamento a laser, controle por app e 2h de autonomia.',
      preco: 1299.00,
      imagem: 'robo-pra800.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Smart Câmera Wi-Fi Positivo Casa Inteligente',
      descricao: 'Câmera de segurança Full HD com visão noturna e detecção de movimento.',
      preco: 199.90,
      imagem: 'smart-camera-positivo.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Smart Fechadura Wi-Fi',
      descricao: 'Fechadura digital com senha, cartão RFID e abertura pelo app.',
      preco: 599.00,
      imagem: 'smart-fechadura.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Smart Controle Universal Wi-Fi',
      descricao: 'Controle universal infravermelho que substitui até 6 controles remotos.',
      preco: 149.00,
      imagem: 'smart-controle.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
    {
      nome: 'Smart Hub e Smart Botão',
      descricao: 'Hub central para automação residencial com botão de cena programável.',
      preco: 249.00,
      imagem: 'smart-hub.jpg',
      afiliado_id: afiliadoId('Positivo'),
      categoria_id: catId('Casa Inteligente'),
    },
 
    // ── Ponto Frio ───────────────────────────────────────────────────────────
    {
      nome: 'Notebook Dell Inspiron I15 Intel Core i5 16GB 512GB',
      descricao: 'Notebook Dell com tela 15,6" Full HD, SSD 512GB e Windows 11.',
      preco: 3499.00,
      imagem: 'notebook-dell.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Informática'),
    },
    {
      nome: 'Geladeira Brastemp Frost Free Duplex 375L Inox',
      descricao: 'Geladeira duplex Frost Free com acabamento Inox e painel eletrônico.',
      preco: 3299.00,
      imagem: 'geladeira-brastemp.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Bicicleta Ergométrica Magnética Dobrável',
      descricao: 'Bicicleta ergométrica dobrável com 8 níveis de resistência e display digital.',
      preco: 899.00,
      imagem: 'bicicleta-ergometrica.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Esporte e Lazer'),
    },
    {
      nome: 'Painel Solar Dobrável 160W EcoFlow',
      descricao: 'Painel solar portátil dobrável de 160W com eficiência de 21,4%.',
      preco: 1899.00,
      imagem: 'painel-ecoflow-160w.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Energia Solar'),
    },
    {
      nome: 'Fritadeira Airfryer Oven Electrolux',
      descricao: 'Airfryer forno com 12L de capacidade, 1800W e 10 funções de cocção.',
      preco: 799.00,
      imagem: 'airfryer.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Eletrodomésticos'),
    },
    {
      nome: 'Impressora Multifuncional HP',
      descricao: 'Multifuncional jato de tinta com Wi-Fi, impressão frente e verso e scanner.',
      preco: 599.00,
      imagem: 'impressora.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Informática'),
    },
    {
      nome: 'Ar Condicionado Janela Eletrônico Wi-Fi',
      descricao: 'Ar-condicionado janela 10.000 BTUs com controle Wi-Fi e timer.',
      preco: 1499.00,
      imagem: 'ar-janela.jpg',
      afiliado_id: afiliadoId('Ponto Frio'),
      categoria_id: catId('Eletrodomésticos'),
    },
  ];
 
  for (const p of produtos) insertProduto.run(p);
 
});
 
// ─── Executar ─────────────────────────────────────────────────────────────────
 
try {
  seedAll();
 
  const totais = {
    afiliados:  db.prepare('SELECT COUNT(*) as n FROM afiliados').get().n,
    categorias: db.prepare('SELECT COUNT(*) as n FROM categorias').get().n,
    produtos:   db.prepare('SELECT COUNT(*) as n FROM produtos').get().n,
  };
 
  console.log('\n✅ Seed concluído com sucesso!');
  console.log(`   Afiliados:  ${totais.afiliados}`);
  console.log(`   Categorias: ${totais.categorias}`);
  console.log(`   Produtos:   ${totais.produtos}\n`);
} catch (err) {
  console.error('\n❌ Erro ao executar o seed:', err.message);
  process.exit(1);
} finally {
  db.close();
}