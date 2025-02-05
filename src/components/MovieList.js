import React from 'react'
import './MovieList.css'

export default function MovieList({ video, profileImage }) {

  // 시간 변환 함수
  function timeAgo(publishedAt) {
    const now = new Date();
    const publishedDate = new Date(publishedAt);
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const timeUnits = [
      { unit: "년", seconds: 60 * 60 * 24 * 365 },
      { unit: "개월", seconds: 60 * 60 * 24 * 30 },
      { unit: "일", seconds: 60 * 60 * 24 },
      { unit: "시간", seconds: 60 * 60 },
      { unit: "분", seconds: 60 },
    ];

    for (const { unit, seconds } of timeUnits) {
      const amount = Math.floor(diffInSeconds / seconds);
      if (amount >= 1) {
        return `${amount}${unit} 전`;
      }
    }
    return "방금 전";
  }

  // 숫자 축약 함수
  function formatViews(views) {
    if (views >= 1_000_000_000) {
      return (views / 1_000_000_000).toFixed(1) + "억회";
    } else if (views >= 1_000_000) {
      return (views / 1_000_000).toFixed(1) + "백만회";
    } else if (views >= 10_000) {
      return (views / 10_000).toFixed(1) + "만회";
    } else if (views >= 1_000) {
      return (views / 1_000).toFixed(1) + "천회";
    } else {
      return views + "회";
    }
  }

  return (
    <div key={video.id} className="video-item">

      {/* 썸네일 */}
      <div className='video-thumbnail'>
        <img src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}></img>
      </div>

      <div className='video-information'>
        {/* 프로필 이미지 */}
        <div className='video-channelImage'>
          <img src={profileImage}
            alt="Profile"></img>
        </div>

        <div className='video-channelInfo'>
          {/* 제목 */}
          <div className='video-title'>{video.snippet.title}</div>

          {/* 채널명 */}
          <div className='video-channel'>{video.snippet.channelTitle}</div>

          {/* 조회수, 시간 */}
          <div className='video-count'>
            {formatViews(video.statistics.viewCount)}
            ·{timeAgo(video.snippet.publishedAt)}
          </div>

        </div>

      </div>

    </div>

  )
}
