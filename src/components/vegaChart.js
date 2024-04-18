import { Vega } from 'react-vega';
import chart from './charts/ChartInter.json'
// import chart1 from './charts/chart4_url.json'


function VegaChart() {

    // const vegaSpec1 = chart1
    const vegaSpec = chart


    return(
        <div>
            {/* <h2>This is a VegaFusion chart</h2> */}
            <Vega spec={vegaSpec} />
            {/* <h2>This is a Vega-Lite chart</h2>*/}
            {/* <Vega spec = {vegaSpec1}/>              */}
        </div>
    )
}

export default VegaChart
