// api/analyze.js
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { caption, score, tips, hashtags, userId } = req.body;
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    const result = await sql`
      INSERT INTO analyses (caption, score, tips, hashtags, user_id)
      VALUES (${caption}, ${score}, ${JSON.stringify(tips)}, ${JSON.stringify(hashtags)}, ${userId || null})
      RETURNING *;
    `;
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
