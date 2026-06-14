const puppeteer = require('puppeteer');

async function editarProduto() {

    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './perfil'
    });

    const pagina = await navegador.newPage();

    // Abre a lista de produtos
    await pagina.goto(
        'http://localhost:3000/products',
        {
            waitUntil: 'networkidle2'
        }
    );

    console.log('📦 Página de produtos aberta');

    // Espera o botão Editar
    await pagina.waitForSelector(
        'a[href*="/products/update/"]'
    );

    // Clica no primeiro Editar
    await Promise.all([
        pagina.waitForNavigation({
            waitUntil: 'networkidle2'
        }),
        pagina.click('a[href*="/products/update/"]')
    ]);

    console.log('✏️ Tela de edição aberta');

   // Limpa o campo nome
await pagina.$eval(
    'input[name="name"]',
    campo => campo.value = ''
);

// Digita o novo nome
await pagina.type(
    'input[name="name"]',
    'Produto alterado pelo robô',
    { delay: 50 }
);


// Limpa o campo preço
await pagina.$eval(
    'input[name="price"]',
    campo => campo.value = ''
);

// Digita o novo preço
await pagina.type(
    'input[name="price"]',
    '999.90',
    { delay: 50 }
);

console.log('📝 Dados alterados');

// Clica em salvar e espera o redirecionamento
await Promise.all([
    pagina.waitForNavigation({
        waitUntil: 'networkidle2'
    }),
    pagina.click('button[type="submit"]')
]);

console.log('💾 Produto salvo com sucesso!');

// Tira uma captura da tela
await pagina.screenshot({
    path: 'produto-editado.png',
    fullPage: true
});


}

editarProduto();