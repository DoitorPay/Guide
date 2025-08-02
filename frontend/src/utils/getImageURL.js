export const getImageURL = async ({ reason, gid, userId, userSns, punish_id }) => {
  const payload = { reason };

  if (reason === 'groupProfile' && gid) {
    payload.gid = gid;
  } else if (reason === 'userProfile' && userId && userSns) {
    payload.userId = userId;
    payload.userSns = userSns;
  } else if (reason === 'punish' && punish_id) {
    payload.punish_id = punish_id;
  }

  try {
    const res = await fetch('http://13.209.6.223:8080/downloads/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.text();

    if (!res.ok || data.includes('잘못된 요청')) {
      console.error('[getImageURL] presigned URL 요청 실패:', data);
      return '';
    }

    return data; // presigned URL 그대로 반환
  } catch (err) {
    console.error('[getImageURL 오류]', err);
    return '';
  }
};
