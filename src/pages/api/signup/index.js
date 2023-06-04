import * as authApi from "@api/auth";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ramca0909@gmail.com",
    pass: "apqbnszpfewenoxi"
  }
})

export default (req, res) => {
  if (req.body.action === 'buy_product'){
    const lead = req.body.lead;
    const userEmail = lead.email;
    console.log(req.body);

    const link = `https://tinnituspal.com/signup?email=${userEmail}`;

    let mailOptions = {
      from: "ramca0909@gmail.com",
      to: userEmail,
      subject: "Please Sign Up!",
      text: link,
      html: `
      <p>Follow this link to Sign Up:</p>
      <p><a href='${link}'>SignUp</a></p>
      `
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) throw err;
      else console.log(info);
    })

    return res.status(200).json({message: 'Okay'});
  }
  return res.status(200).json({message: "Welcome to Tinnitus API!"});
}