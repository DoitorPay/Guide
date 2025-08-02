export const uploadImage = async ({ file, type, userId, userSns, groupId, punishId }) => {
  const formData = new FormData();

  // 공통 필드: 파일
  formData.append('image', file);

  // 타입별로 요구 파라미터 추가
  switch (type) {
    case 'user-profile':
      if (!userId || !userSns) {
        console.error('user-profile 업로드에 필요한 userId 또는 userSns 누락');
        return null;
      }
      formData.append('userId', userId);
      formData.append('userSns', userSns);
      break;

    case 'group-profile':
      if (!groupId) {
        console.error('group-profile 업로드에 필요한 groupId 누락');
        return null;
      }
      formData.append('groupId', groupId);
      break;

    case 'punish-feed':
      if (!userId || !userSns || !groupId || !punishId) {
        console.error('punish-feed 업로드에 필요한 필드 누락');
        return null;
      }
      formData.append('userId', userId);
      formData.append('userSns', userSns);
      formData.append('groupId', groupId);
      formData.append('punishId', punishId);
      break;

    default:
      console.error('유효하지 않은 업로드 타입:', type);
      return null;
  }

  // 엔드포인트 결정
  const endpoint = `/uploads/${type}`;

  try {
    const res = await fetch(`http://13.209.6.223:8080${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      console.error(`이미지 업로드 실패: ${res.status}`);
      return null;
    }

    const responseData = await res.json();
    // responseData가 { url: '...'} 형태라고 가정
    return responseData.url || null;
  } catch (err) {
    console.error('이미지 업로드 실패:', err);
    return null;
  }
};
