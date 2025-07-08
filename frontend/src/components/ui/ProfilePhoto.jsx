import React, { useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";
import { Button } from "./button";
import { Avatar, AvatarImage } from "./avatar";

const ProfilePhoto = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    console.log("FileList:", e.target.files);
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      console.log("No file selected.");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = null; // Clear the file input
    }
  };

  const onChooseImage = () => {
    if (inputRef.current) {
      inputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className={"hidden"}
      />

      {!image ? (
        <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <Button size="iconSm" type="button" onClick={onChooseImage}>
            <LuUpload />
          </Button>
        </div>
      ) : (
        <div className="relative w-24 h-24 flex items-center justify-center border-2 border-gray-300 rounded-full">
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview} alt="profile photo" />
          </Avatar>
          <Button size="iconRemove" type="button" onClick={handleRemoveImage}>
            <LuTrash />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
