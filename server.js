require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models"); // Import database models
const sequelize = require("./models/index").sequelize; // Adjust path if necessary
const recipeRoutes = require("./routes/recipeRoutes");


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const userAuth = require("./routes/userAuth");
const chefAuth = require("./routes/chefAuth");
const userRoutes = require("./routes/userRoutes");
const chefRoutes = require("./routes/chefRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");
const instructionRoutes = require("./routes/instructionRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cuisineRoutes = require("./routes/cuisineRoutes");
const likeRoutes = require("./routes/likeRoutes");
const savedRecipeRoutes = require("./routes/savedRecipeRoutes");
const followerRoutes = require("./routes/followerRoutes");
const setupSwagger = require("./swagger");

app.use("/uploads", express.static("uploads"));


// Setup Swagger API Docs
setupSwagger(app);


// Use Routes
app.use("/api/followers", followerRoutes);


// Use Routes
app.use("/api/saved-recipes", savedRecipeRoutes);


// Use Routes
app.use("/api/likes", likeRoutes);


// Use Routes
app.use("/api/cuisines", cuisineRoutes);

app.use("/api/chefauth",chefAuth);


// Use Routes
app.use("/api/categories", categoryRoutes);


// Use Routes
app.use("/api/instructions", instructionRoutes);


// Use Routes
app.use("/api/ingredients", ingredientRoutes);


// Use Routes
app.use("/api/chefs", chefRoutes);

app.use("/api/auth",userAuth);
app.use("/api/auth/chef",chefAuth);



// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);


// Default Route
app.get("/", (req, res) => {
  res.send("Recipe Finder API is running!");
});

// Start Server
app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  console.log(`Server running on port ${PORT}`);
});
