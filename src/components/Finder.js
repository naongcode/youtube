import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList.js';
import './Finder.css';

//동영상 제목의 특수문자 제거 
const decodeEntities = (str) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};

export default function Finder() {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!searchTerm) return;

      try {
        //검색어로 동영상 목록 가져오기
        const searchResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              q: searchTerm,
              key: API_KEY,
              maxResults: 20,
              type: 'video',
            },
          }
        );

        const videoIds = searchResponse.data.items
          .map((item) => item.id?.videoId)
          .filter(Boolean)
          .join(',');

        const channelIds = [
          ...new Set(
            searchResponse.data.items.map((item) => item.snippet.channelId)
          ),
        ]; // 중복 제거

        if (!videoIds || channelIds.length === 0) {
          setVideos([]);
          setLoading(false);
          return;
        }

        // 동영상의 정보들 가져오기
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

        //채널 프로필 가져오기
        const channelResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/channels',
          {
            params: {
              part: 'snippet',
              id: channelIds.join(','),
              key: API_KEY,
            },
          }
        );

        //채널과 ID 매핑
        const channelMap = {};
        channelResponse.data.items.forEach((channel) => {
          channelMap[channel.id] =
            channel.snippet.thumbnails?.default?.url ||
            'https://via.placeholder.com/48';
        });

        const videosWithDetails = searchResponse.data.items.map((item, index) => ({
          ...item,
          statistics: detailResponse.data.items[index]?.statistics || {},
          channelProfileImage: channelMap[item.snippet.channelId],
          snippet: {
            ...item.snippet,
            title: decodeEntities(item.snippet.title), //동영상의 특수문자 제거
          }
        }));

        setVideos(videosWithDetails);
      } catch (error) {
        console.error('오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchTerm, API_KEY]);

  return (
    <div className='finder'>
      {loading ? (
        <p>검색 중...</p>
      ) : videos.length > 0 ? (
        <ul className='movie-list'>
          {videos.map((video) => {
            const videoId = video.id?.videoId;
            if (!videoId) return null;

            return (
              <li key={videoId} className='movie-item'>
                <Link to={`/watch/${videoId}`}>
                  <MovieList
                    video={video}
                    profileImage={video.channelProfileImage}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
