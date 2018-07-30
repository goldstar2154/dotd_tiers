DROP TABLE IF EXISTS web.raids;
CREATE TABLE web.raids
(
    name        TEXT    NOT NULL
  , type        TEXT    NOT NULL
  , size        TEXT    NOT NULL
  , modifier    TEXT    NOT NULL
  , campaign    TEXT    NOT NULL
  , AP          TEXT    NOT NULL
  , OS          TEXT    NOT NULL
  , MS          TEXT    NOT NULL
  , UNIQUE(name)
);

DROP INDEX IF EXISTS web.raids_1;
CREATE INDEX raids_1 ON web.raids(name);
DROP INDEX IF EXISTS web.raids_2;
CREATE INDEX raids_2 ON web.raids(campaign);
/**************************************************************************/
DROP TABLE IF EXISTS web.tiers;
CREATE TABLE web.tiers
(
    name        TEXT    NOT NULL
  , difficulty  TEXT    NOT NULL
  , damage      TEXT    NOT NULL
  , common      TEXT    NOT NULL
  , uncommon    TEXT    NOT NULL
  , rare        TEXT    NOT NULL
  , epic        TEXT    NOT NULL
  , legendary   TEXT    NOT NULL
  , stats       TEXT    NOT NULL
);

DROP INDEX IF EXISTS web.tiers_1;
CREATE INDEX tiers_1 ON web.tiers(name);
/**************************************************************************/