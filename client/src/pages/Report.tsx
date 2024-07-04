import React, { useEffect } from "react";
import { Chart } from "../components/Chart";
import { Divider } from "@tremor/react";

interface ReportData {
  [key: string]: any;
}

interface ReportResult {
  [key: string]: any;
}

function Report() {
  const createReport = async (
    data: ReportData
  ): Promise<ReportResult | void> => {
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

      const result: ReportResult = await response.json();
      return result;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await createReport({});
      console.log(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart />
      <Divider>Divider</Divider>
    </div>
  );
}

export default Report;
