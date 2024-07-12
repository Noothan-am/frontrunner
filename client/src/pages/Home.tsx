import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import { useExcelData } from "../context/ExcelContext";

function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const navigate = useNavigate();
  const { setAllExcelUsersData }: any = useExcelData();
  const handleExcelUpload = (event, dataType) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((availableFiles) => [...availableFiles, file]);
    }
  };

  const handleExcelUploadSubmit = async () => {
    try {
      const formData = new FormData();
      uploadedFiles.forEach((file, _index) => {
        formData.append("files", file);
      });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
        alert("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data successfully uploaded:", result);
      setAllExcelUsersData(result);
      navigate("/report");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <div className="hero-heading w-90 mx-auto mt-16">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
          CMS For{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600">
            Investors
          </span>{" "}
        </h1>
        <p className="text-lg font-normal my-8 mt-10 text-gray-500 w-90 mx-auto lg:text-xl dark:text-gray-400 text-center">
          Founders and investors can upload all their business data here.
        </p>
        <div>
          <UploadFile
            handleExcelUpload={handleExcelUpload}
            title={"Revenue Data"}
          />
          <UploadFile
            handleExcelUpload={handleExcelUpload}
            title={"Sales Data"}
          />
          <UploadFile
            handleExcelUpload={handleExcelUpload}
            title={"Tax Data"}
          />
        </div>
        <div className="flex justify-center mt-16 mb-7">
          <button
            type="button"
            onClick={handleExcelUploadSubmit}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Get Report
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
