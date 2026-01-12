module.exports = app => {
  const aingelusers = require("../controllers/aingeluser.controller.js");

  var router = require("express").Router();

  // Create a new AingelUser
  router.post("/", aingelusers.create);

  // Retrieve all AingelUsers 
  router.get("/", aingelusers.findAll);

  // Retrieve all published AingelUsers
  router.get("/published", aingelusers.findAllPublished);

  // Retrieve a single AingelUser with id
  router.get("/:id", aingelusers.findOne);

  // Update a AingelUser with id
  router.put("/:id", aingelusers.update);

  // Delete a AingelUser with id
  router.delete("/:id", aingelusers.delete);

  app.use('/api/aingelusers', router);
};
