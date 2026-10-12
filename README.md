# Portfólio — Lucas Eduardo

Portfólio pessoal estático feito com HTML, CSS e JavaScript puro. Não há etapa
de build nem dependências npm.

## Estrutura

- `dist/index.html` — conteúdo e estrutura da página
- `dist/styles.css` — estilos principais e responsividade
- `dist/interactive.css` — cards, formulário, tema e interações visuais
- `dist/script.js` — conteúdo em português/inglês, projetos, stack, tema e formulário
- `dist/profile-photo.jfif` — foto do perfil

## Executar localmente

Com Python instalado, execute na raiz do repositório:

```powershell
py -m http.server 5500 --directory dist
```

Abra `http://localhost:5500` no navegador. O site também pode ser servido por
qualquer servidor de arquivos estáticos apontando para `dist`.

## Formulário de contato

O link de e-mail e o formulário abrem uma nova mensagem no Gmail endereçada a
`lucas.eduardo5855@gmail.com`. No link direto, o assunto já vem preenchido; pelo
formulário, nome, e-mail, assunto e mensagem também vêm preenchidos.

O Gmail salva essa composição como rascunho enquanto ela não é enviada — isso
é esperado. A pessoa ainda precisa revisar e clicar em **Enviar** no Gmail. O
portfólio valida os campos no navegador (obrigatoriedade, formato de e-mail e
comprimentos mínimo e máximo), mas não envia nem armazena mensagens e não possui
backend de contato.

## GitHub Pages

O workflow em `.github/workflows/pages.yml` publica o conteúdo de `dist` a cada
push para a branch `main` e também pode ser iniciado manualmente. No GitHub,
abra **Settings → Pages** e selecione **GitHub Actions** como origem. Após essa
configuração, o próximo push para `main` iniciará a publicação.

Fontes e ícones são carregados de serviços externos (Google Fonts e Devicon);
o layout e os textos continuam disponíveis se esses serviços não carregarem.
