import connection from '../confic/DB.js';
import client from '../redis/client.js';

const userViewBlock = async (req, res) => {
  try {
    const cacheKey = "userView";

    const cached = await client.get(cacheKey);
    if (cached) {
      return res.status(200).json({ results: JSON.parse(cached) });
    }
    const [userBlocks] = await connection.promise().query(
      "SELECT * FROM company_db.blogs;"
    );

    await client.set(cacheKey, JSON.stringify(userBlocks)   );

    return res.status(200).json({ results: userBlocks });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default userViewBlock;
