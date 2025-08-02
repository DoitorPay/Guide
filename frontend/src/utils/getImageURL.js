export const getImageURL = async ({ reason, userId, userSns, gid, punish_id }) => {
  try {
    const res = await fetch('http://13.209.6.223:8080/downloads/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason, 
        userId,
        userSns,
        gid,
        punish_id,
      }),
    });

    if (!res.ok) throw new Error('이미지 불러오기 실패');
    const imageUrl = await res.text();
    return imageUrl;
  } catch (err) {
    console.error('getImageURL 오류:', err);
    return ''; 
  }
};
