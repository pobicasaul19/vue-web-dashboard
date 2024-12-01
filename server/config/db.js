const path = require('path');
const fs = require('fs');

// Ensure the data folder exists
const dataFolder = path.resolve(__dirname, './data');
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

// Helper function to initialize a Lowdb database
async function InitializeDatabase(fileName) {
  const { Low } = await import('lowdb');
  const { JSONFile } = await import('lowdb/node');

  const filePath = path.join(dataFolder, `${fileName}.json`);

  const adapter = new JSONFile(filePath);
  const db = new Low(adapter, []);

  try {
    await db.read();
    if (!db.data || Object.keys(db.data).length === 0) {
      db.data = { [fileName]: [] }; // Set default structure
    }
    await db.write();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }

  return db;
}

// Predefined collection loaders for common collections
const loadUserCollection = async () => {
  const db = await InitializeDatabase('users');
  return db;
};

const loadCompanyCollection = async () => {
  const db = await InitializeDatabase('companies');
  return db;
};

const loadArticleCollection = async () => {
  const db = await InitializeDatabase('articles');
  return db;
};

module.exports = {
  loadUserCollection,
  loadCompanyCollection,
  loadArticleCollection,
};
