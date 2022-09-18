import express from 'express';
import { PrismaClient } from '@prisma/client';
import convertHourStringToMinutes from './utils/convert-hour-string-to-minutes';
import convertMinutesToHourString from './utils/convert-minutes-to-hour-string';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.listen(8080);

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.json(games);
});

app.post('/games/:id/ads', async (req, res) => {
  const gameId: any = req.params.id;
  const body: any = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      hourStart: convertHourStringToMinutes(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
    },
  });

  return res.json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res.json(
    ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }))
  );
});

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },

    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});
