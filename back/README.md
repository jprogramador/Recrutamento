Sistema de Recrutamento Backend
O backend do sistema foi desenvolvido em Java 8 com Spring Boot. Foi utilizado Repository pattern em sua forma mais simples para um projeto pequeno e rápido.
Foi utilizado o plugin lombok para agilizar a criação de getters e setters dos models, o banco escolhido foi o H2 Database pela sua simplicidade de uso sem necessitar instalar um SGBD apenas para validação deste código.
Para geração de arquivo JAR executável por linha de comando, será necessário o Maven instalado e corretamente configurado, além do JDK 1.8.
Com os requisitos acima, basta executar no terminal “mvn clean package”, será gerado um arquivo JAR no diretório target, para executá-lo, basta o comando “java -jar caminho_completo_do_jar”.
Caso rode usando a opção acima, efetue uma cópia do diretório Data para o diretório target, caso contrário será criado um banco novo sem a estrutura necessária.
Também foram criados os scripts para execução da aplicação utilizando o Docker e Docker compose, havendo o Docker e Docker compose devidamente instalados e configurados, basta executar o comando “docker-compose up -d”.
Uma observação para o arquivo Docker-compose.yml, ele está configurado para rodar no Linux usando o banco disponível no diretório, para utilização no Windows, deverá ser alterado o caminho do volume.
Após a execução será possível exibir e testar todos os Endpoints do backend através do Swagger em http://IPDOSERVIDOR:8080/swagger-ui/index.html#/