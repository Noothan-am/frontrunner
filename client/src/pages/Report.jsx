import React from "react";
import Chart from "../components/Chart";

function Report() {
  const createReport = async (data) => {
    try {
      const response = await fetch("/create-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await createReport();
      console.log(result);
    };

    fetchData();
  }, []);
  return (
    <div>
      <Chart />
    </div>
  );
}

export default Report;
