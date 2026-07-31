# 🏡 Condomínio Jardim das Gerais — Guia Completo

## 📁 Estrutura de Pastas

Aqui está a estrutura de arquivos e pastas do seu projeto. É importante manter tudo organizado desta forma:

```text
jardim-das-gerais/
├── index.html          # A página principal do seu site
├── style.css           # O arquivo que cuida da aparência (cores, tamanhos, etc.)
├── script.js           # O arquivo que faz o site funcionar (animações, enviar dados)
├── supabase-setup.sql  # O código para configurar o banco de dados (que você usará no Passo 2)
├── README.md           # Este manual de instruções que você está lendo agora
└── assets/             # Pasta principal de arquivos visuais
    ├── images/         # Pasta onde você vai colocar as fotos (foto1.jpg, foto2.jpg...)
    └── videos/         # Pasta onde você vai colocar o vídeo (video.mp4)
```

## 🖼️ PASSO 1: Como Colocar suas Imagens e Vídeos

### Imagens (Fotos do empreendimento)
1. Navegue pelo Windows Explorer (pasta amarela do Windows) até a pasta do seu projeto.
2. Abra a pasta `assets` e depois abra a pasta `images`.
3. É **exatamente aí** (`assets/images/`) que você vai colar as suas fotos.
4. Você **precisa** renomear as suas fotos exatamente para os seguintes nomes, tudo em letras minúsculas:
   - `foto1.jpg`
   - `foto2.jpg`
   - `foto3.jpg`
   - `foto4.jpg`
   - `foto5.jpg`
   - `foto6.jpg`
5. **Dicas para imagens:**
   - Dimensões recomendadas: 800x600 pixels ou 1200x800 pixels (para não pesar o site).
   - Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`.

### Vídeo
1. Vá novamente na pasta `assets`, mas agora abra a pasta `videos`.
2. É **exatamente aí** (`assets/videos/`) que você vai colar o vídeo.
3. Você **precisa** renomear o seu arquivo de vídeo para `video.mp4`, em letras minúsculas.
4. **Dicas para o vídeo:**
   - Formato recomendado: MP4.
   - Tamanho máximo recomendado: 50MB (para que o site carregue rápido no celular dos clientes).
   - *Se você tiver o vídeo apenas no YouTube:* Não tem problema! Será necessário trocar a tag de `<video>` no código `index.html` pelo código de "incorporar" fornecido pelo YouTube.

## 🔧 PASSO 2: Configurar o Supabase (Banco de Dados)

O Supabase é o sistema onde os dados (nome, telefone, email) das pessoas interessadas ficarão guardados. Siga o passo a passo com atenção:

1. Acesse o site https://supabase.com e clique no botão **Start your project**.
2. Crie sua conta usando seu GitHub ou E-mail.
3. Clique no botão verde **New Project** (Novo Projeto).
4. Escolha um nome para o seu projeto (exemplo: `jardim-das-gerais`).
5. Crie uma senha de banco de dados e **GUARDE-A EM LOCAL SEGURO** (você pode precisar dela no futuro).
6. Na opção "Region", escolha **South America (São Paulo)** para que seu banco fique mais rápido para brasileiros.
7. Clique no botão **Create new project** e espere. Demora cerca de 2 minutinhos para carregar.
8. Assim que a tela principal abrir, olhe na barra preta do lado esquerdo e procure pelo **SQL Editor** (o ícone se parece com uma telinha preta de terminal/computador). Clique nele.
9. Clique no botão azul **New Query**.
10. Agora, abra o arquivo `supabase-setup.sql` que está na pasta do seu projeto no computador.
11. Selecione e copie **TODO O TEXTO** que está lá dentro.
12. Cole esse texto na tela em branco do "SQL Editor" do Supabase.
13. Clique em **RUN** (o botão verde ou de "play").
14. Na parte de baixo, vai aparecer uma mensagem como "Success. No rows returned". Isso significa que **deu tudo certo!** O banco de dados foi montado.
15. Para confirmar, vá em **Table Editor** (ícone de uma tabela na barra à esquerda). Você verá a tabela `leads` listada lá.

## 🔑 PASSO 3: Conectar a Página ao Supabase

Agora você precisa conectar o seu site ao banco de dados que acabou de criar:

1. No painel do Supabase, clique no ícone de engrenagem ⚙️ **Project Settings** (Configurações do Projeto), localizado na parte inferior esquerda.
2. No menu à esquerda, clique em **API**.
3. Na tela principal, você verá dois códigos muito importantes:
   - **Project URL** — um link (ex: `https://algumacoisa.supabase.co`).
   - **anon public key** — um texto BEM longo, que começa com `eyJ...`.
