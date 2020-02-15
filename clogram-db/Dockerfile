FROM mysql:5.7
EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE clogram

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]