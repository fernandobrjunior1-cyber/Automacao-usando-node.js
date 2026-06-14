const puppeteer = require('puppeteer');
const path = require('path');

async function cadastrarProduto() {

    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './perfil'
    });

    const pagina = await navegador.newPage();

    // Acessa diretamente a página de cadastro
    await pagina.goto(
        'http://localhost:3000/products/create',
        {
            waitUntil: 'networkidle2'
        }
    );

    // Espera o formulário carregar
    await pagina.waitForSelector('input[name="name"]');

    // Preenche o nome do produto
    await pagina.type(
        'input[name="name"]',
        'Fonte 500W real',
        { delay: 50 }
    );

    // Preenche o preço
    await pagina.type(
        'input[name="price"]',
        '199.90',
        { delay: 50 }
    );

    // Caminho da imagem
    const caminhoImagem = path.join(
        __dirname,
        'imagens',
        'Fonte.jpg'
    );

    // Seleciona o campo de upload
    const upload = await pagina.$('input[type="file"]');

    // Envia a imagem
    await upload.uploadFile(caminhoImagem);

   // Clica em salvar
// Clica em salvar
await Promise.all([
    pagina.waitForNavigation({
        waitUntil: 'networkidle2'
    }),
    pagina.click('button[type="submit"]')
]);

console.log('Página atual:', pagina.url());

// Espera um pouco a renderização do HTML
await new Promise(resolve => setTimeout(resolve, 1000));

// Captura a tela após o redirecionamento
await pagina.screenshot({
    path: 'apos-cadastro.png',
    fullPage: true
});

// Verifica se existe a mensagem
const mensagemSucesso = await pagina.$('.success');

if (mensagemSucesso) {
    const texto = await pagina.$eval(
        '.success',
        el => el.innerText
    );

    console.log('✅ Mensagem encontrada:', texto);
} else {
    console.log('⚠️ Mensagem de sucesso não encontrada.');
}

// Tira um print da tela
await pagina.screenshot({
    path: 'resultado-cadastro.png'
});

    console.log('🤖 Produto cadastrado com sucesso!');

    // Aguarda 5 segundos para visualizar
    await new Promise(resolve => setTimeout(resolve, 5000));

    await navegador.close();
}

cadastrarProduto();