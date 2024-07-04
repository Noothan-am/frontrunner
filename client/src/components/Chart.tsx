import React from "react";
import { DonutChart, Legend } from "@tremor/react";

const datahero = [
  { name: "Revenue Source 1", value: 1100 },
  { name: "Revenue name 2", value: 1200 },
  { name: "Revenue name 3", value: 1300 },
  { name: "Revenue name 4", value: 1400 },
  { name: "Revenue name 5", value: 1500 },
  { name: "Revenue name 6", value: 1600 },
  { name: "Revenue name 7", value: 1700 },
  { name: "Revenue name 8", value: 1800 },
  { name: "Revenue name 9", value: 1900 },
  { name: "Revenue name 10", value: 2000 },
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

export const Chart = () => (
  <>
    <p className="text-sm text-gray-700 dark:text-gray-300">Revenue by month</p>
    <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-gray-50">
      2000
    </p>
    <div className="flex items-center justify-center space-x-6">
      <DonutChart
        data={datahero}
        category="value"
        index="name"
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
  </>
);
