 export function timeAgo(publishedAt) {
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
export function formatViews(views) {
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