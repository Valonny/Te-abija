-- Të Abija — 004
-- Orders that arrive from the plain link instead of a company's QR code.
-- Those have no company behind them: the customer types the address the food
-- should go to, or says they will come and collect it. So location_slug stops
-- being mandatory, and the order itself carries what the driver needs.
--
-- track_token: a company order is looked up by code + slug, and the slug is
-- only known to whoever scanned that company's QR code. A direct order has no
-- slug to hide behind and its row holds a home address and a phone number, so
-- it gets a random token and the tracker asks for it. Without that, three
-- digits would be enough to read a stranger's address.

ALTER TABLE orders ALTER COLUMN location_slug DROP NOT NULL;

ALTER TABLE orders
  ADD COLUMN fulfilment    TEXT NOT NULL DEFAULT 'workplace',
  ADD COLUMN contact_phone TEXT,
  ADD COLUMN address       TEXT,
  ADD COLUMN track_token   TEXT;

ALTER TABLE orders
  ADD CONSTRAINT orders_fulfilment_chk
  CHECK (fulfilment IN ('workplace', 'delivery', 'pickup'));

-- A company order goes to the company. Anything else has to leave a phone
-- number, and say where it is going unless it is being collected in person.
ALTER TABLE orders
  ADD CONSTRAINT orders_destination_chk
  CHECK (
    location_slug IS NOT NULL
    OR (contact_phone IS NOT NULL AND (fulfilment = 'pickup' OR address IS NOT NULL))
  );

CREATE INDEX orders_token_idx ON orders (track_token);
