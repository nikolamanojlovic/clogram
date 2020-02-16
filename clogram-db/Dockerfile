FROM mysql:5.7
EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE clogram

COPY init.sql /docker-entrypoint-initdb.d
COPY populate.sql /docker-entrypoint-initdb.d

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]