import React, { useEffect } from "react";
import { DonutChart, Legend } from "@tremor/react";
import { useExcelData } from "../context/ExcelContext";

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const Chart = () => {
  const { allExcelUsersData }: any = useExcelData();

  return (
    <>
      {allExcelUsersData.data &&
        allExcelUsersData.data.map((value) => {
          const data = Object.keys(allExcelUsersData.data[0][0]);
          return (
            <div className="flex my-7 items-center justify-center space-x-6">
              <DonutChart
                data={value}
                category={`${data[1]}`}
                index={`${data[0]}`}
                valueFormatter={valueFormatter}
                colors={[
                  "blue",
                  "cyan",
                  "indigo",
                  "violet",
                  "yellow",
                  "peach",
                  "pink",
                  "green",
                  "red",
                  "",
                ]}
                className="w-40"
              />
              <Legend
                categories={[
                  "Revenue Source 1",
                  "Revenue name 2",
                  "Revenue name 3",
                  "Revenue name 4",
                  "Revenue name 5",
                  "Revenue name 6",
                  "Revenue name 7",
                  "Revenue name 8",
                  "Revenue name 9",
                  "Revenue name 10",
                ]}
                colors={[
                  "blue",
                  "cyan",
                  "indigo",
                  "violet",
                  "yellow",
                  "peach",
                  "pink",
                  "green",
                  "red",
                ]}
                className="max-w-xs"
              />
            </div>
          );
        })}
    </>
  );
};
