import db from "./database";

// inital loading...
module.exports = {
  AddWifisBulk: async function (wifiList) {
    try {
      const result = await db.query(
        "INSERT INTO wifi (inst_loc, inst_loc_detail, provider, inst_addr, latitude, longitude) VALUES ?",
        [wifiList]
      );
      return { result: result, error: null };
    } catch (error) {
      return { result: null, error: error };
    }
  },
  SearchWifisByProvider: async function (provider) {
    try {
      // 여기서 LIKE 까지는 필요없음.정확한 값이 있기에
      // lIKE 는 ~~ 랑 비슷한 것이 있으면 이라는 거니까
      const result = await db.query(
        "SELECT * FROM wifi where provider LIKE ?",
        [provider]
      );
      return { result: result, error: null };
    } catch (error) {
      return { result: null, error: error };
    }
  },
  GetAllWifis: async function () {
    try {
      const result = await db.query("SELECT * from wifi");
      return { result: result, error: null };
    } catch (error) {
      return { result: null, error: error };
    }
  },
};
