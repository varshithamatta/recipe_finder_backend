require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const { sequelize } = require("./models"); // Ensure correct Sequelize import
const recipeRoutes = require("./routes/recipeRoutes");
const app = express();
const PORT = process.env.PORT || 9001;
const path = require('path');

const cors = require('cors');

// Allow both local and Railway frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://reactcrudcooknest-production.up.railway.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));



app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
    await sequelize.sync(); // Ensures models are synced with DB
    console.log("✅ Database connected and synced successfully!");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});

