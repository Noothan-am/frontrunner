import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SelectData = ({ handleDataSelect, selectedData }) => {
  const onclickhandle = () => {
    console.log(selectedData);
  };
  return (
    <>
      <div className="container mx-auto mt-3">
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            onChange={(e) =>
              handleDataSelect({
                type: "Profit Data",
                checked: e.target.checked,
              })
            }
          />
          <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Profit Data
          </label>
        </div>
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
          <input
            id="bordered-checkbox-2"
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            onChange={(e) =>
              handleDataSelect({
                type: "Revenue Data",
                checked: e.target.checked,
              })
            }
          />
          <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Revenue Data
          </label>
        </div>
        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
          <input
            id="bordered-checkbox-3"
            type="checkbox"
            value=""
            name="bordered-checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            onChange={(e) =>
              handleDataSelect({
                type: "Sales Data",
                checked: e.target.checked,
              })
            }
          />
          <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Sales Data
          </label>
        </div>
        <div className="flex justify-center mt-16 mb-7">
          <button
            type="button"
            onClick={onclickhandle}
            className="text-white bg-gradient-to-r mt-6 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Send Data
          </button>
        </div>
      </div>
    </>
  );
};

function SendData() {
  const [data, setData] = useState({
    email: "",
    message: "",
  });

  const [selectedData, setSelectedData] = useState({
    "Sales Data": false,
    "Revenue Data": false,
    "Profit Data": false,
  });

  const handleDataSelect = (data) => {
    console.log("Selected data:", data);
    setSelectedData((prevData) => ({
      ...prevData,
      [data.type]: !prevData[data.type],
    }));
  };

  return (
    <>
      <Navbar />

      <div className="container w-100 mx-auto">
        <h1 className=" my-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Send Your{" "}
          <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Message
          </span>
        </h1>
        <p className="text-lg font-normal my-10 text-gray-500 lg:text-xl dark:text-gray-400">
          Select the data you wish to send to our founder. Choose from a range
          of options to share valuable insights and information directly with
          our team.
        </p>
        <form className="w-2/3 mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            />
          </div>

          <form className=" mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your message
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave a comment..."
            ></textarea>
          </form>
          <SelectData
            selectedData={selectedData}
            handleDataSelect={handleDataSelect}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default SendData;
