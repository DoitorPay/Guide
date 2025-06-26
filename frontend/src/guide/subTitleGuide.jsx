import React from 'react';
import SubTitle from '@/components/subTitle';

const SubTitleGuide = () => {
  return (
    <div>
      <SubTitle title="기본" />
      <SubTitle title="타입='link'" type="link" link="/groups" />
      <SubTitle title="타입='desc'" type="desc" desc="그룹 내에서 지켜야 할 스터디 규칙을 정리해 보세요." />
    </div>
  );
};

export default SubTitleGuide;
