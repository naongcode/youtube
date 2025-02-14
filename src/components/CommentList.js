// CommentList.js
import React, { useMemo } from 'react';
import { timeAgo } from '../utils/VideoFunctions.js';

const CommentList = ({ commentList }) => {
  const optimizedComments = useMemo(() => {
    return commentList.map((comment) => (
      <div className="video_comment_section" key={comment.id}>
        <div className="channel_logo">
          <span>
            <img
              src={comment.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
              alt="comment_profile"
            />
          </span>
        </div>
        <div className="video_comment_data">
          <div className="comment_data_header">
            <span>{timeAgo(comment.snippet?.topLevelComment?.snippet?.updatedAt)}</span>
            <span>{comment.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
          </div>
          <div
            className="comment_data_text"
            dangerouslySetInnerHTML={{
              __html: comment.snippet?.topLevelComment?.snippet?.textDisplay,
            }}
          ></div>
        </div>
      </div>
    ));
  }, [commentList]);

  return <div className="video_comment">{optimizedComments}</div>;
};

export default CommentList;
