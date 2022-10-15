import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = require("express").Router();

const prisma = new PrismaClient({ log: ["query", "error"] });

router.get("/api/getSaved", async (req: Request, res: Response) => {
  const saved = await prisma.savedDates.findMany({});

  res.json(saved);
});

router.post(
  "/api/saveDate",
  body([
    "title",
    "date",
    "high",
    "low",
    "weather",
    "story",
    "photoSrc",
  ]).isAscii(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await prisma.savedDates.create({
      data: {
        title: req.body.title,
        date: new Date(req.body.date),
        high: req.body.high,
        low: req.body.low,
        weather: req.body.weather,
        story: req.body.story,
        photoSrc: req.body.photoSrc,
      },
    });

    res.json(data);
  }
);



router.delete("/api/deleteDate/:id", async (req: Request, res: Response) => {
  
  try {
    const deletedPost = await prisma.savedDates.delete({
      where: {
        id: req.params.id
      }
    })
  
      res.json(deletedPost)
  } catch(error) {
    res.status(404).json(error)
  }
 

})

module.exports = router