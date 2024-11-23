const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const PORT = 8080;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0000",
  database: "heart2help",
});

app.use(express.json());
app.use(cors());

app.get("/donor", (req, res) => {
  const q = "select * from donor";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// app.post("/signup", (req, res) => {
//   const checkQuery = "SELECT * FROM users WHERE email = ? OR phone_number = ?";
//   const insertQuery =
//     "INSERT INTO users (`name`, `email`, `phone_number`, `password`, `bloodtype`, `user_type`) VALUES (?)";
//   const values = [
//     req.body.name,
//     req.body.email,
//     req.body.phoneNumber,
//     req.body.password,
//     req.body.bloodType,
//     req.body.role
//   ];

//   db.query(
//     checkQuery,
//     [req.body.email, req.body.phoneNumber],
//     (err, results) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Database error" });
//       }
//       if (results.length > 0) {
//         return res
//           .status(400)
//           .json({ message: "Email or phone number already exists" });
//       }

//       db.query(insertQuery, [values], (err) => {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({ message: "Database error" });
//         }
//         console.log("successfully registered!");
//         return res.status(200).json({
//           message: "User registered successfully",
//           user: {
//             name: req.body.name,
//             email: req.body.email,
//             phoneNumber: req.body.phoneNumber,
//             bloodType: req.body.bloodType,
//             role: req.body.role,
//           },
//         });
//       });
//     }
//   );
// });

app.post("/signup", (req, res)=>{
  const q = "CALL UserSignUp(?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.phoneNumber,
    req.body.bloodType,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.password,
    req.body.role
  ]

  db.query(q, [values], (err, data)=>{
    if(err){
      console.log(err);
      return res.status(409).json(err);
    }
    return res.json(data);
  })

})

// app.post("/login", (req, res) => {

//     // const values = {
//     //     isAdult : result[0].is_adult,
//     //     isHealthy : result[0].is_healthy,
//     //     lastDonated : result[0].lastDonated
//     // }
//     // console.log(result);

//     const q = "select * from users where email=? and password=?";

//     db.query(q, [req.body.email, req.body.password], (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({ message: "Database error" });
//       }
      
//     const NameQuery = "select * from DonorDetails where donor_id=(?)";
//         db.query(NameQuery, data[0].user_id, (err, result) => {
//             if (err) {
//             console.log(err);
//             }
//             if (data.length > 0) {
//                 console.log("Successfully login!");
//                 return res.status(200).json({
//                 user: {
//                     name: data[0].name,
//                     email: req.body.email,
//                     isAdult : result[0].is_adult,
//                     isHealthy : result[0].is_healthy,
//                     lastDonated : result[0].lastDonated
//                 }
//                 });
//             }
//             console.log("Email and Password is not correct!");
//             return res
//                 .status(401)
//                 .json({ message: "Email and Password is not correct!" });
//         });
//   });
// });

app.post("/getDonorDetails", (req, res) => {
  const q = "select * from donordetails where donor_id=?";

  db.query(q, req.body.user_id, (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Donor details not found" });
    }
    // console.log(data);
    return res.status(200).json({
      user: {
        isAdult: data[0].is_adult,
        isHealthy: data[0].is_healthy,
        lastDonated: data[0].lastDonated
      }
    });
  });
});

app.post("/getUserDetails", (req, res) => {
  const q = "select * from users where user_id=?";

  db.query(q, req.body.user_id, (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Donor details not found" });
    }
    // console.log(data);
    return res.status(200).json({
      user: {
        name: data[0].name,
        email: data[0].email,
        phoneNumber: data[0].phone_number,
        password: data[0].password,
        bloodtype: data[0].bloodtype,
        userType: data[0].user_type
      }
    });
  });
});

// app.post("/login", async (req, res) => {
//   const userQuery = "select * from users where email=? and password=?";
//   db.query(userQuery, [req.body.email, req.body.password], async (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Database error" });
//     }
//     if (data.length > 0) {
//       try {
//         const response = await axios.post("http://localhost:8080/getDonorDetails", { user_id: data[0].user_id });
//         console.log("Successfully login!");
//         // console.log(response);
//         return res.status(200).json({
//           user: {
//             id: data[0].user_id,
//             name: data[0].name,
//             email: data[0].email,
//             phoneNumber: data[0].phone_number,
//             password: data[0].password,
//             bloodtype: data[0].bloodtype,
//             userType: data[0].user_type,
//             isAdult: response.data[0].is_adult,
//             isHealthy: response.data[0].is_healthy,
//             lastDonated: response.data[0].lastDonated
//           }
//         });
//       } catch (err) {
//         console.log(err);
//       }
//       console.log("Successfully login!");
//       // console.log(response);
//       return res.status(200).json({
//         user: {
//           id: data[0].user_id,
//           name: data[0].name,
//           email: data[0].email,
//           phoneNumber: data[0].phone_number,
//           password: data[0].password,
//           bloodtype: data[0].bloodtype,
//           userType: data[0].user_type
//         }
//       });
//     }
//     console.log("Email and Password is not correct!");
//     return res.status(401).json({ message: "Email and Password is not correct!" });
//   });
// });

