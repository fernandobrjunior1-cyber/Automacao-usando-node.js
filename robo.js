const puppeteer = require('puppeteer');

async function iniciarRobo() {

    // Abre o navegador
    const navegador = await puppeteer.launch({
        headless: false,
        userDataDir: './perfil'
    });

    // Abre uma nova aba
    const pagina = await navegador.newPage();

    // Entra no seu sistema
    await pagina.goto('http://localhost:3000');

    // Espera o botão Login aparecer e clica
    await pagina.waitForSelector('a[href="/login"]');
    await pagina.click('a[href="/login"]');

    // Espera o formulário de login carregar
    await pagina.waitForSelector('input[name="email"]');

    // Digita o e-mail
    await pagina.type(
        'input[name="email"]',
        'aline@hotmail.com',
        { delay: 100 }
    );

    // Digita a senha
    await pagina.type(
        'input[name="password"]',
        '123',
        { delay: 100 }
    );

    // Clica no botão Entrar
    await pagina.click('button[type="submit"]');

    // Aguarda um momento para a página carregar
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Tira uma foto da tela
    await pagina.screenshot({
        path: 'login-realizado.png'
    });

    console.log('Login realizado com sucesso!');

}

iniciarRobo();