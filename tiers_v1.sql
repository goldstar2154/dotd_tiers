DROP FUNCTION web.tiers_v1(TEXT, TEXT);

CREATE FUNCTION web.tiers_v1
(
  IN _name TEXT
, IN _type TEXT
)
RETURNS JSON
AS $$
DECLARE
BEGIN
    RETURN (json_build_object('raids', 
        (SELECT array_to_json(
            array_agg(
                json_build_object(
                    'name',     data.name,
                    'type',     data.type,
                    'size',     data.size,
                    'modifier', data.modifier,
                    'campaign', data.campaign,
                    'ap',       (SELECT * FROM web.num_tr(data.AP, 2)),
                    'os',       (SELECT * FROM web.num_tr(data.OS, 2)),
                    'ms',       (SELECT * FROM web.num_tr(data.MS, 2)),
                    'tiers', (
                        SELECT array_to_json(
                            array_agg(
                                json_build_object(
                                    'difficulty', t.difficulty,
                                    'damage',     (SELECT * FROM web.num_tr(t.damage, 2)),
                                    'c',          t.common,
                                    'u',          t.uncommon,
                                    'r',          t.rare,
                                    'e',          t.epic,
                                    'l',          t.legendary,
                                    'stats',      (SELECT * FROM web.num_tr(t.stats, 2)),
                                    'dmgsp',      CASE t.stats WHEN '' THEN '~' ELSE round(t.damage::BIGINT / t.stats::BIGINT / 1000000., 2)::TEXT END
                                )
                            )
                        )
                        FROM web.tiers t WHERE data.name = t.name
                        )
                    )
                )
            )
            FROM ( 
            SELECT * 
            FROM web.raids s
            WHERE (lower(s.name) = lower(_name) OR _name = '' OR _name IS NULL)
              AND (lower(s.type) = lower(_type) OR _type = '' OR _type IS NULL)
            ORDER BY s.size_o, s.name) data
            )));
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;