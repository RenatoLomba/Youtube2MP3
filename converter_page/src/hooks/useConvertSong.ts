import { useState } from 'react';
import { api } from '../lib/axios/api';

type SongData = {
  song_title: string;
  song_link: string;
};

type ConvertResponseSuccess = SongData & {
  success: true;
};

type ConvertResponseError = {
  success: false;
  message: string;
};

type ConvertResponse = ConvertResponseError | ConvertResponseSuccess;

export const useConvertSong = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<SongData>(undefined);

  const convertSong = async (videoId: string) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage('');
    setData(undefined);

    try {
      const { data } = await api.post<ConvertResponse>('/convert-mp3', {
        videoId,
      });

      if (data.success === false) {
        setIsError(true);
        setErrorMessage(data.message);
        return;
      }

      setIsSuccess(true);
      setData({ song_link: data.song_link, song_title: data.song_title });
    } catch (ex) {
      setIsError(true);
      setErrorMessage(ex.response?.data?.error?.message || ex.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { convertSong, isSuccess, isError, errorMessage, isLoading, data };
};
