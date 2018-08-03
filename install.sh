sudo apt install postgresql

/* download and instll postgrest */
sudo mkdir postgrest
cd postgrest
sudo wget https://github.com/PostgREST/postgrest/releases/download/v0.5.0.0/postgrest-v0.5.0.0-ubuntu.tar.xz
sudo tar xfJ postgrest-v0.5.0.0-ubuntu.tar.xz
sudo chmod +x postgrest

/* creating DB */
sudo -u postgres psql postgres
CREATE DATABASE orcish_db;
CREATE SCHEMA web;
CREATE USER admin WITH password '80233435740';
ALTER USER admin WITH SUPERUSER;
GRANT ALL ON DATABASE orcish_db TO admin;

/* create anonymous access*/
CREATE ROLE web NOLOGIN;
GRANT web to postgres;
GRANT usage ON schema web to web;
GRANT select on web.raids to web;
GRANT select on web.tiers to web;
GRANT execute on function web.tiers_v1(TEXT, TEXT, TEXT) to web;


/* making schema */