import React, { Component } from "react";
import dollar from "./dollar.png";
class Total extends Component {
  state = {
    money: "",
    message: "",
    permission: "no",
  };
  handleOnChange = (e) => {
    console.log(e.target.value);
    if (e.target.value == "") {
      this.setState({
        message: "Enter the Amount  ",
        permission: "no",
      });
    }
    if (e.target.value < 100) {
      this.setState({
        message: "Monitor will not work this amount ",
        permission: "no",
      });
    } else {
      this.setState({
        message: "You Rich Fella ",
        permission: "go",
      });
    }
    this.setState({
      money: e.target.value,
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    if (this.state.permission == "go") {
      this.props.startManage(this.state.money);
    }
  };
  render() {
    return (
      <div className="container">
        <div className="brand">
          <h1>Manage Your Expense</h1>
        </div>
        <div className="wrapper">
          {/*top container */}

          <div className="top-container">
            <div className="title-head">
              <h1>Expense-Monitor</h1>
            </div>
            <div className="title-sub">
              <p>Money in your Pocket?</p>
            </div>
          </div>

          {/* Money - box */}

          <div className="money-box">
            <div className="money-box box-a">
              <img src={dollar} alt="" />
            </div>

            <div className="money-box box-b">
              <form onSubmit={this.handleOnSubmit} className="allCost">
                <input
                  type="number"
                  name="totalcost"
                  onChange={this.handleOnChange}
                  id="totalcost"
                  placeholder="$$$"
                />
                <button type="Submit">Start Monitor</button>
              </form>
              <div className="message">
                <p>{this.state.message} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Total;
