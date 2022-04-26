const datetime = (time: Date) => {
    const week = ["월", "화", "수", "목", "금", "토", "일"];
    const gmt = new Date(time);
    const year = gmt.getFullYear();
    const month = gmt.getMonth();
    const day = gmt.getDate();
    const today = new Date(`${year}-${month + 1}-${day}`).getDay();
    const weekLabel = week[today - 1];
    const minute = gmt.getMinutes();
    const gmtHour = gmt.getHours();
    const hour = gmtHour >= 13 ? gmtHour - 12 : gmtHour;
    const division = gmtHour >= 12 ? "오후" : "오전";

    return `${year}년 ${month + 1}월 ${day}일(${weekLabel}) ${division} ${hour}시 ${minute}분`;
};

export default datetime;
