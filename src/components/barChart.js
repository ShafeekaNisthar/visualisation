import React, { useState } from 'react';
import { Vega } from 'react-vega';
import axios from 'axios';


function BarChart() {
    const [column1, setColumn1] = useState('');
    const [column2, setColumn2] = useState('');
    const [func, setFunc] = useState('');
    const [data, setData] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/createBarChart',{
                column1: column1,
                column2: column2,
                function: func
        })
        
        const result = await response.data;
        setData(result);
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const vegaSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: data },
      mark: 'bar',
      encoding: {
        x: { field: column1, type: 'nominal' , "axis":{"labelAngle":0} },
        y: { field: column2, type: 'quantitative' },
      },
    };

    const downloadVegaChart = () => {
      const chartJson = JSON.stringify(vegaSpec, null, 2);
      const blob = new Blob([chartJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vega-chart.json';
      a.click();
    };

  
    return (
      <div className='barchart'>
        <h2>Bar Chart Generator</h2>
        <form className='form'>
          <label>Column 1:</label>
          <input type="text" value={column1} onChange={(e) => setColumn1(e.target.value)} />
          <label>Column 2:</label>
          <input type="text" value={column2} onChange={(e) => setColumn2(e.target.value)} />
          <label>Function:</label>
          <input type="text" value={func} onChange={(e) => setFunc(e.target.value)} />
          <button type="button" onClick={fetchData}>
            Generate Data
          </button>
          <button type="button" onClick={downloadVegaChart}>
            Download Vega Chart
          </button>
        </form>
         <Vega spec={vegaSpec} />
      </div>
    );
  }
  
export default BarChart;