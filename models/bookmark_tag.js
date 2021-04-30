'use strict';
const {
  Model
} = require('sequelize');
const bookmark = require('./bookmark');
module.exports = (sequelize, DataTypes) => {
  class Bookmark_Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark_Tag.belongsTo(models.bookmark, {
        foreignKey: 'bookmarkId'
      })
      Bookmark_Tag.belongsTo(models.Tag, {
        foreignKey: 'tagId'
      })
    }
  };
  Bookmark_Tag.init({
    bookmarkId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookmark_Tag',
  });
  return Bookmark_Tag;
};