import GroupCard from "@/components/group/GroupCard";
import GroupCardLarge from "@/components/group/GroupCardLarge";

const GroupCardDemo = () => {

  return (
    <div>
       <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>스타일링</h1>
      <GroupCard />
      <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>멤버, 미션 진행율, 마감일 까지 포함된 버전</h1>
      <GroupCardLarge />
    </div>
  );
};

export default GroupCardDemo;