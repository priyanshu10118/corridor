import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import { saveAs } from "file-saver";

function App() {
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [dataFetched, setDataFetched] = useState(false);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleFileSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
  };
  const handleAnalysis = () => {
    // perform analysis on data
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result;
      const workbook = XLSX.read(fileData, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
      const labels = jsonData.map((item) => item.x);
      console.log(labels);
      const datasets = [
        {
          label: "Values of y as per x",
          data: jsonData.map((item) => item.y),
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 0.2)`,
          borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 1)`,
          borderWidth: 1,
        },
      ];
      console.log(datasets);
      setChartData({
        labels,
        datasets,
      });
      setDataFetched(true);
      console.log(chartData);
    };
    reader.readAsBinaryString(file);
  };

  const handleDownload = () => {
    // generate download file
  };

  useEffect(() => {
    console.log(chartData);
    console.log("data changed");
  }, [chartData]);

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onclick={handleFileSubmit}>Upload</button>
      <button onClick={handleAnalysis}>Analyze Data</button>
      <button onClick={handleDownload}>Download Results</button>
      {dataFetched ? <Bar data={chartData} /> : ""}
    </div>
  );
}

export default App;
