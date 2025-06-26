import React from 'react';
import SubTitle from '@/components/subTitle';

const SubTitleGuide = () => {
  return (
    <div>
      <SubTitle title="기본" />
      <SubTitle title="타입='link'" type="link" link="/groups" />
      <SubTitle title="타입='desc'" type="desc" desc="7일 연속 불타는 중🔥(상황에 따라 다른 말) " />
      <SubTitle title="타입='date'" type="date" />
    </div>
  );
};

export default SubTitleGuide;
