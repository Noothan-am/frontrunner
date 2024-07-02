const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const dir = "./uploads";

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.post("/upload", upload.single("excelFile"), (req, res) => {
  if (req.file) {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    res.json({ data });
  } else {
    res.status(400).send("No file uploaded.");
  }
});

app.get("/", (req, res) => {
  console.log("sdlfkds");
  res.send("{ port: PORT }");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
