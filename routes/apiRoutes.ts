import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { GetObjectCommand, PutObjectCommand, RestoreObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/awsS3Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const fetch = require("node-fetch");
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const prisma = new PrismaClient({ log: ["query", "error"] });

router.get("/api/getSaved", async (req: Request, res: Response) => {
  const saved = await prisma.savedDates.findMany({});

  res.json(saved);
});

router.get(
  "/api/getLocalWeather/:lat/:lon/:units",
  async (req: Request, res: Response) => {
    const localWeather = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${req.params.lat}&lon=${req.params.lon}&units=${req.params.units}&appid=${process.env.API_KEY}`
    );

    const data = await localWeather.json();
    console.log("Route: getLocalWeather reached");
    res.json(data);
  }
);

router.get(
  "/api/getTargetWeather/:city/:units",
  async (req: Request, res: Response) => {
    const cityName = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${req.params.city}&limit=1&appid=${process.env.API_KEY}`
    );

    const cityData = await cityName.json();

    const coords = {
      lat: cityData[0].lat,
      lon: cityData[0].lon,
    };

    const targetWeather = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${req.params.units}&appid=${process.env.API_KEY}`
    );

    const targetData = await targetWeather.json();

    console.log("Route: getTargetWeather reached");
    res.json(targetData);
  }
);

router.get("/api/putSignedUrl", async (req: Request, res: Response) => {
  const putBucketParams = {
    Bucket: "oneday001",
    Key: `Photo_${new Date().toDateString().replaceAll(" ", "")}`,
    contentType: "image/*",
  };

  const command = new PutObjectCommand(putBucketParams);

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 30000,
  });

  console.log("SignedURL sent");
  console.log(putBucketParams.Key);
  res.json({
    fetchUrl: signedUrl,
    key: putBucketParams.Key,
  });
});

router.get("/api/getSignedUrl/:key", async (req: Request, res: Response) => {
  const getBucketParams = {
    Bucket: "oneday001",
    Key: req.params.key,
    contentType: "image/*",
  };

  const command = new GetObjectCommand(getBucketParams);

  const signedGetUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 30000,
  })

  console.log("GET SignedURL sent: ", signedGetUrl);
  console.log(getBucketParams.Key)
  res.json({
    fetchURL: signedGetUrl
  })
  
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
        date: req.body.date,
        high: req.body.high,
        low: req.body.low,
        weather: req.body.weather,
        story: req.body.story,
        photoSrc: req.body.photoSrc,
      },
    });

    console.log(data, "Route: saveDate reached");
    res.json(data);
  }
);

router.delete("/api/deleteDate/:id", async (req: Request, res: Response) => {
  try {
    const deletedPost = await prisma.savedDates.delete({
      where: {
        id: req.params.id,
      },
    });
    console.log("Route: Delete Date reached");
    res.json(deletedPost);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
