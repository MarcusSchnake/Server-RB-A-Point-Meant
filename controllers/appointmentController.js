const Express = require("express");
const { UniqueConstraintError } = require("sequelize");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const {AppointmentModel} = require("../models");

// let appointmentDateTime = Math.round(new Date().getTime()/1000)

/*
======================
    Create a Post
======================

*/
router.post("/create", validateJWT, async (req, res) => {
  const { client_name, phone, date, time, note, email } =
    req.body.appointment;
  const { id } = req.user;
 
  // console.log(appointmentDateTime);
 
  //Try function to check for overlapping times, if there is an overlap, return a decline message, get query start time between start time and end time

  // try {
  //   AppointModel.findOne({
  //     where: {
  //       id: id,
  //       date: date, 
  //       time: time,
  //     },
  //   });

  // } catch (err) {
  //    if (err instanceof UniqueConstraintError) {

  //     res.status(409).json({
  //       message: "Appointment time already booked.",
  //     });
  //   } else {
  //     res.status(500).json({
  //       message: "Appointment Error.",
  //     });
  //   }
  // }

  

  try {
    const newAppointment = await AppointmentModel.create({
      client_name,
      phone,
      date,
      time,
      note,
      owner_id: id,
      email: email,
    });
    res.status(201).json({
      message: "Appointment set!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/*
========================================
   Get All Appointments for a User
========================================
http://localhost:3000/art/
*/

router.get("/", validateJWT, async (req, res) => {
  try {
    const userAppointment = await AppointmentModel.findAll();
    res.status(200).json(userAppointment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET ALL POSTS OF AN INDIVIDUAL USER
router.get("/user", validateJWT, async (req, res) => {
  const { id } = req.user;

  try {
    const userAppointment = await AppointmentModel.findAll({
      where: {
        owner_id: id,
      },
    });
    res.status(200).json(userAppointment);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
===============================
   Update a post by a user
===============================
http://localhost:3000/art/update/:entryid
*/
router.put("/update/:entryId", validateJWT, async (req, res) => {
  const { client_name, phone, email, date, time, note } =
    req.body.appointment;
  const appointmentId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: appointmentId,
      owner_id: userId,
    },
  };
  const updatePost = {
    client_name: client_name,
     phone: phone, 
     email: email,  
     date: date,
      time: time,
      note: note,
  };
  try {
    const update = await AppointmentModel.update(updateAppointment, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
========================================
   Delete Individual Post of a User
========================================
http://localhost:3000/art/:id
*/
router.delete("/:id", validateJWT, async (req, res) => {
  const ownerId = req.user.id;
  const appointmentId = req.params.id;

  try {
    const query = {
      where: {
        id: appointmentId,
        owner_id: ownerId,
      },
    };

    await AppointmentModel.destroy(query);
    res.status(200).json({ message: "Appointment Canceled" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;