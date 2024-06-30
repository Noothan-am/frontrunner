import React from "react";

function UploadFile() {
  return (
    <div className="w-1/2 mx-auto">
      <label className="block mb-2 ml-2 text-sm font-large text-gray-900 dark:text-white">
        Sales Data
      </label>
      <input
        className="block w-full mb-5 ml-2 text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-white"
        id="default_size"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label className="block mb-2  ml-2 text-sm font-medium my-6 text-gray-900 dark:text-white">
        Revenue Data
      </label>
      <input
        className="block w-full mb-5 ml-2 text-sm text-gray-900 border border-black rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-white"
        id="default_size"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label className="block mb-2  ml-2 text-sm font-medium text-gray-900 dark:text-white">
        Expenses Data
      </label>
      <input
        className="block w-full mb-5 ml-2 text-sm text-gray-900 border  border-black rounded-lg cursor-pointer bg-white dark:text-gray-400 focus:outline-none dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-white"
        id="default_size"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
    </div>
  );
}

export default UploadFile;
