import React, { Component } from "react";

import "./App.css";
import "./styles/total.css";
import "./styles/manage.css";
import Total from "./Components/Total";
import Manage from "./Components/Manage";

class App extends Component {
  state = {
    totalCost: "",
    stepOne: "True",
    stepTwo: "False",
  };
  startManage = (totalCost) => {
    this.setState({
      totalCost: totalCost,
      stepOne: "False",
      stepTwo: "True",
    });
  };
  render() {
    return (
      <div className="App">
        {this.state.stepOne === "True" ? (
          <Total
            totalCost={this.state.totalCost}
            startManage={this.startManage}
          />
        ) : (
          <Manage
            display={this.state.display}
            totalCost={this.state.totalCost}
          />
        )}
      </div>
    );
  }
}
export default App;
