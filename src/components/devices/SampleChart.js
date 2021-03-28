import React, { Component } from "react";
import Chart from "react-apexcharts";
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props); 

    this.updateSeries() 
    
  }

  updateSeries = () =>
  {
    const myDatasets= this.props.myDatasets
    const sensor_type_id = this.props.sensor_type_id
    // const timestamps = myDatasets.map((dataset) => dataset.timestamp)
    // const temps = myDatasets.map((dataset) => parseInt(dataset.temp))
    
    console.log(sensor_type_id)
    if(sensor_type_id){
                if(sensor_type_id === 1){
                  const timestamps = myDatasets.map((dataset) => moment(dataset.timestamp).format('lll'))
                  const temps = myDatasets.map((dataset) => parseInt(dataset.temp))

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
                else if(sensor_type_id === 2){
                  const timestamps = myDatasets.map((dataset) => moment(dataset.timestamp).format('lll'))
                  const temps = myDatasets.map((dataset) => parseInt(dataset.temp))
                  const humis = myDatasets.map((dataset) => parseInt(dataset.humi))

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
                        name: "series-temps",
                        data: temps
                      },
                      {
                        name: "series-humis",
                        data: humis
                      }
                    ]
                  };
                }
    
    
    }

    

  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.myDatasets !== prevProps.myDatasets) {
     
  //   }
    

  //   this.updateSeries()
  // }

  
  componentWillReceiveProps(){
    this.updateSeries()
  }  

  render() {
    return (
      <div className="app">
        <div className="row ">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="1000"
              height="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
