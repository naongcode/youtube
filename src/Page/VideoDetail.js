import React, { useEffect, useState } from 'react'
import { getChannelData, getCommentData, getVideoData } from '../api.js'
import './VideoDetail.css'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { RxDividerVertical } from 'react-icons/rx';
import { PiScissorsLight, PiShareFatLight } from 'react-icons/pi';
import { IoIosMore } from 'react-icons/io';
import { GiSaveArrow } from 'react-icons/gi';
import { CiBookmark } from 'react-icons/ci';
import { useParams } from 'react-router-dom';
import { formatViews, timeAgo } from '../utils/VideoFunctions.js';

export default function VideoDetail() {
  const {videoId} = useParams();
  const [descriptionIsHidden,setDesciptionHidden] = useState(true);
    const [videoData,setVideoData] = useState([]);
    const [channelData,setChannelData] = useState([]);
    const [commentList,setCommentList] = useState([]);
    useEffect(() => {
        async function fetchVideos() {
          try {
            const data = await getVideoData(videoId); // 비동기 API 호출
            setVideoData(data.items[0]);
            fetchChannel(data.items[0].snippet?.channelId);
          } catch (error){}
        }
        async function fetchChannel(channelId) {
            try {
              const data = await getChannelData(channelId); // 비동기 API 호출
              setChannelData(data.items[0]);
            } catch (error){}
          }
        fetchVideos();
        async function fetchComments() {
          try {
            const data = await getCommentData(videoId); // 비동기 API 호출
            console.log(data);
            setCommentList(data.items);
          } catch (error){}
        }
      fetchVideos();
        fetchComments();
      },[]);
    return (
    <div className='video_container'>
        {/* 왼쪽 */}
        <div className='video_section'>
          <div className='video_player'>
          <iframe id="ytplayer" type="text/html" width="1500" height="1000" title='test'
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`}
      frameborder="0"/>
          </div>

        {/* 타이틀 */}
        <div className='video_title'>
        <h3>{videoData.snippet?.localized?.title}</h3>
        </div>
        <div className='video_detail'>
            {/* 채널명 > 구독, 좋아요, 공유, 더보기 */}
            <div className='channel_detail'>
              <div className='channel_info'>
                <div className='channel_logo'>
                      <img src={channelData.snippet?.thumbnails?.default?.url} alt='channel_image'/>
                  </div>
                  <div className='channel_description'>
                      <span className='channel_title'>{channelData.snippet?.title}</span>
                      <span className='channel_subscription_count'>구독자 {channelData.statistics?.subscriberCount}</span>
                  </div>
              </div>
                <div className='channel_subscription'>
                  <button>구독</button>
                </div>
            </div>
            <div className='video_function'>
              <div className='video_likes'>
                  <AiOutlineLike/>
                  {formatViews(videoData.statistics?.likeCount)}
                  <RxDividerVertical/>
                  <AiOutlineDislike/>
              </div>
              <div><PiShareFatLight/>공유</div>
              {/* 화면에 따라 숨겨야 할것 */}
              <div className='hide_first'><GiSaveArrow/>오프라인 저장</div>
              <div className='hide_first'><PiScissorsLight/>클립</div>
              <div className='hide_last'><CiBookmark/>저장</div>
              <div className="hide_last"><IoIosMore/></div>
            </div>

        </div>
        {/* 설명 */}
        <div className='video_description'>
        <div className='video_description_header'>
        <span>조회수 {(formatViews(videoData.statistics?.viewCount))}</span>
        <span>{timeAgo(videoData.snippet?.publishedAt)}</span>
        </div>
          <div className={`video_description_content ${descriptionIsHidden && "hidden"}`}>
          {videoData.snippet?.description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))}
          </div>

        <button className="video_description_toggle"onClick={()=>{setDesciptionHidden((prev)=>!prev)}}>{descriptionIsHidden ? "더보기" : "간략히"}</button>
        </div>
        <div className='video_comment'>
          {
            commentList.map(comment=>(
              <div  className="video_comment_section" key={comment.id}>
                <div className='channel_logo'>
                <span><img src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt='comment_profile'></img></span>
                  </div>
                <div className='video_comment_data'>
                  <div className='comment_data_header'>
                  <span>{timeAgo(comment.snippet?.topLevelComment?.snippet?.updatedAt)}</span>
                  <span>{comment.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
                </div>
                <div className='comment_data_text' dangerouslySetInnerHTML={{__html:comment.snippet?.topLevelComment?.snippet?.textDisplay}}>
                  </div>
                </div>

              </div>
            ))
          }
        </div>
        </div>
    </div>
  )

}
