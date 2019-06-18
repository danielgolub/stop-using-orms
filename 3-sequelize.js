const Sequelize = require('sequelize');
const { db } = require('config');

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

const { DataTypes } = Sequelize;
const sequelize = new Sequelize({
  ...db,
  username: db.user,
  dialect: 'postgres',
  operatorsAliases: false,
});

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  allowComments: {
    type: DataTypes.BOOLEAN,
  },
}, DISABLE_SEQUELIZE_DEFAULTS);

const CategoryItem = sequelize.define('categoryItem', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  categoryName: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
}, DISABLE_SEQUELIZE_DEFAULTS);

CategoryItem.belongsTo(Category, {
  foreignKey: 'categoryName',
});

Category.hasMany(CategoryItem, {
  foreignKey: 'categoryName',
});

Category.findOne({
  attributes: ['name', 'allowComments'],
  include: [
    {
      required: false,
      model: CategoryItem,
      where: {
        categoryName: 'category-50000',
      },
      attributes: ['name'],
    },
  ],
}).then((rows) => {
  console.log('query returned results: ', rows.toJSON());

  sequelize.close();
});

// CategoryItem.findAll({
//   attributes: [
//     'name',
//   ],
//   include: [
//     {
//       model: Category,
//       where: {
//         name: 'category-50000',
//       },
//       attributes: [
//         'name',
//         'allowComments',
//       ],
//     },
//   ],
//   raw: true,
// }).then((rows) => {
//   console.log('query returned results: ', rows);
//
//   sequelize.close();
// });
