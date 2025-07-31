import React, { useRef, useState } from "react";

const ImageUploader = (
  { name,
  label = "업로드 사진",
  required = true,
  onImageChange, }
) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageChange && onImageChange(true);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      onImageChange && onImageChange(false);
    }
  };

  return (
    <div className="upload-container" onClick={handleClick}>
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <div className="image-wrap">
        {preview ? (
          <div className="preview-image">
            <div className="change-wrap">
              <p>변경하기</p>
            </div>
            <img src={preview} alt="preview" />
          </div>

        ) : (
          <img src="/icons/add-gray.svg" alt="여기를 눌러 이미지 업로드" className="plus-icon" />
        )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleChange}
            style={{ display: "none" }}
          />
      </div>
    </div>

  );
};

export default ImageUploader;
