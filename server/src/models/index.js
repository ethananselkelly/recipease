// include all of your models here using CommonJS requires
const User = require("./User.js")
const Model = require('./Model')
const Recipe = require('./Recipe')
const UserRecipe = require('./UserRecipe')
const ListItem = require('./ListItem')

module.exports = {User, Model, Recipe, UserRecipe, ListItem};
