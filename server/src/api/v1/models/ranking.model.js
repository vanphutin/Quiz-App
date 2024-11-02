const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Ranking = {
  getRanking: async () => {
    const sql_getRanking = `SELECT 
                                r.user_id, 
                                u.username, 
                                u.lastname,
                                u.firstname,
                                SUM(r.score) AS total_score,
                                RANK() OVER (ORDER BY SUM(r.score) DESC) AS rank
                            FROM 
                                results r
                            JOIN 
                                users u ON r.user_id = u.user_id
                            GROUP BY 
                                r.user_id, u.username
                            ORDER BY 
                                total_score DESC;`;
    try {
      const result = await query(sql_getRanking);
      return result;
    } catch (error) {
      throw new Error(`ERROR: get ranking - ${error.message}`);
    }
  },
};

module.exports = Ranking;
