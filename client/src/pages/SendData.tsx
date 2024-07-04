import React from "react";

function SendData() {
  return (
    <div className="container mx-auto mt-3">
      <h1 className=" my-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Update Your{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          Data
        </span>
      </h1>
      <p className="text-lg font-normal my-10 text-gray-500 lg:text-xl dark:text-gray-400">
        Select the data you wish to send to our founder. Choose from a range of
        options to share valuable insights and information directly with our
        team.
      </p>
      <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          value=""
          name="bordered-checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Profit Data
        </label>
      </div>
      <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          value=""
          name="bordered-checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Revenue Data
        </label>
      </div>
      <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 my-5">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          value=""
          name="bordered-checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Sales Data
        </label>
      </div>
      <div className="flex justify-center mt-16 mb-7">
        <button
          type="button"
          className="text-white bg-gradient-to-r mt-6 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
        >
          Send Data
        </button>
      </div>
    </div>
  );
}

export default SendData;
