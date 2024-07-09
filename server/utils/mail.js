const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const FounderSchema = require("../Schemas/FounderSchema.js");

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
    const user = await FounderSchema.findOne({ founder_id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let attachments = [];
    for (const key in user.data) {
      for (const data in user.data[key]) {
        attachments.push({
          filename: user.data[key][data].name,
          path: user.data[key][data].path,
        });
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
        intro: "this is a sample test message",
        outro:
          "Need help, or have questions? Just ask your query to this mail ink@become.team, sam@become.team",
      },
    };

    const userMail = await MailGenerator.generate(userMessage);
    const userMailOptions = {
      from: process.env.FROM_ADMIN_MAIL,
      to: userEmail,
      subject: "Nomencapture",
      html: userMail,
      attachments,
    };

    transport
      .sendMail(userMailOptions)
      .then(async (response) => {
        return res.status(200).send({
          msg: "Messages sent successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sendMail;
