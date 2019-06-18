CREATE TABLE category (
  name  VARCHAR(64) PRIMARY KEY,
  "allowComments" boolean
);

CREATE TABLE "categoryItem" (
  "categoryName"  VARCHAR(64) NOT NULL REFERENCES category(name),
  name  VARCHAR(64) NOT NULL,
  content TEXT,
  PRIMARY KEY("categoryName", name)
);

INSERT INTO category(name, "allowComments")
  SELECT 'category-' || generate_series(1, 100000),
  true;

INSERT INTO "categoryItem"(name, "categoryName")
  SELECT 'item1-' || generate_series(1, 100000),
  'category-' || generate_series(1,100000);

INSERT INTO "categoryItem"(name, "categoryName")
  SELECT 'item2-' || generate_series(1, 100000),
  'category-' || generate_series(1,100000);

INSERT INTO "categoryItem"(name, "categoryName")
  SELECT 'item3-' || generate_series(1, 100000),
  'category-' || generate_series(1,100000);

