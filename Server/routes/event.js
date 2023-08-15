var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const EventModel = require("../models/event_model");
const fs = require("fs"); // Import the fs module

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./eventPosters");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.get("/", async (req, res) => {
  try {
    let events = await EventModel.find();

    res.status(200).json(events);
    console.log(events);
  } catch (error) {
    console.log("Error retrieving events:", error);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
});

router.post("/saveevent", upload.single("poster"), async (req, res) => {
  console.log("files:", req.files);

  const { title } = req.body;
  const poster = req.file.filename; // Hämta filnamnet för den sparade bilden
  const link = req.body.link;


  console.log("link:", link);
  console.log(poster);

  try {
    const newEvent = await EventModel.create({
      poster: poster,
      title: title,
      link: link,
    });

    console.log("newEvent", newEvent);

    res.status(201).json(newEvent);
  } catch (error) {
    console.log("Error saving movie:", error);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

router.get("/image/:name", (req, res) => {
  const imageName = req.params.name;
  console.log("NAME:", imageName);
  res.sendFile(imageName, { root: path.join("./eventPosters") });
});

router.post("/deleteevent", async (req, res) => {
  const { eventId, eventName } = req.body;

  console.log("eventId:", eventId, "eventName:", eventName);

  try {
    await EventModel.findByIdAndRemove(eventId);

    fs.unlinkSync(path.join("./eventPosters", eventName));

    console.log("Event deleted successfully!");

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Failed to delete event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
