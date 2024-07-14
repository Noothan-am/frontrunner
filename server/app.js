require("dotenv").config();
const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const dir = "./uploads";
const sendMail = require("./utils/mail.js");
require("./connections/database-connections.js");

const FounderSchema = require("./Schemas/FounderSchema.js");
const InvestorSchema = require("./Schemas/InvestorsSchema.js");

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
  const { month, id } = req.body;
  const allFiles = [];
  if (req.files) {
    const data = [];
    req.files.forEach((file, index) => {
      const filePath = file.path;
      const workbook = xlsx.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      data.push(xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]));
      allFiles.push(file);
    });
    console.log(data);
    const finalData = {
      [month]: {
        Revenue: {
          name: allFiles[0].filename,
          data: data[0],
        },
        Sales: {
          name: allFiles[1].filename,
          data: data[1],
        },
        Profit: {
          name: allFiles[2].filename,
          data: data[1],
        },
      },
    };

    try {
      const user = await FounderSchema.findOne({ founder_id: "23" });
      if (user) {
        if (!user.data) {
          user.data = {};
        }
        user.data = { ...user.data, ...finalData };
        await user.save();
        res.status(200).json({ data });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      allFiles.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
  } else {
    res.status(400).send("Please upload exactly 3 files.");
  }
});

app.post("/send", sendMail);

app.post("/add-founder", async (req, res) => {
  const { foundersName, yourEmail, password, companyName, companyId } =
    req.body;
  console.log(req.body);
  if (!companyId || !companyName || !foundersName || !yourEmail || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFounder = new FounderSchema({
      founder_name: foundersName,
      founder_id: "23",
      email: yourEmail,
      password: password,
      comp_name: companyName,
      comp_id: companyId,
      data: {},
    });

    await newFounder.save();

    res.status(201).json({ message: "New founder added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to add new founder" });
  }
});

app.post("/add-investor", async (req, res) => {
  const { name, id, email, password } = req.body;

  if (!name || !id || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log(req.body);

  try {
    const newUser = new InvestorSchema({
      name,
      id,
      email,
      password,
      companies: {
        comp_id: "F_1",
        comp_name: "frontrunner",
        founder_id: "23",
        founder_name: "Sid",
      },
    });

    await newUser.save();
    res.status(201).send("User data saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving user data: " + error.message);
  }
  //   {
  //   "name": "John Doe",
  //   "id": "user001",
  //   "email": "john.doe@example.com",
  //   "password": "hashedpassword123",
  //   "companies": [
  //     {
  //       "comp_id": "123456",
  //       "comp_name": "Tech Innovators Inc.",
  //       "founder_id": "founder001",
  //       "founder_name": "Jane Smith"
  //     },
  //     {
  //       "comp_id": "789012",
  //       "comp_name": "NextGen Solutions",
  //       "founder_id": "founder002",
  //       "founder_name": "John Doe"
  //     }
  //   ]
  // }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password, category } = req.body;
    console.log(email, password, category);
    if (!email || !password || category === "Choose an option") {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user;
    if (category === "Founder") {
      user = await FounderSchema.findOne({ email, password }, { password: 0 });
    } else {
      user = await InvestorSchema.findOne({ email, password }, { password: 0 });
    }
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.get("/", (req, res) => {
  res.send(`{ port: ${PORT} }`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
