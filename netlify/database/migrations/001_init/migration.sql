-- Të Abija — lunch ordering
-- Locations are the QR codes. Slugs are permanent once printed.

CREATE TABLE locations (
  slug        TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  street      TEXT,
  phone       TEXT,
  active      BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE menu_items (
  id          SERIAL PRIMARY KEY,
  name_sq     TEXT NOT NULL,
  name_mk     TEXT NOT NULL,
  category    TEXT NOT NULL,
  price       INTEGER NOT NULL,
  photo       TEXT,
  is_special  BOOLEAN NOT NULL DEFAULT FALSE,
  available   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id            SERIAL PRIMARY KEY,
  code          TEXT NOT NULL,
  location_slug TEXT NOT NULL REFERENCES locations(slug),
  person        TEXT NOT NULL,
  note          TEXT,
  total         INTEGER NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id    INTEGER NOT NULL REFERENCES menu_items(id),
  name_sq    TEXT NOT NULL,
  name_mk    TEXT NOT NULL,
  qty        INTEGER NOT NULL,
  unit_price INTEGER NOT NULL
);

CREATE INDEX orders_created_idx ON orders (created_at DESC);
CREATE INDEX orders_status_idx  ON orders (status);

INSERT INTO locations (slug, name, street, phone) VALUES
('karmen-baucentar','Karmen Baucentar','Kačanički Pat 250, Vizbegovo','+389 2 309 6030'),
('gips-imobilia','Gips Imobilia Design','Ul. 1506 / Kačanički Pat, Vizbegovo','+389 2 261 5130'),
('mak-kab','MAK KAB','Jadranska Magistrala 59, Vizbegovo','+389 2 323 3727'),
('radek','RADEK','Jadranska Magistrala 71b, Vizbegovo','+389 70 215 994'),
('euro-grands','Euro-Grands','Jadranska Magistrala / Kačanički Pat, Vizbegovo','+389 2 260 0106'),
('ditec','Ditec Group','Kačanički Pat 134, Vizbegovo','+389 2 265 5220'),
('leniks','Leniks','Ul. 1506 br. 88, Momin Potok','+389 2 265 0500'),
('uno-pi','Uno Pi Grup','Most 8-mi Septemvri 58A, Vizbegovo','+389 2 309 1400'),
('baukop','Baukop','Kačanički Pat 210, Vizbegovo','+389 2 265 1555'),
('rolomatik','Rolomatik','Kačanički Pat, Momin Potok','+389 2 265 0800'),
('lesna','Lesna','Kačanički Pat b.b., Momin Potok','+389 2 261 1400'),
('daxorol','Daxorol & Elegant Kompani','Skupi b.b.','+389 70 252 505'),
('xhidi-komerc','Xhidi Komerc','Jadranska Magistrala, Vizbegovo',NULL),
('balkanja','Balkanja','Ulica 1, Vizbegovo',NULL),
('kola','KOLA Skopje','Kačanički Pat 254, Vizbegovo','+389 2 265 6770'),
('floors-group','Floors Group','Vizbegovo / Brazda zone','+389 78 356 093'),
('space-floors','Space Floors','Jadranska Magistrala 58, Vizbegovo','+389 78 238 329'),
('dini-company','Floors Dini Company','Kačanički Pat, Vizbegovo','+389 71 888 443'),
('comodita','Comodita Home','Kačanički Pat 47, Vizbegovo','+389 71 393 000'),
('salon-29','Salon 29','Jadranska Magistrala b.b., Vizbegovo','+389 2 260 0500'),
('fokus','Fokus Upholstery','Jadranska Magistrala 203, Vizbegovo','+389 70 220 880'),
('pro-centar','Pro Centar Sistemi','Jadranska Magistrala b.b., Vizbegovo','+389 78 365 727'),
('laptop-mk','LAPTOP MK','Jadranska Magistrala 12, Vizbegovo','+389 71 331 190'),
('otg','Otvorena Trgovska Grupacija','Ul. 1552 br. 25, Vizbegovo','+389 70 393 625'),
('jcs-sintek','JCS Sintek','Ul. 1506 br. 83, Momin Potok','+389 2 261 6999'),
('alfa-tv','Alfa TV','Kačanički Pat b.b., Momin Potok','+389 2 260 0370'),
('ats-group','ATS Group','Jadranska Magistrala 98, Vizbegovo','+389 2 265 5400'),
('besa-petrol','Besa Petrol','E65 / Jadranska Magistrala b.b., N. Vizbegovo','+389 2 265 0333'),
('auto-jaja','Auto Service Jaja','Kačanički Pat b.b., Vizbegovo','+389 78 631 733'),
('shuko-eko','Shuko Eko Truck Repair','Kačanički Pat, Vizbegovo','+389 78 317 920'),
('auto-4321','4-3-2-1 Auto Servis','Jadranska Magistrala / Kačanički Pat','+389 70 252 800'),
('olimpia-motors','Olimpia Motors','Jadranska Magistrala b.b. / Blvd. Slovenija','+389 2 260 0000'),
('makpetrol-008','Makpetrol 008','Kačanički Pat b.b., Momin Potok','+389 2 312 4250'),
('aktiva-petrol','Aktiva Petrol','Jadranska Magistrala 114, Vizbegovo','+389 2 265 5033'),
('samantha','Samantha','Kačanički Pat b.b., Vizbegovo','+389 2 260 0077'),
('golden-egg','Skopje Golden Egg','Kačanički Pat 70, Vizbegovo','+389 2 265 1100'),
('atlantik','Atlantik Fruit & Vegetable','Kačanički Pat 103, Vizbegovo','+389 2 312 5253'),
('real-company','Real Company','Ul. 1551 br. 20, Vizbegovo Ind. Zone','+389 70 335 280'),
('sunilens','Sunilens','Kačanički Pat 140, Vizbegovo','+389 2 265 0100'),
('phoenix-pharma','Phoenix Pharma','Jadranska Magistrala 31, Vizbegovo','+389 2 203 2000'),
('bionika','Bionika / Swisslion Center','Kačanički Pat 127, Vizbegovo','+389 2 260 3800');

INSERT INTO menu_items (name_sq, name_mk, category, price, photo, is_special, sort_order) VALUES
('Tavë me fasule','Тавче гравче','special',160,'tavce-gravce',TRUE,1),
('Gullash me pure','Гулаш со пире','special',220,'gullash',TRUE,2),
('Musaka','Мусака','main',190,'musaka',FALSE,10),
('Turli perimesh','Ѓувеч','main',170,'guvec',FALSE,11),
('Sarma','Сарма','main',180,'sarma',FALSE,12),
('Qofte në sos','Ќофтиња во сос','main',200,'qofte',FALSE,13),
('Qebapa, 10 copë','Ќебапи, 10 парчиња','grill',250,'qebapa',FALSE,20),
('Salcice zgare','Колбаси на скара','grill',230,'salcice',FALSE,21),
('Pleskavicë','Плескавица','grill',240,'pleskavice',FALSE,22),
('Byrek me mish','Бурек со месо','pite',120,'byrek',FALSE,30),
('Pite me spinaq','Пита со спанаќ','pite',110,'pite-spinaq',FALSE,31),
('Sallatë shopska','Шопска салата','side',90,'shopska',FALSE,40),
('Kos','Кисело млеко','side',40,NULL,FALSE,41),
('Bukë','Леб','side',20,NULL,FALSE,42),
('Ujë 0.5L','Вода 0.5Л','drink',30,NULL,FALSE,50),
('Coca-Cola 0.5L','Кока-Кола 0.5Л','drink',60,NULL,FALSE,51),
('Ajran','Ајран','drink',40,NULL,FALSE,52);
