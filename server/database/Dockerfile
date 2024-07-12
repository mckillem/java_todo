FROM postgres:15.1-alpine
LABEL authors="matejmusil"
ADD 01_create.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*
#ENTRYPOINT ["top", "-b"]