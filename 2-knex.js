const knex = require('knex');
const { db } = require('config');

const client = knex({
  client: 'pg',
  connection: db,
});

client
  .select([
    client.ref('category.name').as('categoryName'),
    client.ref('category.allowComments').as('allowComments'),
    client.ref('categoryItem.name').as('categoryItemName'),
  ])
  .from('category')
  .leftJoin('categoryItem', 'category.name', 'categoryItem.categoryName')
  .where('categoryName', '=', 'category-50000')
  .debug()
  .then((rows) => {
    console.log('query returned results: ', rows);

    client.destroy();
  });