app.post("/login", async (req, res) => {
  const userQuery = "call UserLogin(?, ?)";
  db.query(userQuery, [req.body.emailOrPhone, req.body.password], async (err, data) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "Invalid email/phone number or password!" });
    }
    // console.log(data[0][0].user_id);
    if (data.length > 0) {
      try {
        const response = await axios.post("http://localhost:8080/getDonorDetails", { user_id: data[0][0].user_id });
        console.log("Successfully login!");
        // console.log(data[0]);
        // console.log(response);
        return res.status(200).json({
          user: {
            id: data[0][0].user_id,
            name: data[0][0].name,
            email: data[0][0].email,
            phoneNumber: data[0][0].phone_number,
            bloodtype: data[0][0].bloodtype,
            address: data[0][0].address,
            city: data[0][0].city,
            state: data[0][0].state,
            password: data[0][0].password,
            userType: data[0][0].user_type,
            isAdult: response.data[0].is_adult,
            isHealthy: response.data[0].is_healthy,
            lastDonated: response.data[0].lastDonated
          }
        });
      } catch (err) {
        console.log(err);
      }
      console.log("Successfully login!");
      return res.status(200).json({
        user: {
          id: data[0][0].user_id,
          name: data[0][0].name,
          email: data[0][0].email,
          bloodtype: data[0][0].bloodtype,
          address: data[0][0].address,
          city: data[0][0].city,
          state: data[0][0].state,
          phoneNumber: data[0][0].phone_number,
          password: data[0][0].password,
          userType: data[0][0].user_type
        }
      });
    }
    console.log("Email and Password is not correct!");
    return res.status(401).json({ message: "Email and Password is not correct!" });
  });
});

app.post("/quick_survey", (req, res) => {
  const values = [req.body.isAdult, req.body.isHealthy, req.body.lastDonated];
  const UidQuery = "select user_id from users where email=(?)";

  db.query(UidQuery, req.body.email, (err, result) => {
    if (err) {
      console.log(err);
    }

    const Uid = result[0].user_id;
    console.log(result);
    const q = "insert into donordetails (donor_id, is_adult, is_healthy, lastDonated) values (?, ?, ?, ?)";

    db.query(q, [Uid, ...values], (err, data) => {
      if (err) {
        console.log(err.errno);
        return res.status(500).json({ message: "Database error" });
      }
      console.log(data);
      return res
        .status(200)
        .json({ message: "Quick Survey submitted successfully" });
    });
  });
});

app.post("/candonate", (req, res)=>{
  const q = "select canDonate from CanDonateStatus where donor_id = ?";
  db.query(q, req.body.user_id, (err, data)=>{
    if(err){
      console.log(err);
      return res.json(err);
    }
    return res.json({
      canDonate: data[0].canDonate
    })
    // console.log(data)
    // return res.json(data);
  })
})

app.put("/settings/:id", (req, res)=>{
  const user_id = req.params.id;
  const q = "update donordetails set `is_adult`=?, `is_healthy`=?, `lastDonated`=? where donor_id = ?";
  const q2 = "update users set `name`=?, `email`=?, `phone_number`=?, `bloodtype`=?, `address`=?, `city`=?, `state`=?, `password`=?, `user_type`=? where user_id = ?";
  const values = [
    req.body.isAdult,
    req.body.isHealthy,
    req.body.lastDonated
  ]
  const values2 = [
    req.body.name,
    req.body.email,
    req.body.phoneNumber,
    req.body.bloodtype,
    req.body.address,
    req.body.city,
    req.body.state,
    req.body.password,
    req.body.userType
  ]
  db.query(q, [...values, user_id], (err, data)=>{
    if(err){
      return res.json(err);
    }
    db.query(q2, [...values2, user_id], (err, data2)=>{
      if(err){
        return res.json(err);
      }
      return res.json({data, data2});
    })
  })
})

app.put("/settings/ChangeToDonor/:id", (req, res)=>{
  const q = "CALL ChangeToDonor(?)";
  db.query(q, [req.params.id, req.body.password], (err, data)=>{
    if(err){
      console.log(err);
      return res.json(err);
    }
    return res.json("User Became donor successfully!");
  })
})

app.post("/getDonors", (req, res)=>{
  const q = "CALL P_getDonors(?, ?, ?)";
  
  db.query(q, [req.body.user_id, req.body.password, req.body.bloodType], (err, data)=>{
    if(err){
      return res.json(err);
    }
    return res.json(data[0]);
  })
})

