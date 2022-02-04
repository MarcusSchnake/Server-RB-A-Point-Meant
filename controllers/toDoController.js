const Express = require("express");
const { UniqueConstraintError } = require("sequelize");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const {ToDo} = require("../models");


/*
======================
    Create a ToDo
======================

*/
router.post("/create", validateJWT, async (req, res) => {
  const { subject, todo_item, apptId } = req.body.todo;
//   const { id } = req.user;
 
  try {
    const newToDo = await ToDo.create({
      subject,
      todo_item,
      apptId
    });
    res.status(201).json({
      message: "To Do Item Created!",
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
    const todo_item = await ToDo.findAll();
    res.status(200).json(todo_item);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET ALL TODO'S OF AN INDIVIDUAL USER
router.get("/:id", validateJWT, async (req, res) => {
  const id = req.params.id
  
  try {
    const todo_item = await ToDo.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(todo_item);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
//pulls all todo by appointment ID aka apptId.
router.get("/appt/:id", validateJWT, async (req, res) => {
  const id = req.params.id;
  // const { id } = req.user;

  try {
    const todo_item = await ToDo.findAll({
      where: {
        apptId:id,
      },
    });
    res.status(200).json(todo_item);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*
===============================
   Update a todo by a user
===============================
http://localhost:3000/art/update/:entryid
*/
router.put("/:id", validateJWT, async (req, res) => {
  const { subject, todo_item } =
    req.body.todo;
  const id = req.params.id;
  

  const query = {
    where: {
      id,
    },
  };
  const updateToDo = {
    subject,
    todo_item
  };
  try {
    const update = await ToDo.update(updateToDo, query);
    res.status(200).json({message:"Todo is updated!"});
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
  const id = req.params.id;

  try {
    const query = {
      where: {
        id,
      },
    };

    await ToDo.destroy(query);
    res.status(200).json({ message: "Todo Deleted!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;