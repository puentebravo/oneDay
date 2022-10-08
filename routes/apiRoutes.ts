const { PrismaClient } = require("@prisma/client")
const router = require("express").Router();


const prisma = new PrismaClient({log: ['query', 'error']})

