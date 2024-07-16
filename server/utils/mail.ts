const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMail = async (req, res) => {
  const { userEmail, clientEmail } = req.body;

  const filePath = req.filePath;

  try {
    let service = {
      service: "gmail",
      auth: {
        user: process.env.FROM_ADMIN_MAIL,
        pass: process.env.MAIL_PASS_KEY,
      },
    };

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
      from: "noothanam13@gmail.com",
      to: "amnoothan@gmail.com",
      subject: "Nomencapture",
      html: userMail,
      attachments: [
        {
          filename: "file.pdf",
          path: filePath,
        },
      ],
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
