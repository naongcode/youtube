import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList.js';
import axios from 'axios';
import './RelatedVideos.css';

export default function RelatedVideos({ tag, originVideoId }) {
  const [videos, setVideos] = useState([]);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const getRelatedVideos = useCallback(
    async (keyword) => {
      try {
        const searchResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              type: 'video',
              q: keyword,
              key: API_KEY,
              maxResults: 10,
              order: 'viewCount',
              videoEmbeddable: 'true',
              videoSyndicated: 'true',
            },
          }
        );

        const filteredVideos = searchResponse.data.items.filter(
          (item) =>
            item.id.kind === 'youtube#video' &&
            item.id.videoId !== originVideoId
        );

        if (filteredVideos.length === 0) return;

        const videoIds = filteredVideos
          .map((item) => item.id.videoId)
          .join(',');

        const detailResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/videos',
          {
            params: {
              part: 'statistics',
              id: videoIds,
              key: API_KEY,
            },
          }
        );

        const videosWithDetails = filteredVideos.map((item) => ({
          ...item,
          statistics:
            detailResponse.data.items.find(
              (detail) => detail.id === item.id.videoId
            )?.statistics || {},
        }));

        setVideos(videosWithDetails);
        console.log('최적화된 결과:', videosWithDetails);
      } catch (e) {
        console.error('API 호출 에러:', e.response?.data || e.message);
      }
    },
    [API_KEY, originVideoId]
  );

  useEffect(() => {
    if (tag) getRelatedVideos(tag);
  }, [tag, getRelatedVideos]);

  return (
    <div className='related-container'>
      {videos.map((video) => (
        <Link key={video.id.videoId} to={`/watch/${video.id.videoId}`}>
          <MovieList
            video={video}
            profileImage={video.snippet.thumbnails.default.url}
          />
        </Link>
      ))}
    </div>
  );
}
