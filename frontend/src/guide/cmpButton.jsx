import React from "react";
import Button from "@/components/button";

function cmpButton() {
    return (
        <div>
            <p>여기에 타이틀을 작성하세요(예. main-type)</p>
            <Button buttonName="가이드"/>
            <Button buttonName="비활성" disabled="true" />

            <br></br>
            <p>여기에 타이틀을 작성하세요(예. sub-type)</p>
            <Button buttonName="가이드"/>
            <Button buttonName="비활성" disabled="true" />
        </div>
    );
}

export default cmpButton;
