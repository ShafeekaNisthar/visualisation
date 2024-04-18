import React, { useState } from 'react';
import { Vega } from 'react-vega';
import Slider from 'rc-slider'



import axios from 'axios';


function Chart() {
    const [column1, setColumn1] = useState('');
    const [column2, setColumn2] = useState('');
    const [column3, setColumn3] = useState('');
    const [sliderValues, setSliderValues] = useState([-100000, 100000])
    const [originalData, setOriginalData] = useState(null); // Store the original data
    const [data, setData] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Chart')
        
        const result = await response.data;
        setOriginalData(result); // Store the original data
        setData(result)
        const propertyNames = Object.keys(result[0])
        setColumn1(propertyNames[0])
        setColumn2(propertyNames[1])
        setColumn3(propertyNames[2])
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleSliderChange = (values) => {
        setSliderValues(values);
        const minAmount = sliderValues[0]
        const maxAmount = sliderValues[1]
        const filteredDataset = originalData.filter(item => {
            const transactionAmount = item.transaction_amount;
            return transactionAmount >= minAmount && transactionAmount <= maxAmount;
        });
        setData(filteredDataset)
      };
    
    const vegaSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "data": {values: data },
        "mark": "bar",
        "selection": {
            "Selector": {
              "type": "multi", // Allows multiple selections
              "fields": [column3],
              "bind": "legend" // Binds to the legend for interaction
            }
        },
        "encoding": {
          "x": {
            "field": column1,
            "timeUnit": "month",
            "type": "ordinal",
            "title": "Month"
          },
          "y": {
            "aggregate": "sum",
            "field": column2,
            "type": "quantitative",
            "title": "Total Transactions"
          },
          "color": {
            "field": column3,
            "type": "nominal",
            "title": "Region Name"
          },
          "tooltip": [
            { "field": column1, "type": "temporal", "title": "Date" },
            { "field": column2, "type": "quantitative", "title": "Transaction Amount" },
            { "field": column3, "type": "nominal", "title": "Region Name" }
          ],
          "opacity": {
            "condition": {
              "selection": "Selector",
              "value": 1
            },
            "value": 0.2
        }
        }
      }
      
    
        // const spec = vegaLite.compile(vegaSpec).spec;

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
        <div className='Chart'>
          <p>
            <button type="button" onClick={fetchData}>
              Load Plot
            </button>
            <button type="button" onClick={downloadVegaChart}>
              Download Chart
            </button>
          </p>
          <Slider
            min={-100000}
            max={100000}
            step={100}
            value={sliderValues}
            onChange={handleSliderChange}
            reverse={false}
            range = {true}
          />
          <div>
            <span>Min: {sliderValues[0]}</span>
            <span>Max: {sliderValues[1]}</span>
          </div>
          <Vega spec={vegaSpec} />
        </div>
     );
} 

export default Chart