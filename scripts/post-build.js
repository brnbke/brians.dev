const fs = require("fs");
const path = require("path");

// Copy CNAME file to out directory after build
const cnameSource = path.join(__dirname, "..", "docs", "CNAME");
const cnameTarget = path.join(__dirname, "..", "out", "CNAME");

if (fs.existsSync(cnameSource)) {
  fs.copyFileSync(cnameSource, cnameTarget);
  console.log("CNAME file copied to out directory");
} else {
  console.log("CNAME file not found in docs directory");
}
