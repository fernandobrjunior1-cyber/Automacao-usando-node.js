const puppeteer = require('puppeteer');

async function deletarProduto() {

    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './perfil'
    });

    const pagina = await navegador.newPage();

    // Acessa a lista de produtos
    await pagina.goto(
        'http://localhost:3000/products',
        {
            waitUntil: 'networkidle2'
        }
    );

    console.log('📦 Página de produtos aberta');


    // Espera o botão Excluir aparecer
    await pagina.waitForSelector(
        'form button[type="submit"]'
    );


    // Clica no primeiro botão Excluir
    await Promise.all([
        pagina.waitForNavigation({
            waitUntil: 'networkidle2'
        }),
        pagina.click('form button[type="submit"]')
    ]);

    console.log('🗑️ Produto excluído com sucesso!');


    // Tira uma captura da tela
    await pagina.screenshot({
        path: 'produto-excluido.png',
        fullPage: true
    });


    await navegador.close();
}

deletarProduto();