import GroupCard from "@/components/group/GroupCard";
import GroupCardLarge from "@/components/group/GroupCardLarge";

const GroupCardDemo = () => {
   const dummyAvatars = [
    'https://i.pravatar.cc/24?img=1',
    'https://i.pravatar.cc/24?img=2',
    'https://i.pravatar.cc/24?img=3',
  ];

  return (
    <div>
       <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>스타일링</h1>
      <GroupCard />
      <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>멤버, 미션 진행율, 마감일 까지 포함된 버전</h1>
      <GroupCardLarge
       avatarList={dummyAvatars}
        members={5}
      />

       <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>
       종료된 그룹
      </h1>
      <GroupCardLarge
        avatarList={dummyAvatars}
        members={8}
        isFinished={true}
      />

    </div>
  );
};

export default GroupCardDemo;