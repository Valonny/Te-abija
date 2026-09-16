-- Të Abija — 005
-- Text only. The Albanian dish descriptions had adjective agreement errors:
-- participles left in the singular or bare where the noun is feminine plural
-- (perime, gjethe, petë, shtresa), and one masculine noun given a feminine
-- participle (mish viçi i ziera). Nothing structural changes here, so this is
-- safe to re-run and safe to edit before it is applied.

UPDATE menu_items SET desc_sq = d.sq FROM (VALUES  -- (name_mk, corrected sq)
  ('Гулаш со пире',
   'Mish viçi i zier ngadalë në salcë me piper të kuq, mbi pure patatesh.'),
  ('Мусака',
   'Shtresa patatesh dhe mish i grirë, të pjekura në furrë me krem veze.'),
  ('Ѓувеч',
   'Perime të sezonit të pjekura në furrë me vaj ulliri dhe majdanoz.'),
  ('Сарма',
   'Gjethe lakre turshi të mbushura me mish dhe oriz, të ziera ngadalë.'),
  ('Бурек со месо',
   'Petë të holla me mish të grirë, të pjekura në tavë të rrumbullakët.')
) AS d(name_mk, sq)
WHERE menu_items.name_mk = d.name_mk;

-- Two Macedonian lines that read awkwardly rather than wrongly. Delete this
-- block if you disagree — the migration works fine without it.
UPDATE menu_items SET desc_mk = d.mk FROM (VALUES
  ('Мусака',
   'Слоеви од компири и мелено месо, печени во рерна со прелив од јајца.'),
  ('Сарма',
   'Лисја од кисела зелка, полнети со месо и ориз, варени полека.')
) AS d(name_mk, mk)
WHERE menu_items.name_mk = d.name_mk;
