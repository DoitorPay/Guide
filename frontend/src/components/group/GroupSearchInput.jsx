import React, { useState } from "react";
import Input from "@/components/Input/input";
import MoreOption from "@/components/popupModal/moreOption"; // MoreOption 컴포넌트 임포트
import SearchIcon from "/icons/search-gray.svg"

const GroupSearchInput = ({ onSearch, onSortChange }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("latest"); // 기본값 '신규'
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false); // MoreOption 열림/닫힘 상태

    const sortOptions = [
        { value: "popularity", label: "추천" },
        { value: "latest", label: "신규" },
        { value: "relate", label: "연관" },
    ]; 

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleSortOptionClick = (value) => {
        setSortBy(value);
        if (onSortChange) {
            onSortChange(value);
        }
        setIsMoreOptionOpen(false); // 옵션 선택 후 MoreOption 닫기
    };

    const toggleMoreOption = () => {
        setIsMoreOptionOpen(!isMoreOptionOpen);
    };

    const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || "";

    const moreOptionSortOptions = sortOptions.map(option => ({
        label: option.label,
        onClick: () => handleSortOptionClick(option.value)
    }));

    return (
        <div className="group-search-input">
            <div className="search-box">
                <Input
                    type="text"
                    placeholder="검색"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    icon={<img src={SearchIcon} alt="화살표" className="svg-icon" />}
                />
            </div>
            <div className="sort-box" onClick={toggleMoreOption}>
                <span className="current-sort-label">{currentSortLabel}</span>
                <img src="/icons/arrow-bottom-gray.svg" alt="정렬" className="sort-arrow-icon" />
            </div>

            <MoreOption
                title="정렬 필터"
                options={moreOptionSortOptions}
                isOpen={isMoreOptionOpen}
                onClose={() => setIsMoreOptionOpen(false)}
            />
        </div>
    );
};

export default GroupSearchInput; 