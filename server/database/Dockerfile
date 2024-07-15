FROM postgres:15.1-alpine as dumper
LABEL authors="matejmusil"
#ADD 01_create.sql /docker-entrypoint-initdb.d
#RUN chmod a+r /docker-entrypoint-initdb.d/*


COPY 01_create.sql /docker-entrypoint-initdb.d

RUN ["sed", "-i", "s/exec \"$@\"/echo \"skipping...\"/", "/usr/local/bin/docker-entrypoint.sh"]

ENV PGDATA=/data/postgres

RUN ["/usr/local/bin/docker-entrypoint.sh", "postgres"]

# final build stage
FROM postgres:11-alpine

COPY --from=dumper /data $PGDATA