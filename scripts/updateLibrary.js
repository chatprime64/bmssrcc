// scripts/updateLibrary.js
// Usage: node scripts/updateLibrary.js ITEM_ID STUDENT_ID

const fs = require("fs");
const path = require("path");

// Get arguments from command line
const [,, itemId, studentId] = process.argv;

if (!itemId || !studentId) {
  console.error("Usage: node updateLibrary.js ITEM_ID STUDENT_ID");
  process.exit(1);
}

// Path to your library.json file
const filePath = path.join(__dirname, "..", "admin", "library.json");

// Read the JSON file
const raw = fs.readFileSync(filePath, "utf8");
const library = JSON.parse(raw);

// Find the cube by ID
const item = library.find(i => i.id === itemId);

if (!item) {
  console.error(`Item with ID ${itemId} not found.`);
  process.exit(1);
}

// Update the cube status
item.status = "active";          // <-- use "active" instead of "borrowed"
item.borrower = studentId;
item.borrowed_at = new Date().toISOString();

console.log(`Updated cube ${itemId}: now active for ${studentId}`);

// Write back to file
fs.writeFileSync(filePath, JSON.stringify(library, null, 2), "utf8");
