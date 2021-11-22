const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const jwtGenerator = require("../utils/jwtGenerator");

// register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email exists
    const emailExist = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );
      //console.log(emailExist.rows[0])
    if (emailExist.rows.length !== 0) {
      return res.status(401).send({ message: "User already exists!" });
    }

    // Encrypt password using bcrypt
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    // Creating new user
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
      [username, email, hashedPassword]
    );

    // Generate token
    const token = jwtGenerator(newUser.rows[0].id);
    res.json({ token: token });
  } catch (error) {
    res.status(500).json("Something went wrong.!");
  }
  // res.json(newUser.rows[0]);
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    email,
  ]);
  if (user.rows.length === 0) {
    return res.status(400).json({ message: "User doesn't exist" });
  }

  // Check password
  const passDidMatch = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );
  if (!passDidMatch) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  //   res.json(user.rows[0]);
  // Generate token
  const token = jwtGenerator(user.rows[0].id);
  res.json({ token: token });
});

module.exports = router;
