const db = require("../../../config/database.config");
const { promisify } = require("util");
const query = promisify(db.query).bind(db);

const Ranking = {
  getRanking: async () => {
    const sql_getRanking = `
    SELECT 
    scores.user_id, 
    scores.username, 
    scores.lastname,
    scores.firstname,
    scores.total_score,
    RANK() OVER (ORDER BY scores.total_score DESC) AS ranking
FROM (
    SELECT 
        r.user_id, 
        u.username, 
        u.lastname,
        u.firstname,
        SUM(r.score) AS total_score
    FROM 
        results r
    JOIN 
        users u ON r.user_id = u.user_id
    GROUP BY 
        r.user_id, u.username, u.lastname, u.firstname
) AS scores
ORDER BY 
    scores.total_score DESC;
`;
    try {
      const result = await query(sql_getRanking);
      return result;
    } catch (error) {
      throw new Error(`ERROR: get ranking - ${error.message}`);
    }
  },
};

module.exports = Ranking;
