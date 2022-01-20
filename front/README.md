**Sistema de Recrutamento Frontend**

O frontend do sistema foi desenvolvido em Angular 8 com Material.

Antes de rodar o front, é importante apontar para o servidor que está rodando o back, isso é feito no arquivo src\environments\environment.ts, altere LOCALHOST por IPDOSERVIDORBACK.

Para rodar o projeto será necessário a instalação no Node versão 12 no mínimo, e o Angular CLI versão 8 no mínimo.

Com eles instalados execute o comando “npm install”, após a instalação de todas as dependências basta executar o comando “ng serve”. Por padrão o sistema ficará disponível em http://IPDOSERVIDOR:4200.

Também foram criados os scripts para execução da aplicação utilizando o Docker e Docker composse, havendo o Docker e Docker composse devidamente instalados e configurados, basta executar o comando “docker-compose up -d”.
