const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const FounderSchema = require("../Schemas/FounderSchema.js");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");

async function jsonToExcel(category, data, outputPath) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  const columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
  worksheet.columns = columns;

  data.forEach((item) => worksheet.addRow(item));

  await workbook.xlsx.writeFile(outputPath);
  console.log(`Excel file for ${category} created at ${outputPath}`);
}

const sendMail = async (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: "No recipients defined" });
  }

  try {
    let service = {
      service: "gmail",
      auth: {
        user: process.env.FROM_ADMIN_MAIL,
        pass: process.env.MAIL_PASS_KEY,
      },
    };

    const id = "23";
    const mongoDBData = await FounderSchema.findOne({ founder_id: id });
    if (!mongoDBData) {
      return res.status(404).json({ message: "User not found" });
    }

    const attachments = [];
    const filePaths = []; // Store file paths to delete later
    for (const [month, categories] of Object.entries(mongoDBData.data)) {
      for (const [category, { data }] of Object.entries(categories)) {
        const outputPath = path.join(
          __dirname,
          "../sending",
          `${category}-${month}-${mongoDBData.comp_name}.xlsx`
        );
        await jsonToExcel(category, data, outputPath); // Ensure the file is created before adding to attachments
        attachments.push({
          filename: `${category}-${month}-${mongoDBData.comp_name}.xlsx`,
          path: outputPath,
        });
        filePaths.push(outputPath); // Add file path to the list for later deletion
      }
    }

    const transport = nodemailer.createTransport(service);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Become",
        link: "https://mailgen.js/",
      },
    });

    const userMessage = {
      body: {
        name: "Noothan",
        intro: "This is a sample test message",
        outro:
          "Need help, or have questions? Just ask your query to this mail ink@become.team, sam@become.team",
      },
    };

    const userMail = MailGenerator.generate(userMessage);
    const userMailOptions = {
      from: process.env.FROM_ADMIN_MAIL,
      to: userEmail,
      subject: "Nomencapture",
      html: userMail,
      attachments,
    };

    transport
      .sendMail(userMailOptions)
      .then(() => {
        // Delete files after sending email
        filePaths.forEach((filePath) => {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(
                `Failed to delete file ${filePath}: ${err.message}`
              );
            } else {
              console.log(`Deleted file ${filePath}`);
            }
          });
        });

        return res.status(200).send({
          msg: "Messages sent successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sendMail;