4. Abra o arquivo `script.js` (que está na sua pasta do projeto) usando o Bloco de Notas ou qualquer editor de código como o VS Code.
5. Bem lá no topo, você encontrará estas duas linhas:
   ```javascript
   const SUPABASE_URL = 'SUA_URL_AQUI';
   const SUPABASE_ANON_KEY = 'SUA_CHAVE_AQUI';
   ```
6. Apague apenas a palavra `SUA_URL_AQUI` e cole lá o seu link **Project URL**. IMPORTANTE: Não apague as aspas (`'`)!
7. Apague apenas a palavra `SUA_CHAVE_AQUI` e cole o seu código gigante **anon public key**. IMPORTANTE: Novamente, não apague as aspas!
8. Salve o arquivo.

**Veja o exemplo de como vai ficar:**
```javascript
const SUPABASE_URL = 'https://abcdefghij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## 🌐 PASSO 4: Testar a Página

1. No seu computador, clique duas vezes no arquivo `index.html` para abri-lo no seu navegador de internet (Chrome, Edge, etc.).
2. Vá até o formulário e preencha com dados de teste.
3. Clique no botão **ENVIAR MEUS DADOS**.
4. Volte para a página do Supabase na internet, vá no menu **Table Editor** e clique na tabela `leads`.
5. Pronto! Você deverá ver os dados de teste que você acabou de enviar listados na tabela.

## 🚀 PASSO 5: Publicar a Página Online (Grátis)

Para que as outras pessoas consigam acessar seu site por um link, você precisa publicá-lo. Aqui vão três opções 100% grátis:

### Opção A: Netlify (Mais Fácil e Rápida)
1. Acesse o site https://app.netlify.com.
2. Crie uma conta.
3. Na tela principal, simplesmente arraste toda a sua pasta `jardim-das-gerais` do seu computador e solte dentro do espaço indicado.
4. O Netlify fará tudo sozinho! Ele vai gerar um link como: `https://nome-aleatorio.netlify.app`.
5. Posteriormente, nas configurações, você pode alterar esse nome e até colocar um domínio próprio (como `.com.br`).

### Opção B: Vercel
1. Acesse https://vercel.com.
2. Crie uma conta.
3. Importe através da pasta do seu computador ou via GitHub.
4. Clique em Deploy.

### Opção C: GitHub Pages (Grátis, requer um pouco mais de conhecimento técnico)
1. Crie uma conta no GitHub.
2. Crie um novo repositório ("New repository").
3. Faça o upload de todos os seus arquivos.
4. Vá em Settings (Configurações), procure por Pages no menu esquerdo e ative o GitHub Pages escolhendo o ramo `main`.

## ⚠️ Dicas Importantes

- **NUNCA** compartilhe senhas completas do Supabase. Porém, a `anon public key` pode ficar no arquivo `script.js` tranquilamente, ela foi feita para uso público.
- Teste sempre o formulário você mesmo antes de rodar qualquer anúncio (Google Ads, Facebook Ads, etc.).
- Verifique com frequência o painel do Supabase para conferir os contatos e clientes novos.
- O Supabase permite que você baixe a lista de leads. Dentro do Table Editor, existe um botão de exportar (Export CSV), ótimo para você mandar para a sua equipe de vendas ou enviar para planilhas e e-mail.

## 🆘 Problemas Comuns

- **O formulário não envia:** Reveja o Passo 3. Verifique se copiou corretamente as chaves no `script.js` e não apagou acidentalmente as aspas simples.
- **O vídeo não aparece no site:** Verifique se o arquivo do vídeo está dentro da pasta certa (`assets/videos/`) e se o nome do arquivo está escrito exatamente `video.mp4` em minúsculas (sem espaços).
- **As imagens estão quebradas (não aparecem):** Confira os nomes exatos (`foto1.jpg`, `foto2.jpg`, etc.) dentro de `assets/images/`. Uma letra errada (ex: `Foto1.jpg`) faz com que a imagem não funcione.
- **Erro técnico ao clicar no botão Enviar:** Aperte a tecla **F12** no seu navegador (com a página aberta), clique na aba "Console" e veja as mensagens em vermelho. Aquilo dirá exatamente o motivo de estar falhando (normalmente é erro de link do Supabase ou falta de internet).
