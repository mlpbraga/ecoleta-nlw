# Ecoleta
App desenvolvido durante a participação na Next Level Week do Rocket Seat.

### Organização
- server/ : diretório com o código da API REST que servirá a aplicação
- web/ : diretório com o código da página web de frontend da aplicação, criado com o comando `npx create-react-app web --template=typescript`
- mobile/ : diretório com o código do app-expo

#### Server
Comandos úteis na pasta server:

- dev - executa a API com as configurações de desenvolvimento
- prod - executa a API com as configurações de produção
- db:migrate - executa as migrações de tabelas do banco
- db:rollback - faz o rollback das migrações executadas
- db:seed - popula o banco de dados com alguns testes
- env:dev - configura a URL do servidor local onde a API irá rodar em Linux
- env:dev-mac - configura a URL do servidor local onde a API irá rodar em um Mac
