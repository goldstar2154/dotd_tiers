DROP FUNCTION web.tiers_v1(TEXT);

CREATE FUNCTION web.tiers_v1
(
  IN _name TEXT
)
RETURNS TEXT
AS $$
DECLARE
  _userid   INTEGER;
  _language INTEGER;
BEGIN
    RETURN (json_build_object('raids', 
        (SELECT array_to_json(
            array_agg(
                json_build_object(
                    'name',     s.name,
                    'type',     s.type,
                    'size',     s.size,
                    'modifier', s.modifier,
                    'campaign', s.campaign,
                    'AP',       s.AP,
                    'OS',       s.OS,
                    'MS',       s.MS,
                    'tiers', (
                        SELECT array_to_json(
                            array_agg(
                                json_build_object(
                                    'difficulty', t.difficulty,
                                    'damage',     t.damage,
                                    'c',          t.common,
                                    'u',          t.uncommon,
                                    'r',          t.rare,
                                    'e',          t.epic,
                                    'l',          t.legendary,
                                    'stats',      t.stats
                                )
                            )
                        )
                        FROM web.tiers t WHERE s.name = t.name
                        )
                    )
                )
            )
            FROM web.raids s
            WHERE s.name = _name
            )));
END;
$$ LANGUAGE plpgsql;