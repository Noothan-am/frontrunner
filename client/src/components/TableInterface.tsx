// components/TableInterface.js
import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';


const TableInterface = () => {
  const [sheets, setSheets] = useState([{}, {}, {}]);
  const [months, setMonths] = useState(['Month 1', 'Month 2', 'Month 3']);
  const [data, setData] = useState({});

  const handleFileUpload = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (evt) => {
    const workbook = read(evt.target?.result as string, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = utils.sheet_to_json(workbook.Sheets[sheetName]);
      const newSheets = [...sheets];
      newSheets[index] = sheet;
      setSheets(newSheets);
      processSheetData(newSheets);
    };
    reader.readAsArrayBuffer(file);
  };

  const processSheetData = (sheets) => {
    const chartData = { labels: months, datasets: [] };
    // Extract revenue, cost, tax from each sheet and add to chartData
    sheets.forEach((sheet, index) => {
    const chartData: ChartData<'line'> = { labels: months, datasets: [] };
      const revenue = [], cost = [], tax = [];
      sheet.forEach((row: { Revenue: number; Cost: number; Tax: number }) => {
        revenue.push(row.Revenue);
        cost.push(row.Cost);
        tax.push(row.Tax);
      });
      chartData.datasets.push({
        label: `Sheet ${index + 1} - Revenue`,
        data: revenue,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      });
      chartData.datasets.push({
        label: `Sheet ${index + 1} - Cost`,
        data: cost,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      });
      chartData.datasets.push({
        label: `Sheet ${index + 1} - Tax`,
        data: tax,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      });
    });
    setData(chartData);
  };

  const addMonth = () => {
    setMonths([...months, `Month ${months.length + 1}`]);
  };

  return (
    <div className="p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th></th>
            {months.map((month, idx) => (
              <th key={idx} className="border px-4 py-2">{month}</th>
            ))}
            <th>
              <button onClick={addMonth} className="bg-blue-500 text-white px-2 py-1 rounded">
                Add Month
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((sheet, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">Sheet {idx + 1}</td>
              {months.map((_, colIdx) => (
                <td key={colIdx} className="border px-4 py-2">
                  {idx === colIdx ? (
                    <input type="file" onChange={(e) => handleFileUpload(e, idx)} />
                  ) : (
                    ''
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {data.labels && <Line data={data} />}
      </div>
    </div>
  );
};

export default TableInterface;



