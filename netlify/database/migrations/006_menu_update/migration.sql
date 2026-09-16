-- Të Abija — 006
-- The menu as the kitchen dictated it on 16 Sep: new prices, several renames,
-- nine dishes and drinks added, eleven taken off.
--
-- Nothing is deleted. order_items references menu_items(id) and the database
-- would refuse the delete on any dish ever ordered, test orders included. So
-- items leave the menu by going unlisted: gone from the customer's phone, still
-- intact behind every past order. Flipping `listed` back to TRUE puts one
-- straight back, which is also the undo for anything below.

ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS listed BOOLEAN NOT NULL DEFAULT TRUE;

-- ---------------------------------------------------------------- off the menu
UPDATE menu_items SET listed = FALSE WHERE name_mk IN (
  'Сарма',
  'Бурек со месо',
  'Пита со спанаќ',
  'Кисело млеко',
  'Леб',
  'Ајран',
  'Плескавица',
  'Швепс Тоник 0.25 Л',
  'Пепси Зеро 0.33 Л',
  'Вода 0.33 Л',
  'Кисела вода 0.25 Л'
);

-- ------------------------------------------------------------- renames + price
-- Keyed on the old Macedonian name, so this runs once and only once.

UPDATE menu_items SET
  name_sq = 'Tavë me fasule + 5 qebapa',
  name_mk = 'Тавче гравче + 5 ќебапи',
  price   = 250,
  desc_sq = 'Fasule të bardha të pjekura ngadalë në tavë balte, me spec të kuq dhe mendër. Me sallatë.',
  desc_mk = 'Бел грав печен полека во глинено ѓувче, со црвен пипер и сушена мента. Со салата.'
WHERE name_mk = 'Тавче гравче';

UPDATE menu_items SET
  name_sq = 'Gullash me pire + sallatë',
  name_mk = 'Гулаш со пире + салата',
  price   = 280,
  desc_sq = 'Mish viçi i zier ngadalë në salcë me piper të kuq, mbi pire patatesh. Me sallatë.',
  desc_mk = 'Телешко месо полека варено во сос од црвен пипер, со пире од компири. Со салата.'
WHERE name_mk = 'Гулаш со пире';

UPDATE menu_items SET
  name_sq = 'Turli tava perimesh',
  price   = 280,
  desc_sq = 'Perime të sezonit të pjekura në furrë me vaj ulliri dhe majdanoz. Me sallatë.',
  desc_mk = 'Сезонски зеленчук печен во рерна со маслиново масло и магдонос. Со салата.'
WHERE name_mk = 'Ѓувеч';

UPDATE menu_items SET
  price   = 280,
  desc_sq = 'Shtresa patatesh dhe mish i grirë, të pjekura në furrë me krem veze. Me sallatë.',
  desc_mk = 'Слоеви од компири и мелено месо, печени во рерна со прелив од јајца. Со салата.'
WHERE name_mk = 'Мусака';

UPDATE menu_items SET
  price   = 280,
  desc_sq = 'Qofte mishi në salcë domatesh me hudhër dhe majdanoz. Me sallatë.',
  desc_mk = 'Ќофтиња во сос од домати со лук и магдонос. Со салата.'
WHERE name_mk = 'Ќофтиња во сос';

UPDATE menu_items SET price = 220 WHERE name_mk = 'Ќебапи, 10 парчиња';
UPDATE menu_items SET price = 220 WHERE name_mk = 'Колбаси на скара';
UPDATE menu_items SET price = 120 WHERE name_mk = 'Шопска салата';

UPDATE menu_items SET price = 60 WHERE name_mk IN (
  'Кока-Кола 0.25 Л', 'Кока-Кола Зеро 0.25 Л', 'Фанта Портокал 0.25 Л',
  'Спрајт 0.25 Л', 'Пепси 0.33 Л', '7UP 0.33 Л', 'Миринда Портокал 0.33 Л',
  'Браво Портокал 0.25 Л', 'Браво Јаболко 0.25 Л', 'Браво Праска 0.25 Л',
  'Браво Мултивитамин 0.25 Л', 'Браво Вишна 0.25 Л'
);

UPDATE menu_items SET price = 40 WHERE name_mk = 'Вода 0.50 Л';

-- ------------------------------------------------------------------ new dishes
INSERT INTO menu_items (name_sq, name_mk, category, price, desc_sq, desc_mk, sort_order) VALUES
  ('Speca të mbushura', 'Полни пиперки', 'main', 280,
   'Speca të mbushur me mish dhe oriz, pjekur në furrë. Me sallatë.',
   'Пиперки полнети со месо и ориз, печени во рерна. Со салата.', 12),
  ('Patëllxhan i zi', 'Модар патлиџан', 'main', 300,
   'Patëllxhan i pjekur në furrë. Me sallatë.',
   'Модар патлиџан печен во рерна. Со салата.', 14),
  ('Stek me oriz', 'Стек со ориз', 'main', 200,
   'Stek me oriz. Me sallatë.',
   'Стек со ориз. Со салата.', 15);

INSERT INTO menu_items (name_sq, name_mk, category, price, sort_order) VALUES
  ('Hamburger me pleskavicë', 'Хамбургер со плескавица', 'grill', 160, 23),
  ('Hamburger me stek',       'Хамбургер со стек',        'grill', 160, 24),
  ('Hamburger me batak',      'Хамбургер со батак',       'grill', 160, 25);

INSERT INTO menu_items (name_sq, name_mk, category, price, is_veg, sort_order) VALUES
  ('Pepsi 1.5 L',           'Пепси 1.5 Л',             'soda',  80, TRUE, 57),
  ('Mirinda Orange 1.5 L',  'Миринда Портокал 1.5 Л',  'soda',  80, TRUE, 60),
  ('Ujë i thjeshtë 1.50 L', 'Вода 1.50 Л',             'water', 70, TRUE, 72);
