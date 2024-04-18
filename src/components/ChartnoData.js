import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Vega } from 'react-vega';

const VegaGraph = () => {
  const [vegaSpec, setVegaSpec] = useState(null);

  // Function to fetch the Vega specification from the backend
  const fetchVegaSpec = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/regionChart');
      console.log(response)
      const data = await response.data
      const values = JSON.parse(data)
      setVegaSpec(values);
    } catch (error) {
      console.error('Error fetching Vega specification:', error);
    }
  };

  useEffect(() => {
    fetchVegaSpec();
  }, []);

  useEffect(() => {
    console.log(vegaSpec)
  }, [vegaSpec]);

  return (
    <div>
       the chart
      {vegaSpec && <Vega spec={vegaSpec}/>}
    </div>
  );
};

export default VegaGraph;


