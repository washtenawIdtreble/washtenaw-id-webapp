import React from "react";
import "./SubmitLoadingIcon.css";

export const SubmitLoadingIcon = () => {
    return (<>
        <div className="lds-ring">
            <div className={"first"}/>
            <div className={"second"}/>
            <div className={"third"}/>
            <div/>
        </div>
    </>);
};
