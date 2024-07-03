import React, { useCallback, useState } from "react";
import UploadFile from "../components/UploadFile";

function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<any>({
    revenueData: null,
    salesData: null,
    taxData: null,
  });

  const handleExcelUpload = (event, dataType) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedFiles([...uploadedFiles, file]);
    }
  };

  const handleExcelUploadSubmit = async () => {
    try {
      const formData = new FormData();
      console.log("uploadedFiles", uploadedFiles);

      for (const key in uploadedFiles) {
        console.log("hello");

        if (uploadedFiles[key]) {
          console.log("key", key);
          console.log("upload", uploadedFiles[key]);

          formData.append(key, uploadedFiles[key]);
        }
      }

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Data successfully uploaded:", result);
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
            onClick={handleExcelUploadSubmit}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Submit Data
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
