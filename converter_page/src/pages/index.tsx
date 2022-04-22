import { FormEvent, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';

import styles from '../styles/Home.module.css';
import { useConvertSong } from '../hooks/useConvertSong';
import Head from 'next/head';

export default function Home() {
  const [videoId, setVideoId] = useState('');

  const { convertSong, data, errorMessage, isError, isLoading, isSuccess } =
    useConvertSong();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await convertSong(videoId);
  };

  return (
    <>
      <Head>
        <title>Youtube2MP3</title>
      </Head>
      <div className={styles['top-container']}>
        <form onSubmit={handleSubmit}>
          <h1>
            YouTube 2 MP3 Converter <FaYoutube />
          </h1>
          <h4>Enter the video ID</h4>
          <div>
            <input
              type="text"
              placeholder="Video ID"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
            />
            <button type="submit">Convert</button>
          </div>
        </form>
      </div>

      <div className={styles['bottom-container']}>
        {isLoading && <h1 style={{ color: 'darkgray' }}>Converting...</h1>}

        {isSuccess && (
          <div className={styles.success}>
            <p>{data?.song_title}</p>
            <a href={data?.song_link}>
              <button className={styles['download-btn']}>DOWNLOAD</button>
            </a>
          </div>
        )}

        {isError && (
          <div className={styles.errors}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}
