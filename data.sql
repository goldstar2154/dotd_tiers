DELETE FROM web.raids;
INSERT INTO web.raids(name, type, size, modifier, campaign, AP, OS, MS) VALUES
  ('Deadly Vas''ok',   'deadly', 'gigantic', 'Deadly , Dragon , Shadow Elf , Magical Creature , Underground', '', '6,25t', '5t', '1q')
, ('Deadly Drakontos', 'deadly', 'gigantic', 'Deadly , Aquatic , Dragon , Terror',                            '', '5t',    '5t', '1q')
;
/*
1k = 000
1m = 000000
1b = 000000000
1t = 000000000000
1q = 000000000000000
*/
DELETE FROM web.tiers;
INSERT INTO web.tiers(name, difficulty, damage, common, uncommon, rare, epic, legendary, stats) VALUES
  ('Deadly Vas''ok', 'nightmare', '1000000000000',    '', '', '', '', '', '46000')
, ('Deadly Vas''ok', 'nightmare', '5000000000000',    '', '', '', '', '', '230130')
, ('Deadly Vas''ok', 'nightmare', '15000000000000',   '', '', '', '', '', '243964')
, ('Deadly Vas''ok', 'nightmare', '20000000000000',   '', '', '', '', '', '325280')
, ('Deadly Vas''ok', 'nightmare', '30000000000000',   '', '', '', '', '', '334977')
, ('Deadly Vas''ok', 'nightmare', '40000000000000',   '', '', '', '', '', '345977')
, ('Deadly Vas''ok', 'nightmare', '50000000000000',   '', '', '', '', '', '355076')
, ('Deadly Vas''ok', 'nightmare', '100000000000000',  '', '', '', '', '', '523838')
, ('Deadly Vas''ok', 'nightmare', '200000000000000',  '', '', '', '', '', '738284')
, ('Deadly Vas''ok', 'nightmare', '300000000000000',  '', '', '', '', '', '808847')
, ('Deadly Vas''ok', 'nightmare', '400000000000000',  '', '', '', '', '', '973477')
, ('Deadly Vas''ok', 'nightmare', '500000000000000',  '', '', '', '', '', '1018541')
, ('Deadly Vas''ok', 'nightmare', '600000000000000',  '', '', '', '', '', '1222249')
, ('Deadly Vas''ok', 'nightmare', '1000000000000000', '', '', '', '', '', '2037079')

, ('Deadly Drakontos', 'nightmare', '1000000000000',   '', '', '', '', '', '46000')
, ('Deadly Drakontos', 'nightmare', '5000000000000',   '', '', '', '', '', '240000')
, ('Deadly Drakontos', 'nightmare', '10000000000000',  '', '', '', '', '', '309335')
, ('Deadly Drakontos', 'nightmare', '20000000000000',  '', '', '', '', '', '325280')
, ('Deadly Drakontos', 'nightmare', '30000000000000',  '', '', '', '', '', '333756')
, ('Deadly Drakontos', 'nightmare', '40000000000000',  '', '', '', '', '', '345977')
, ('Deadly Drakontos', 'nightmare', '50000000000000',  '', '', '', '', '', '355076')
, ('Deadly Drakontos', 'nightmare', '100000000000000', '', '', '', '', '', '523838')
, ('Deadly Drakontos', 'nightmare', '150000000000000', '', '', '', '', '', '711242')
, ('Deadly Drakontos', 'nightmare', '200000000000000', '', '', '', '', '', '738284')
, ('Deadly Drakontos', 'nightmare', '300000000000000', '', '', '', '', '', '808848')
, ('Deadly Drakontos', 'nightmare', '400000000000000', '', '', '', '', '', '973477')
, ('Deadly Drakontos', 'nightmare', '600000000000000', '', '', '', '', '', '1222249')
;