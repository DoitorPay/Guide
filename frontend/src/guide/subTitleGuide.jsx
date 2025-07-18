import React from 'react';
import SubTitle from '@/components/subtitle/subTitle';

const SubTitleGuide = () => {
  return (
    <div>
      <SubTitle title="기본" />
      <SubTitle title="타입='link' 아이콘 변경 가능" type="link"
        link="/study"
        linkIcon="arrow-bottom"
        more='more'
      />
      <SubTitle title="타입='desc'" type="desc" desc="7일 연속 불타는 중🔥(상황에 따라 다른 말) " />
      <SubTitle title="타입='date'" type="date" />
      <SubTitle title="타입='week'" type="week" />
      <SubTitle title="타입='info'" type="info" info="면제 카드 2장" />
    </div>
  );
};

export default SubTitleGuide;
