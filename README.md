# Youtube2MP3

Aplicação para consumo próprio, converta vídeos diretamente do youtube para MP3 e baixe-os localmente.

## Configurações 🛠

Após baixar o projeto, vá na pasta converter_api e crie um arquivo .env com as seguinter configurações:

    YOUTUBE_MP3_API_KEY=<enter_rapid_api_key>
    YOUTUBE_MP3_API_HOST=<enter_rapid_api_host>
    YOUTUBE_MP3_API_URL=<enter_rapid_api_url>

Depois, vá na pasta converter_page e crie um arquivo .env.local com a seguinte configuração:

    NEXT_PUBLIC_API_URL=http://localhost:5000

Certifique-se que não tenha nenhuma outra aplicação rodando nas portas 3000 (front) e 5000 (api)

## Build Local

Para executar a aplicação localmente, é necessário ter o [NodeJs](https://nodejs.org/en/) instalado na máquina, após isso, navegue até a pasta da api converter_api, e rode o seguinte comando no terminal:

**Desenvolvimento**

    npm run dev

**Produção**

    npm run build
    npm start

Depois, faça o mesmo processo na pasta converter_page.

## Docker

Para rodar a aplicação pelo Docker, instale o aplicativo [Docker Desktop](https://www.docker.com/products/docker-desktop/). Após instalado, basta ir para o terminal e executar o seguinte comando:

    docker-compose up -d

## Execução

Após o build dos containeres ou local, basta navegar até [http://localhost:3000](http://localhost:3000) para acessar o front da aplicação.
Se preferir utilizar a API diretamente, basta acessar o [Postman](https://www.postman.com/), faça uma Request do tipo POST para [http://localhost:5000/convert-mp3](http://localhost:5000/convert-mp3) passando o "videoId" no corpo da requisição:

### Exemplo:

**Request Body**

    {
        "videoId": "kvgvSwws4pk"
    }

**Response Body**

    {
        "success": true,
        "song_title": "<mp3_song_title>",
        "song_link": "<mp3_download_link>"
    }

Depois, basta acessar o link para baixar o MP3.

## Agradecimentos

Quero agradecer ao **codefoxx** do canal [codefox](https://www.youtube.com/channel/UCvi0rWTSkJkrunfhXH0tYuA), eu segui o tutorial feito por ele para contruir a aplicação, você pode acessar no link [HTML, CSS, JS, Express, Node.js - YouTube 2 MP3 Converter Full Stack App for Beginners](https://www.youtube.com/watch?v=Cin11iLUkLU). Obrigado, feito com carinho! 🚀💻🎶
