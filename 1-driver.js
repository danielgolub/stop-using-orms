const { Client } = require('pg');
const { db } = require('config');

const client = new Client(db);

client.connect();

const query = `
  SELECT
    category.name,
    category."allowComments",
    "categoryItem".name
  FROM category
  LEFT JOIN "categoryItem" ON 
    "categoryItem"."categoryName" = category.name
  WHERE category.name = 'category-50000'`;
console.log('executing query: ', query);

client
  .query(query)
  .then((res) => {
    console.log('query returned result: ', res.rows);
    client.end();
  });
