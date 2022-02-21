const Express = require("express");
const { UniqueConstraintError } = require("sequelize");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const {ToDoModel} = require("../models");


/*
======================
    Create a ToDo
======================

*/
router.post("/create", validateJWT, async (req, res) => {
  const { subject, todo_item, appointmentId } = req.body.todo_item;
//   const { id } = req.user;
 
  try {
    const newToDo = await ToDoModel.create({
      subject,
      todo_item,
      appointmentId,
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
    
    const todo_item = await ToDoModel.findAll({

    });
    res.status(200).json(todo_item);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// get on todo by id
router.get("/:id", validateJWT, async (req, res) => {
  const id = req.params.id
  
  try {
    const todo_item = await ToDoModel.findOne({
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

  console.log(id)
  try {
    const todo_item = await ToDoModel.findAll({
      where: {
        appointmentId:id,
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
    const update = await ToDoModel.update(updateToDo, query);
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

    await ToDoModel.destroy(query);
    res.status(200).json({ message: "Todo Deleted!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;