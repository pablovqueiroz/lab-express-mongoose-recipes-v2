const express = require("express");
const logger = require("morgan");
const app = express();

const Recipe = require("./models/Recipe.model");
// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ...
// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
// app.post("/recipes", (req, res) => {
//   Recipe.create(req.body)
//     .then((newRecipe) => {
//       console.log("recipe added: ", newRecipe);
//       res.status(201).json(newRecipe);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: err });
//     });
// });

//irorhack solution
app.post("/recipes", (req, res) => {
    Recipe.create({
        title: req.body.title,
        instructions: req.body.instructions,
        level: req.body.level,
        ingredients: req.body.ingredients,
        image: req.body.image,
        duration: req.body.duration,
        isArchived: req.body.isArchived,
        created: req.body.created,
    })
    .then((newRecipe) => {
      console.log("recipe added: ", newRecipe);
      res.status(201).json(newRecipe);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
//with async awayt
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    console.log("Recipes: ", allRecipes);
    res.status(200).json(allRecipes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Error while getting all recipes" });
  }
});

// with .then() and .catch()
// app.get("/recipes", (req, res) => {
//   Recipe.find()
//     .then((allRecipes) => {
//       res.status(200).json(allRecipes);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Error while getting all recipes" });
//     });
// });

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

// app.get("/recipes/:id",(req, res)=>{
//     Recipe.findById(req.params.id)
//     .then((oneRecipe)=>{
//         console.log("Recipe: ", oneRecipe);
//         res.status(200).json(oneRecipe)
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Error while getting a single recipe" });
//     });
// });

//with async awayt
app.get("/recipes/:id", async (req, res) => {
  try {
    const oneRecipe = await Recipe.findById(req.params.id);
    console.log("Recipe: ", oneRecipe);
    res.status(200).json(oneRecipe);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: "Error while getting a single recipe" });
  }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findByIdAndUpdate(id, req.body, { new: true })
    .then((updatedRecipe) => {
      console.log("Recipe Updated: ", updatedRecipe);
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "Error while updating a single recipe" });
    });
});

//solution Ironhack
// app.put("/recipes/:id",(req, res)=>{
//     Recipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     .then((updatedRecipe)=> {
//         console.log("Recipe Updated: ", updatedRecipe);
//         res.status(200).json(updatedRecipe);
//     })
//      .catch((err) => {
//       console.log(err);
//       res.status(500).json({ errorMessage: "Error while updating a single recipe" });
//     });
// });

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
// app.delete("/recipes/:id", (req, res) => {
//   Recipe.findByIdAndDelete(req.params.id)
//     .then((deletedRecipe) => {
//       console.log("Recipe Deleted: ", deletedRecipe);
//       res.status(204).json(deletedRecipe);
//     })
//     .catch((err) => {
//       console.log(err);
//       res
//         .status(500)
//         .json({ errorMessage: "Error while deleting a single recipe" });
//     });
// });

//ironHack solution 
app.delete("/recipes/:id", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(204).send();
    })
    .catch((error)=>{
        res.status(500).json({errorMessage: "Error while deleting a single recipe"})
    })
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
