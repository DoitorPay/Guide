import React, { useRef, useState } from "react";

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-container" onClick={handleClick}>
      {preview ? (
        <img src={preview} alt="preview" className="preview-image" />
      ) : (
        <img src="/icons/add.svg" alt="plus-icon" className="plus-icon" />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
