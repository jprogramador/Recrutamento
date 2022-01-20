FROM maven:3.3-jdk-8 as builder

WORKDIR /usr/src/app
COPY . .
RUN mvn clean install

FROM anapsix/alpine-java

COPY --from=builder /usr/src/app/target/*.jar /home/server.jar

CMD java -jar /home/server.jar
