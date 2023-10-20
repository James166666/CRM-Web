import React from "react";
import './InputStyles.css';

function InputFormProfile({ inputTitle, inputContent, inputType, setInputContent, isEditing, isProfileEmail = false }) {

    const handleChange = (e) => {
        if (setInputContent) {
            setInputContent(e.target.value);
        }
    };

    return (
        <div className="mb-3">
            <label className="form-label">{inputTitle}</label>
            <input
                type={inputType}
                className="form-control input-profile"
                value={inputContent}
                onChange={handleChange}
                /* if input is ProfileEamil then cannit be edited */
                readOnly={!isEditing || isProfileEmail} 
            />
        </div>
    );
}

export default InputFormProfile;
