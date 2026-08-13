// api/creators.js
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Enable CORS for your frontend (if needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    const creators = await sql`SELECT * FROM creators ORDER BY growth DESC;`;
    res.status(200).json(creators);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
