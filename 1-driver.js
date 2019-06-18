const { Client } = require('pg');
const { db } = require('config');

const client = new Client(db);

client.connect();

const query = `
  SELECT
    category.name as "categoryName",
    category."allowComments" as "allowComments",
    "categoryItem".name AS "categoryItemName"
  FROM category
  LEFT JOIN "categoryItem" ON 
    "categoryItem"."categoryName" = category.name
  WHERE "categoryName" = 'category-50000'`;
console.log('executing query: ', query);

client
  .query(query)
  .then((res) => {
    console.log('query returned result: ', res.rows);
    client.end();
  });
