import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "../components/UploadFile";
import { useExcelData } from "../context/ExcelContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const [date, setDate] = useState<any>([]);

  const navigate = useNavigate();
  const { setAllExcelUsersData }: any = useExcelData();
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleExcelUpload = (event, dataType) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((availableFiles) => [...availableFiles, file]);
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const monthNumber = parseInt(selectedDate.split("-")[1], 10);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[monthNumber - 1];
    setDate(monthName);
  };

  const handleExcelUploadSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("month", date);
      formData.append("user_id", "1");
      uploadedFiles.forEach((file, _index) => {
        formData.append("files", file);
      });
      const response = await fetch(`${apiUrl}/upload`, {
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
      <Navbar />
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

          <div className="w-1/2 mx-auto mt-10">
            <label className="block mb-2 ml-2 text-sm font-large text-gray-900 dark:text-white">
              Month
            </label>
            <input
              onChange={handleDateChange}
              className="focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder-gray-500 focus:border-fuchsia-300 focus:outline-none text-cyan-50"
              placeholder="Please select a month and year"
              type="month"
            />
          </div>
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
      <Footer />
    </>
  );
}

export default Home;
