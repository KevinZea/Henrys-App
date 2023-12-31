const { Burger } = require("../models");
const { Op } = require("sequelize");

async function create(data) {
  const burger = await Burger.create(data);
  await burger.addIngredient(data.ingredients);
  const withRelation = await getById(burger.id);

  return withRelation;
}

async function getById(id) {
  const burger = await Burger.findByPk(id, {
    include: [
      {
        association: "ingredient",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return burger;
}

async function getAll() {
  const burgers = await Burger.findAll();
  return burgers;
}

async function getByQuery(queries) {
  if (!queries) {
    return await getAll();
  }

  const burgers = await Burger.findAll({ where: queries });
  return burgers;
}

async function getByName(name) {
  const burger = await Burger.findOne({
    where: { name: { [Op.iLike]: `${name}` } },
  });
  return burger;
}

async function destroy(id) {
  const deletedBurger = await Burger.destroy({
    where: {
      id: id,
    },
  });

  return deletedBurger;
}

async function restore(id) {
  const restoredBurger = await Burger.restore({
    where: {
      id: id,
    },
  });

  return restoredBurger;
}

async function update(data) {
  const updatedBurger = await Burger.update(data, { where: { id: data.id } });
  return updatedBurger;
}

module.exports = {
  create,
  getById,
  getAll,
  getByQuery,
  getByName,
  destroy,
  restore,
  update,
};
