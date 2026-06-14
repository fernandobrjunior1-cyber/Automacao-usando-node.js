const puppeteer = require('puppeteer');

async function listarProdutos() {

    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './perfil'
    });

    const pagina = await navegador.newPage();

    // Abre a página de produtos
    await pagina.goto(
        'http://localhost:3000/products',
        {
            waitUntil: 'networkidle2'
        }
    );

    // Espera os produtos aparecerem
    await pagina.waitForSelector('.product-card');

    // Lê todos os produtos
    const produtos = await pagina.$$eval(
        '.product-card',
        cards => {
            return cards.map(card => {

                const nome = card.querySelector('h2')
                    ?.innerText || 'Sem nome';

                const preco = card.querySelector('p')
                    ?.innerText || 'Sem preço';

                return {
                    nome,
                    preco
                };
            });
        }
    );

    console.log('📦 Produtos encontrados:', produtos.length);

    produtos.forEach((produto, index) => {
        console.log(
            `${index + 1} - ${produto.nome} | ${produto.preco}`
        );
    });

    await navegador.close();
}

listarProdutos();