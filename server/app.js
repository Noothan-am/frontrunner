const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const dir = "./uploads";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.post("/upload", upload.array("files"), async (req, res) => {
  if (req.files) {
    const data = [];
    req.files.forEach((file, index) => {
      const filePath = file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      data.push(xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]));
    });
    console.log({ data });
    res.status(200).json({ data });
  } else {
    res.status(400).send("Please upload exactly 3 files.");
  }
});

app.get("/", (req, res) => {
  res.send(`{ port: ${PORT} }`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
