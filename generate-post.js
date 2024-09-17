const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Formata o título para um nome de arquivo adequado, removendo caracteres especiais e substituindo espaços por underscores.
 * @param {string} title - O título a ser formatado.
 * @returns {string} O título formatado, adequado para ser usado como nome de arquivo.
 */
const formatFileName = (title) =>
  title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_');

/**
 * Adiciona um zero à esquerda se o número for menor que 10.
 * @param {number} num - O número a ser formatado.
 * @returns {string} O número formatado com dois dígitos.
 */
const padZero = (num) => num.toString().padStart(2, '0');

/**
 * Retorna a data e hora atual no formato ISO 8601 com o fuso horário local.
 * @returns {string} A data formatada no padrão ISO 8601.
 */
const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = padZero(now.getMonth() + 1);
  const day = padZero(now.getDate());
  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = "00"; // Segundos fixos

  const offsetMinutes = now.getTimezoneOffset();
  const timezoneSign = offsetMinutes > 0 ? '-' : '+';
  const offsetHours = padZero(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetMins = padZero(Math.abs(offsetMinutes) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezoneSign}${offsetHours}:${offsetMins}`;
};

/**
 * Cria o conteúdo do arquivo Markdown a partir dos dados fornecidos.
 * @param {string} title - O título do post.
 * @param {string} date - A data formatada do post.
 * @param {string} image - O caminho para a imagem do post.
 * @param {string} slug - O slug do post.
 * @returns {string} O conteúdo do arquivo Markdown.
 */
const createMarkdownContent = (title, date, image, slug) => 
  `---\ntitle: ${title}\ndate: ${date}\nlayout: post.njk\nimage: ${image}\nslug: ${slug}\n---`;

/**
 * Salva o conteúdo em um arquivo dentro do diretório './src/posts/'.
 * Cria o diretório caso não exista.
 * @param {string} filename - O nome do arquivo a ser salvo.
 * @param {string} content - O conteúdo a ser salvo no arquivo.
 */
const saveFile = (filename, content) => {
  const dir = './src/posts/';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, filename), content);
  console.log(`Arquivo criado: ${filename}`);
};

/**
 * Processa a criação de um post com base no título, imagem e slug fornecidos.
 * @param {string} title - O título do post.
 * @param {string} image - O caminho da imagem do post.
 * @param {string} slug - O slug do post.
 */
const processPost = (title, image, slug) => {
  const date = getFormattedDate();
  const filename = `${date.split('T')[0].replace(/-/g, '_')}__${formatFileName(title)}.md`;
  const content = createMarkdownContent(title, date, image, slug);
  saveFile(filename, content);
};

/**
 * Captura a entrada do usuário para o título, imagem e slug do post.
 * Utiliza o readline para interagir com o terminal.
 * @returns {Promise<void>} Uma Promise que resolve após a captura dos dados e o processamento do post.
 */
const promptUser = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  /**
   * Faz uma pergunta ao usuário e retorna a resposta como uma Promise.
   * @param {string} query - A pergunta a ser feita ao usuário.
   * @returns {Promise<string>} A resposta do usuário.
   */
  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  /**
   * Faz três perguntas (título, imagem e slug) ao usuário.
   * @returns {Promise<Object>} Um objeto contendo o título, a imagem e o slug fornecidos pelo usuário.
   */
  const askQuestions = () =>
    question('titulo: ')
      .then((title) =>
        question('imagem: ').then((image) =>
          question('slug: ').then((slug) => ({ title, image, slug }))
        )
      );

  askQuestions()
    .then(({ title, image, slug }) => processPost(title, image, slug))
    .finally(() => rl.close());
};

/**
 * Verifica os argumentos da linha de comando e inicia o processo de criação do post.
 * Caso existam argumentos, encerra o processo com um erro.
 */
const main = () => {
  if (process.argv.length > 2) {
    console.error('Erro: Este script não aceita argumentos.');
    process.exit(1);
  }
  promptUser();
};

// Executa a função principal
main();
