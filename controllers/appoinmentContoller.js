const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { PostModel } = require("../models");

/*
======================
    Create a Post
======================
http://localhost:3000/art/create
*/
router.post("/create", validateJWT, async (req, res) => {
  const { artist_name, url, description, style, era, for_sale, price } =
    req.body.post;
  const { id } = req.user;
  const email = req.email;

  const forSale = for_sale === "on" ? true : false;
  const priceInt = parseInt(price);
  console.log(priceInt);
  
  try {
    const newPost = await PostModel.create({
      artist_name,
      url,
      description,
      style,
      era,
      for_sale: forSale,
      price,
      owner_id: id,
      email: email,
    });
    res.status(201).json({
      message: "Post successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

/*
========================================
   Get All Posts 
========================================
http://localhost:3000/art/
*/

router.get("/", validateJWT, async (req, res) => {
  try {
    const userPosts = await PostModel.findAll();
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// GET ALL POSTS OF AN INDIVIDUAL USER
router.get("/user", validateJWT, async (req, res) => {
  const { id } = req.user;

  try {
    const userPosts = await PostModel.findAll({
      where: {
        owner_id: id,
      },
    });
    res.status(200).json(userPosts);
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
  const { artist_name, url, description, style, era, for_sale, price } =
    req.body.art;
  const postId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: postId,
      owner_id: userId,
    },
  };
  const updatePost = {
    artist_name: artist_name,
    url: url,
    description: description,
    style: style,
    era: era,
    for_sale: for_sale,
    price: price,
  };
  try {
    const update = await PostModel.update(updatePost, query);
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
  const postId = req.params.id;

  try {
    const query = {
      where: {
        id: postId,
        owner_id: ownerId,
      },
    };

    await PostModel.destroy(query);
    res.status(200).json({ message: "Art Entry Removed" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;