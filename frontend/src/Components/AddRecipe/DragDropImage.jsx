import { useRef, useState } from "react";

export default function DragDropImage() {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
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

  if (files)
    return (
      <div className="grid place-items-center min-h-[8rem] bg-szpgray w-full">
        <div className="flex flex-col justify-center  max-w-[10rem]">
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
          className="grid place-items-center min-h-[8rem] bg-szpgray w-full"
        >
          <div className="flex flex-col justify-center max-w-[10rem]">
            <h1 className="text-">Drag and Drop</h1>
            <input type="file" onChange={handleSelect} hidden ref={inputRef} />
            <button
              onClick={() => inputRef.current.click()}
              className="bg-szppurple/80 text-white rounded"
            >
              select files
            </button>
          </div>
        </div>
      )}
    </>
  );
}
