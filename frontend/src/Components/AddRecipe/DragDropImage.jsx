import { useRef, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import PropTypes from "prop-types";
import axios from "axios";

// TODO: upload automatyczny po wybraniu pliku

export default function DragDropImage({ setImageUrl }) {
  const [files, setFiles] = useState(null);

  const inputRef = useRef();

  const imageData = new FormData();

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const uploaded_files = event.dataTransfer.files;
    console.log(uploaded_files);
    if (uploaded_files.length > 1) {
      setFiles(uploaded_files[0]);
    } else {
      setFiles(uploaded_files);
    }
  };

  const handleSelect = (event) => {
    event.preventDefault();
    setFiles(event.target.files);
  };

  const handleImageUpload = async () => {
    imageData.append("file", files[0]);
    console.log(imageData);
    try {
      const response = await axios.post(
        "http://localhost:8000/upload/recipe-image",
        imageData,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      const file_url = response.data.file_url;
      setImageUrl(file_url);
    } catch (error) {
      console.log(error);
    }
  };

  if (files)
    return (
      <div className="grid place-items-center min-h-[8rem] bg-szpgray w-full">
        <div className="flex flex-col justify-center  max-w-[10rem]">
          <button
            type="button"
            className="bg-pink-200 p-2 mb-2"
            onClick={handleImageUpload}
          >
            upload
          </button>
          <p>{files[0].name}</p>
        </div>
      </div>
    );

  return (
    <>
      {!files && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="grid place-items-center min-h-[8rem] rounded border-2 w-full"
        >
          <div
            onClick={() => inputRef.current.click()}
            className="cursor-pointer grid place-items-center justify-center text-[#737578] rounded "
          >
            <RiImageAddLine size={32} className="mt-4 mb-2 " />
            <p className="text-sm">drag & drop to upload</p>
            <p className="text-sm">
              or <u>select file</u>
            </p>
            <input type="file" onChange={handleSelect} hidden ref={inputRef} />
          </div>
        </div>
      )}
    </>
  );
}

DragDropImage.propTypes = {
  setImageUrl: PropTypes.func.isRequired,
};
