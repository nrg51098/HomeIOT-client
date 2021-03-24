import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props); 

    this.updateSeries() 
    
  }

  updateSeries = () =>
  {
    const myTempDatasets= this.props.myTempDatasets
    const timestamps = myTempDatasets.map((dataset) => dataset.timestamp)
    const temps = myTempDatasets.map((dataset) => parseInt(dataset.temp))

    console.log(temps)

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: timestamps
        }
      },
      series: [
        {
          name: "series-1",
          data: temps
        }
      ]
    };

  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.myTempDatasets !== prevProps.myTempDatasets) {
     
  //   }
    

  //   this.updateSeries()
  // }

  
  componentWillReceiveProps(){
    this.updateSeries()
  }  

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="1000"
              height="300"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
