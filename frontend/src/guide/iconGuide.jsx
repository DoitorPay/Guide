import React, { useState, useEffect } from "react";

export default function IconGuide() {
    const [icons, setIcons] = useState([]);
    
    useEffect(() => {
        fetch('/icon.json')
            .then((response) => response.json())
            .then((data) => setIcons(data.icons))
            .catch((error) => console.error(`아이콘 데이터 불러오기 실패: ${error}`));
    }, []);

    const copyToClipboard = (path) => {
        // 경로에서 파일명만 추출 (마지막 '/' 이후의 문자열)
        const filename = path.substring(path.lastIndexOf('/') + 1);
        navigator.clipboard.writeText(filename)
            .then(() => {
                alert("복사 완료!")
            })
            .catch((err) => {
                console.error('복사 실패: ', err);
            });
    };
    return (
        <div className="inner-wrap">
            <div className="pub-guide">
            <p className="cmp-channel">📂 경로: /icons/</p>
                <div className="icon-guide">
                    {icons && icons.map((icon, index) => (
                        <div key={index} className="icon-guide__item">
                            <div 
                                className="box"
                                onClick={() => copyToClipboard(icon.path)}
                            >
                                <div className="display">
                                    <img src={icon.path.replace('@/public', '')} alt={icon.name} />
                                </div>
                                <div className="name">{icon.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}