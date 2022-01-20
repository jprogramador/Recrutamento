Sistema de Recrutamento Backend
O backend do sistema foi desenvolvido em Java 8 com Spring Boot. Foi utilizado Repository pattern em sua forma mais simples para um projeto pequeno e r�pido.
Foi utilizado o plugin lombok para agilizar a cria��o de getters e setters dos models, o banco escolhido foi o H2 Database pela sua simplicidade de uso sem necessitar instalar um SGBD apenas para valida��o deste c�digo.
Para gera��o de arquivo JAR execut�vel por linha de comando, ser� necess�rio o Maven instalado e corretamente configurado, al�m do JDK 1.8.
Com os requisitos acima, basta executar no terminal �mvn clean package�, ser� gerado um arquivo JAR no diret�rio target, para execut�-lo, basta o comando �java -jar caminho_completo_do_jar�.
Caso rode usando a op��o acima, efetue uma c�pia do diret�rio Data para o diret�rio target, caso contr�rio ser� criado um banco novo sem a estrutura necess�ria.
Tamb�m foram criados os scripts para execu��o da aplica��o utilizando o Docker e Docker compose, havendo o Docker e Docker compose devidamente instalados e configurados, basta executar o comando �docker-compose up -d�.
Uma observa��o para o arquivo Docker-compose.yml, ele est� configurado para rodar no Linux usando o banco dispon�vel no diret�rio, para utiliza��o no Windows, dever� ser alterado o caminho do volume.
Ap�s a execu��o ser� poss�vel exibir e testar todos os Endpoints do backend atrav�s do Swagger em http://IPDOSERVIDOR:8080/swagger-ui/index.html#/