app.post("/donor", (req, res) => {
  const q =
    "insert into donor (`name`, `phone`, `email`, `BloodType`, `Healthy`, `Addicted`, `photo`) values (?)";
  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.BloodType,
    req.body.Healthy,
    req.body.Addicted,
    req.body.photo,
  ];

  // const values = ["Shahil", "9876543210", "shahil@gmail.com", "A+", 1, 0, "abc.jpeg"];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

app.delete("/donor/:id", (req, res) => {
  const Did = req.params.id;
  const q = "delete from donor where id = ?";

  db.query(q, [Did], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Donor data has been deleted successfully!");
  });
});

app.put("/donor/:id", (req, res) => {
  const Did = req.params.id;
  const q =
    "Update donor set `name`=?, `phone`=?, `email`=?, `BloodType`=?, `Healthy`=?, `Addicted`=?`photo`=? where id=?";

  const values = [
    req.body.name,
    req.body.phone,
    req.body.email,
    req.body.BloodType,
    req.body.Healthy,
    req.body.Addicted,
    req.body.photo,
  ];

  db.query(q, [...values, Did], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});



// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'heart2helpindia@gmail.com',
    pass: 'scad cnqe wrwl uous', // Use the app password generated in Step 1
  },
});

// Create a POST route to send emails
// app.post('/send-email', async(req, res) => {
//   try{
//     const { to, subject, text, html } = req.body;
//       const responseEmail = await transporter.sendMail({
//         from: 'heart2helpindia@gmail.com',
//         to,
//         subject,
//         text,
//         html,
//       });
//     res.status(200).json({ responseEmail });
//    }catch(err){
//      res.status(400).json({err});
//   }
// });

// app.post('/request-blood', async (req, res) => {
//   const { donorEmail, patientName, donorAddress } = req.body;

//   const acceptLink = `http://localhost:8080/accept-request?donorEmail=${donorEmail}`;
//   const rejectLink = `http://localhost:8080/reject-request?donorEmail=${donorEmail}`;

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Blood Donation Request</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f4f4f4;
//           margin: 0;
//           padding: 0;
//         }
//         .container {
//           max-width: 600px;
//           margin: 20px auto;
//           background-color: #fff;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//         }
//         h1 {
//           color: #333;
//         }
//         p {
//           color: #555;
//         }
//         .button {
//           display: inline-block;
//           padding: 10px 20px;
//           margin: 10px 0;
//           font-size: 16px;
//           color: #fff;
//           text-decoration: none;
//           border-radius: 5px;
//         }
//         .accept {
//           background-color: #28a745;
//         }
//         .reject {
//           background-color: #dc3545;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>Blood Donation Request</h1>
//         <p>Dear Donor,</p>
//         <p>We hope this message finds you well. We have received a request for blood donation from a patient in need. Your willingness to donate blood can make a significant difference in someone's life.</p>
//         <p><strong>Patient Name:</strong> ${patientName}</p>
//         <p><strong>Your Address:</strong> ${donorAddress}</p>
//         <p>We encourage you to consider this request and help save a life. Your generosity and compassion are greatly appreciated.</p>
//         <p>Please choose one of the options below:</p>
//         <a href="${acceptLink}" class="button accept">Accept Request</a>
//         <a href="${rejectLink}" class="button reject">Reject Request</a>
//         <p>Thank you for your support and kindness.</p>
//         <p>Sincerely,<br>Heart2Help Team</p>
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     await transporter.sendMail({
//       from: 'heart2helpindia@gmail.com',
//       to: donorEmail,
//       subject: 'Blood Donation Request',
//       html: htmlContent,
//     });
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: 'Failed to send email' });
//   }
// });

// app.get('/accept-request', (req, res) => {
//   const { donorEmail } = req.query;
//   // Handle the logic for accepting the request
//   res.send('Thank you for accepting the blood donation request.');
// });

// app.get('/reject-request', (req, res) => {
//   const { donorEmail } = req.query;
//   // Handle the logic for rejecting the request
//   res.send('You have rejected the blood donation request.');
// });

// const sendEmails = () => {
//   db.query("SELECT * FROM email_notifications WHERE is_sent = FALSE", (err, results) => {
//       if (err) {
//           console.error("Error fetching email notifications:", err);
//           return;
//       }

//       results.forEach(notification => {
//           const mailOptions = {
//               from: "heart2helpindia@gmail.com",
//               to: notification.email,
//               subject: notification.subject,
//               text: notification.message
//           };

//           transporter.sendMail(mailOptions, (error, info) => {
//               if (error) {
//                   console.error(`Error sending email to ${notification.email}:`, error);
//               } else {
//                   console.log(`Email sent to ${notification.email}:`, info.response);

//                   // Mark the notification as sent
//                   db.query(
//                       "UPDATE email_notifications SET is_sent = TRUE WHERE id = ?",
//                       [notification.id],
//                       (err) => {
//                           if (err) {
//                               console.error("Error updating email notification status:", err);
//                           }
//                       }
//                   );
//               }
//           });
//       });
//     })
//   }
      

//   setInterval(sendEmails, 50000); // Every 50 seconds

app.listen(PORT, () => {
  console.log(`App is started at ${PORT}`);
});
