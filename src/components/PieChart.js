import React,{Component} from "react";
import Chart from "react-google-charts";

class PieChart extends Component {
    state = {  }
    render() { 
        let senti = this.props.sentiments;
        return ( 
            <div> 
               <Chart
                width={'800px'}
                height={'400px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Pizza', 'Popularity'],
                    ['Positive', senti.positive*100],
                    ['Negative', senti.negative*100],
                    ['Neutral', senti.neutral*100],
                ]}
                options={{
                    title: 'Sentiments Analysis',
                    sliceVisibilityThreshold: 0.2, // 20%
                }}
                rootProps={{ 'data-testid': '7' }}
                />
        </div>);
    }
}
 
export default PieChart;



