const _ = require("lodash");
const sequelize = require("../../config/sequelize/setup.js");

const Test = {
  sequelize,
  basics: {},
};

if (
  process.env.NODE_ENV === "test" &&
  sequelize.config.database === "api_challenge"
) {
  Test.resetTable = (modelName) => {
    if (modelName === "Utils") return;
    if (!modelName) throw new Error("modelName undefined");
    return sequelize.models[modelName].sync({ force: true, logging: false });
  };

  Test.resetDb = async () => {
    await Test.resetTable("User");
    await Test.resetTable("Role");
    await Test.resetTable("UserRole");
    return Promise.resolve();
  };

  Test.setupDb = async () => {
    try {
      await Test.resetDb();
      await sequelize.models.Role.createDefaultRoles();
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Assign a role to a given user
   */
  Test.assignRoleForUser = async ({ user, roleName }) => {
    const role = await sequelize.models.Role.findOne({
      where: { name: roleName },
    });
    return sequelize.models.UserRole.create({
      userId: user.id,
      roleId: role.id,
    });
  };
}

module.exports = Test;
