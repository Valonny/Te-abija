-- Të Abija — 003
-- The real bottled-drinks list from the kitchen: 19 items, split into the three
-- groups the kitchen writes its own menu in — fizzy, still, and water. The two
-- placeholder sodas/waters are folded into it; Ajran is not on the list but
-- stays on the menu.
--
-- The single 'drink' category becomes three: 'soda', 'still' and 'water'
-- ("still" as in still vs sparkling — it holds the juices and the ajran).
-- 'drink' itself stays in the front-end category lists as a fallback so a row
-- inserted under the old key can never silently vanish from the menu.
--
-- Two of the placeholders are *rewritten* rather than deleted: order_items
-- references menu_items(id), and it keeps its own snapshot of the name and the
-- price paid, so past orders still read back exactly as they were sold.

-- Ujë 0.5L (30 den) is now the 0.50 L plain water on the new list.
UPDATE menu_items SET
  name_sq = 'Ujë i thjeshtë 0.50 L', name_mk = 'Вода 0.50 Л',
  category = 'water', price = 50, sort_order = 71,
  photo = NULL, desc_sq = NULL, desc_mk = NULL
WHERE name_mk = 'Вода 0.5Л';

-- Coca-Cola 0.5L (60 den) is now the 0.25 L bottle.
UPDATE menu_items SET
  name_sq = 'Coca-Cola 0.25 L', name_mk = 'Кока-Кола 0.25 Л',
  category = 'soda', price = 80, sort_order = 50,
  photo = NULL, desc_sq = NULL, desc_mk = NULL
WHERE name_mk = 'Кока-Кола 0.5Л';

-- Ajran is not on the new list but stays on the menu; it is a still drink.
-- It keeps its price, photo and description.
UPDATE menu_items SET category = 'still', sort_order = 65
WHERE name_mk = 'Ајран';

-- The rest of the list. Bottled drinks carry no description and no photo: the
-- brand and the size in the name are the whole story, and the kitchen has no
-- photo of its own for any of them.
INSERT INTO menu_items (name_sq, name_mk, category, price, photo, is_veg, sort_order) VALUES
  ('Coca-Cola Zero 0.25 L',      'Кока-Кола Зеро 0.25 Л',     'soda',  80, NULL, TRUE, 51),
  ('Fanta Orange 0.25 L',        'Фанта Портокал 0.25 Л',     'soda',  80, NULL, TRUE, 52),
  ('Sprite 0.25 L',              'Спрајт 0.25 Л',             'soda',  80, NULL, TRUE, 53),
  ('Schweppes Tonic 0.25 L',     'Швепс Тоник 0.25 Л',        'soda',  80, NULL, TRUE, 54),
  ('Schweppes Bitter Lemon 0.25 L','Швепс Битер Лемон 0.25 Л','soda',  80, NULL, TRUE, 55),
  ('Pepsi 0.33 L',               'Пепси 0.33 Л',              'soda',  70, NULL, TRUE, 56),
  ('Pepsi Zero 0.33 L',          'Пепси Зеро 0.33 Л',         'soda',  70, NULL, TRUE, 57),
  ('7UP 0.33 L',                 '7UP 0.33 Л',                'soda',  70, NULL, TRUE, 58),
  ('Mirinda Orange 0.33 L',      'Миринда Портокал 0.33 Л',   'soda',  70, NULL, TRUE, 59),
  ('Bravo Portokall 0.25 L',     'Браво Портокал 0.25 Л',     'still', 80, NULL, TRUE, 60),
  ('Bravo Mollë 0.25 L',         'Браво Јаболко 0.25 Л',      'still', 80, NULL, TRUE, 61),
  ('Bravo Pjeshkë 0.25 L',       'Браво Праска 0.25 Л',       'still', 80, NULL, TRUE, 62),
  ('Bravo Multivitaminë 0.25 L', 'Браво Мултивитамин 0.25 Л', 'still', 80, NULL, TRUE, 63),
  ('Bravo Vishnje 0.25 L',       'Браво Вишна 0.25 Л',        'still', 80, NULL, TRUE, 64),
  ('Ujë i thjeshtë 0.33 L',      'Вода 0.33 Л',               'water', 40, NULL, TRUE, 70),
  ('Ujë i gazuar 0.25 L',        'Кисела вода 0.25 Л',        'water', 40, NULL, TRUE, 72),
  ('Ujë i gazuar 0.50 L',        'Кисела вода 0.50 Л',        'water', 50, NULL, TRUE, 73);
