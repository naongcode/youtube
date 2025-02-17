import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList.js';
import './Finder.css';

export default function Finder() {
  const { searchTerm } = useParams(); // URL에서 검색어 가져오기
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!searchTerm) return; // 검색어가 없으면 return

      try {
        const searchResponse = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              part: 'snippet',
              q: searchTerm, // 검색어 기반으로 동영상 검색
              key: API_KEY,
              maxResults: 20,
              type: 'video',
            },
          }
        );

        const videoIds = searchResponse.data.items
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

        const videosWithDetails = searchResponse.data.items.map(
          (item, index) => ({
            ...item,
            statistics: detailResponse.data.items[index]?.statistics || {},
          })
        );

        setVideos(videosWithDetails); // 검색된 동영상과 통계 업데이트
      } catch (error) {
        console.error('오류:', error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchVideos();
  }, [searchTerm, API_KEY]); // 검색어가 변경될 때마다 동영상 검색


  return (
    <div className='finder'>
      {loading ? (
        <p>검색 중...</p>
      ) : videos.length > 0 ? (
        <ul className='movie-list'> 
          {videos.map((video) => (
            <li key={video.id.videoId} className='movie-item'>
              <Link to={`/watch/${video.id.videoId}`}>
                <MovieList
                  video={video}
                  profileImage={video.snippet.thumbnails.default.url}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
