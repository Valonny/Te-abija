-- Të Abija — 002
-- Opening hours used to be hard-coded in the function. They now live here so the
-- kitchen can change them (and pause ordering mid-day) without a deploy.
-- Also: dish descriptions, a vegetarian flag, photos for the items that had none,
-- and the timestamps the customer's order tracker reads.

CREATE TABLE settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- open_to is 15:00: ordering runs all the way through the afternoon.
-- closed_weekdays is a comma-separated list, Sunday = 0 … Saturday = 6.
INSERT INTO settings (key, value) VALUES
  ('open_from','08:00'),
  ('open_to','15:00'),
  ('closed_weekdays','0'),
  ('paused','0'),
  ('prep_minutes','45'),
  ('notice_sq',''),
  ('notice_mk','');

ALTER TABLE menu_items
  ADD COLUMN desc_sq TEXT,
  ADD COLUMN desc_mk TEXT,
  ADD COLUMN is_veg  BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE orders
  ADD COLUMN accepted_at TIMESTAMPTZ,
  ADD COLUMN done_at     TIMESTAMPTZ;

-- Customers look their order up by the code printed on the confirmation screen.
CREATE INDEX orders_code_idx ON orders (code, created_at DESC);

-- Photos for the drinks and sides that shipped without one.
UPDATE menu_items SET photo = 'kos'   WHERE name_mk = 'Кисело млеко';
UPDATE menu_items SET photo = 'buke'  WHERE name_mk = 'Леб';
UPDATE menu_items SET photo = 'uje'   WHERE name_mk = 'Вода 0.5Л';
UPDATE menu_items SET photo = 'cola'  WHERE name_mk = 'Кока-Кола 0.5Л';
UPDATE menu_items SET photo = 'ajran' WHERE name_mk = 'Ајран';

UPDATE menu_items SET is_veg = TRUE
  WHERE name_mk IN ('Ѓувеч','Пита со спанаќ','Шопска салата','Кисело млеко','Леб',
                    'Вода 0.5Л','Кока-Кола 0.5Л','Ајран');

UPDATE menu_items SET desc_sq = d.sq, desc_mk = d.mk FROM (VALUES  -- (name_mk, sq, mk)
  ('Тавче гравче',
   'Fasule të bardha të pjekura ngadalë në tavë balte, me spec të kuq dhe mendër.',
   'Бел грав печен полека во глинено ѓувче, со црвен пипер и сушена мента.'),
  ('Гулаш со пире',
   'Mish viçi i ziera ngadalë në salcë me piper të kuq, mbi pure patatesh.',
   'Телешко месо полека варено во сос од црвен пипер, со пире од компири.'),
  ('Мусака',
   'Shtresa patatesh dhe mish i grirë, pjekur në furrë me krem veze.',
   'Слоеви компири и мелено месо, печени во рерна со прелив од јајца.'),
  ('Ѓувеч',
   'Perime të sezonit pjekur në furrë me vaj ulliri dhe majdanoz.',
   'Сезонски зеленчук печен во рерна со маслиново масло и магдонос.'),
  ('Сарма',
   'Gjethe lakre turshi mbushur me mish dhe oriz, ziera ngadalë.',
   'Лисја кисела зелка полнети со месо и ориз, варени полека.'),
  ('Ќофтиња во сос',
   'Qofte mishi në salcë domatesh me hudhër dhe majdanoz.',
   'Ќофтиња во сос од домати со лук и магдонос.'),
  ('Ќебапи, 10 парчиња',
   'Dhjetë qebapa nga mishi i ditës, me qepë të grirë dhe bukë.',
   'Десет ќебапи од свежо мелено месо, со сецкан кромид и леб.'),
  ('Колбаси на скара',
   'Salcice pikante nga skara, me ajvar.',
   'Пикантни колбаси на скара, со ајвар.'),
  ('Плескавица',
   'Pleskavicë e madhe nga skara, me spec të pjekur.',
   'Голема плескавица од скара, со печена пиперка.'),
  ('Бурек со месо',
   'Petë të hollë me mish të grirë, pjekur në tavë të rrumbullakët.',
   'Точени кори со мелено месо, печени во тркалезна тава.'),
  ('Пита со спанаќ',
   'Petë me spinaq dhe djathë të bardhë.',
   'Кори со спанаќ и бело сирење.'),
  ('Шопска салата',
   'Domate, kastravec, spec dhe djathë i grirë.',
   'Домати, краставица, пиперка и рендано сирење.'),
  ('Кисело млеко',
   'Kos i trashë, 200 g.',
   'Густо кисело млеко, 200 г.'),
  ('Леб',
   'Bukë e ditës, dy feta.',
   'Свеж леб од денес, две парчиња.'),
  ('Вода 0.5Л',
   'Ujë burimi, shishe 0.5 L.',
   'Вода, шише 0.5 Л.'),
  ('Кока-Кола 0.5Л',
   'Shishe 0.5 L, e ftohtë.',
   'Шише 0.5 Л, изладено.'),
  ('Ајран',
   'Pije kosi e kripur, 0.33 L.',
   'Солен пијалок од кисело млеко, 0.33 Л.')
) AS d(name_mk, sq, mk)
WHERE menu_items.name_mk = d.name_mk;
