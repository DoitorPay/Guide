export const uploadImage = async ({ file, type = 'group-profile' }) => {
  const formData = new FormData();
  formData.append('file', file);

  let endpoint = '';
  switch (type) {
    case 'group-profile':
      endpoint = '/uploads/group-profile';
      break;
    case 'user-profile':
      endpoint = '/uploads/user-profile';
      break;
    case 'punish-feed':
      endpoint = '/uploads/punish-feed';
      break;
    default:
      throw new Error('유효하지 않은 업로드 타입');
  }

  try {
    const res = await fetch(`http://13.209.6.223:8080${endpoint}`, {
      method: 'POST',
      body: formData,
    });
    const url = await res.text();
    return url;
  } catch (err) {
    console.error('이미지 업로드 실패:', err);
    return '';
  }
};
