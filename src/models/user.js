import db from "./database";
module.exports = {
  AddUser: async function (user) {
    try {
      const result = await db.query("INSERT INTO user SET ?", user);
      return { result: result, error: null };
    } catch (error) {
      return { result: null, error: error };
    }
  },
  GetUser: async function (id) {
    try {
      const result = await db.query("SELECT * from user where id = ?", id);
      return { result: result, error: null };
    } catch (error) {
      return { result: null, error: error };
    }
  },
};
