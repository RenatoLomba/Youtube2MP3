import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';
import { responseError } from './utils/responseError';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

type ConvertResponse =
  | {
      status: 'fail' | 'processing';
      msg: string;
    }
  | {
      status: 'ok';
      title: string;
      link: string;
    };

const youtubeMP3Api = axios.create({
  baseURL: process.env.YOUTUBE_MP3_API_URL || '',
});

// CONVERT YOUTUBE VIDEO TO MP3 BASED ON YOUTUBE VIDEO ID
app.post('/convert-mp3', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId || !String(videoId).trim()) {
    return responseError(res, 'Please enter a video ID', 400);
  }

  const { YOUTUBE_MP3_API_KEY, YOUTUBE_MP3_API_HOST } = process.env;

  if (!YOUTUBE_MP3_API_KEY || !YOUTUBE_MP3_API_HOST) {
    return responseError(
      res,
      'Internal Server Error - API Credentials not configured',
    );
  }

  try {
    const { data } = await youtubeMP3Api.get<ConvertResponse>(
      `?id=${videoId}`,
      {
        headers: {
          'x-rapidapi-key': YOUTUBE_MP3_API_KEY,
          'x-rapidapi-host': YOUTUBE_MP3_API_HOST,
        },
      },
    );

    switch (data.status) {
      case 'fail':
        return res.json({
          success: false,
          message: data.msg,
        });
      case 'processing':
        return res.json({
          success: false,
          message: 'Video in processing',
        });
      case 'ok':
        return res.json({
          success: true,
          song_title: data.title,
          song_link: data.link,
        });
    }
  } catch (ex) {
    return responseError(
      res,
      ex.response?.data?.message || 'Internal Server Error',
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
