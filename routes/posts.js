const router = require("express").Router();
const pool = require("../db");
const jwtverify = require("../middleware/jwtverify");

// Create
router.post("/", jwtverify, async (req, res) => {
  const { desc, title, categories, picture } = req.body;
  try {
    const newPost = await pool.query(
      "INSERT INTO posts (post_title, post_desc, categories, userID, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, desc, categories, req.user, picture]
    );
    res.status(200).json("Post created successfully...");
  } catch (error) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", jwtverify, async (req, res) => {
  let { title, desc, photo } = req.body;
  try {
    const postExist = await pool.query(
      "SELECT * FROM posts WHERE id = $1 and userid = $2",
      [req.params.id, req.user]
    );
    console.log(postExist)
    // console.log(postExist)
    if (postExist.rows.length === 0) {
      return res.status(500).json("Post doesn't exist");
    }

    !title && (title = postExist.rows[0].post_title);
    !desc && (desc = postExist.rows[0].post_desc);
    !photo && (photo = postExist.rows[0].photo);

    try {
      console.log(req.body)
      const updatePost = await pool.query(
        "UPDATE posts SET post_title = $1, post_desc = $2, photo = $3 WHERE id = $4 AND userid = $5 RETURNING *",
        [title, desc, photo, req.params.id, req.user]
      );

      res.status(200).json("Post edited successfully...");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete
router.delete("/:id", jwtverify, async (req, res) => {
  try {
    const deleteUser = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND userid = $2",
      [req.params.id, req.user]
    );
    res.status(200).json("Post deleted successfully..");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await pool.query(
      "SELECT * FROM posts INNER JOIN users ON posts.userId = users.id WHERE posts.id = $1",
      [req.params.id]
    );
    const {user_password, user_email, ...others} = post.rows[0]
    console.log(others)
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all post
router.get("/", jwtverify, async (req, res) => {
  const username = req.query.user;
  const cat = req.query.cat;
  try {
    let post;
    if (username && cat) {
      post = await pool.query(
        `SELECT * FROM posts INNER JOIN users ON posts.userId = users.id WHERE users.user_name = $1 AND $2 = ANY (posts.categories)`,
        [username, cat]
      );
    } else if (username) {
      post = await pool.query(
        `SELECT * FROM posts INNER JOIN users ON posts.userId = users.id WHERE users.user_name = $1`,
        [username]
      );
    } else if (cat) {
      post = await pool.query(
        `SELECT * FROM users INNER JOIN posts ON posts.userId = users.id WHERE $1 = ANY (posts.categories)`,
        [cat]
      );
    } else {
      post = await pool.query("SELECT * FROM posts");
      return res.status(200).json(post.rows);
    }
    const posts = [];
    post.rows.forEach((item) => {
      posts.push({
        id: item.id,
        post_title: item.post_title,
        post_desc: item.post_desc,
        photo: item.photo,
        categories: item.categories,
        user_name: item.user_name,
        createdat: item.createdat,
        profile_pic: item.profile_pic,
      });
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
