import express from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, "form-data.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    phoneNumber TEXT,
    favoriteNumber INTEGER,
    favoriteMammal TEXT,
    address TEXT
  )`);
});

app.post("/api/saveProfile", (req, res) => {
  const { fullName, phoneNumber, favoriteNumber, favoriteMammal, address } =
    req.body;
  const stmt = db.prepare(
    `INSERT INTO user_profile (fullName, phoneNumber, favoriteNumber, favoriteMammal, address) VALUES (?, ?, ?, ?, ?)`
  );
  stmt.run(
    fullName,
    phoneNumber,
    favoriteNumber,
    favoriteMammal,
    address,
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
