import express from "express"
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const fetch = require("node-fetch")
import * as dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

const prisma = new PrismaClient({ log: ["query", "error"] });

router.get("/api/getSaved", async (req: Request, res: Response) => {
  const saved = await prisma.savedDates.findMany({});

  res.json(saved);
});

router.get("/api/getLocalWeather/:lat/:lon", async (req: Request, res: Response) => {
  const localWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${req.params.lat}&lon=${req.params.lon}&units=metric&appid=${process.env.API_KEY}`)

  const data = await localWeather.json()
  console.log("Route: getLocalWeather reached")
  res.json(data)
})

router.get("/api/getTargetWeather/:city", async (req: Request, res: Response) => {
  const cityName = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&limit=1&appid=${process.env.API_KEY}`)

  const cityData = await cityName.json()

  const coords = {
    lat: cityData[0].lat,
    lon: cityData[0].lon
  }

  const targetWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${process.env.API_KEY}`)

  const targetData = await targetWeather.json()

  console.log("Route: getTargetWeather reached")
  res.json(targetData)

})

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

    console.log("Route: saveDate reached")
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
      console.log("Route: Delete Date reached")
      res.json(deletedPost)
  } catch(error) {
    res.status(404).json(error)
  }
 

})

module.exports = router