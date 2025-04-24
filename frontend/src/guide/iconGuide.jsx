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
        navigator.clipboard.writeText(path)
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
            <p className="cmp-channel">📂 경로: @/public/icons/</p>
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

            {/* <style jsx>{`
                .icon-guide {
                    display: flex;
                    flex-wrap: wrap;
                    gap: calc(10 / 16 * 1rem);
                    margin-top: 20px;
                }
                
                .icon-item {
                    flex: 0 0 auto;
                }
                
                .icon-box {
                    width: calc(150 / 16 * 1rem);
                    height: calc(150 / 16 * 1rem);
                    border: solid 1px #e0e0e0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: calc(4 / 16 * 1rem);
                }
                
                .icon-display {
                    height: calc(40 / 16 * 1rem);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: calc(8 / 16 * 1rem);
                }
                
                .icon-display img {
                    max-width: 100%;
                    max-height: 100%;
                }
                
                .icon-name {
                    text-align: center;
                    margin-bottom: 8px;
                    word-break: break-word;
                }
                
                .copy-btn {

                    padding: 4px 8px;
                    background-color:rgb(205, 205, 205);
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                
                .copy-btn:hover {
                    background-color: #e0e0e0;
                }
            `}</style> */}
        </div>
    );
}