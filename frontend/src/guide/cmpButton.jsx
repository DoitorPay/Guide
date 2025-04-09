import React from "react";
import Button from "@/components/button";

function cmpButton() {
    return (
        <div>
            <p>type: default</p>
            <Button buttonName="가이드"/>
            <Button buttonName="비활성" disabled />

            <br></br><br></br>
            <p>type: primary</p>
            <Button type="primary" buttonName="가이드"/>
            <Button type="primary" buttonName="비활성" disabled />
        </div>
    );
}

export default cmpButton;
