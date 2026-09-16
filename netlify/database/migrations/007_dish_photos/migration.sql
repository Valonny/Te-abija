-- Te Abija — 007
-- Attaches photos to the six dishes added in 006. The column holds a slug and
-- the site looks for public/photos/<slug>.jpg, so the files must be committed
-- alongside this or the rows point at nothing.

UPDATE menu_items SET photo = d.slug FROM (VALUES
  ('Полни пиперки',            'polni-piperki'),
  ('Модар патлиџан',           'modar-patlidzan'),
  ('Стек со ориз',             'stek-oriz'),
  ('Хамбургер со плескавица',  'hamburger-pleskavica'),
  ('Хамбургер со стек',        'hamburger-stek'),
  ('Хамбургер со батак',       'hamburger-batak')
) AS d(name_mk, slug)
WHERE menu_items.name_mk = d.name_mk;
