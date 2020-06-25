import React, { Component } from "react";
import grocery from "./grocery.jpg";
import rent from "./rent.jpg";
import bills from "./bills.jpg";
import school from "./school.jpg";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

class Manage extends Component {
  state = {
    cost: this.props.totalCost,
    fraction: "",
    expense: {
      Grocery: 0,
      bills: 0,
      fees: 0,
      rent: 0,
    },
    savings: this.props.totalCost,
    message: "Money is valuable",
  };

  handleChange = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      e.target.value = "";
      this.setState({
        message: "type no only",
      });
      /* to add 0 when the characters are invalid  */
      this.setState(
        {
          expense: {
            ...this.state.expense,
            [e.target.name]: 0,
          },
        },
        () => {
          let sum = 0;
          const { Grocery, bills, fees, rent } = this.state.expense;
          sum = Grocery + bills + fees + rent;
          this.setState({
            savings: this.props.totalCost - sum,
          });
        }
      );
    } else {
      /* to handle when input is valid */
      this.setState(
        {
          expense: {
            ...this.state.expense,
            [e.target.name]: parseInt(e.target.value),
          },
        },
        () => {
          let sum = 0;
          let fraction = 0;
          const progressBar = document.querySelector(".progress");
          const { Grocery, bills, fees, rent } = this.state.expense;
          sum = Grocery + bills + fees + rent;

          /* progress bar  */

          const setProgress = () => {
            fraction = sum / this.props.totalCost;
            if (fraction >= 0.25 && fraction < 0.5) {
              this.setState({
                fraction: "fourth",
              });
              console.log(fraction);
              /* setting the prog bar  */

              progressBar.setAttribute("data-percent", "fourth");
            } else if (fraction >= 0.5 && fraction < 0.75) {
              this.setState({
                fraction: "half",
              });
              console.log(fraction);
              progressBar.setAttribute("data-percent", "half");
            } else if (fraction >= 0.75 && fraction < 1) {
              this.setState({
                fraction: "extra",
              });
              console.log(fraction);
              progressBar.setAttribute("data-percent", "extra");
            } else if (fraction == 1) {
              this.setState({
                fraction: "full",
              });
              console.log(fraction);
              progressBar.setAttribute("data-percent", "full");
            } else if (sum > this.props.totalCost) {
              this.setState({
                fraction: "over",
              });
              progressBar.setAttribute("data-percent", "over");
            } else if (
              fraction > 0 &&
              fraction < 0.25 &&
              sum < this.props.totalCost
            ) {
              this.setState({
                fraction: "empty",
              });
              progressBar.setAttribute("data-percent", "empty");
            }
          };

          if (sum > this.props.totalCost) {
            this.setState(
              {
                savings: this.props.totalCost - sum,
                message: "Exceeding the Total cost",
              },
              setProgress
            );

            /* remove the print button */
            /* post error */
          } else {
            this.setState(
              {
                savings: this.props.totalCost - sum,
                message: "Savings, Great !",
              },
              setProgress
            );
          }
          /* fraction set */
        }
      );
    }
  };
  /* generate pdf */
  handlePdf = () => {
    const input = document.getElementById("main-box");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("Monthly expense.pdf");
    });
  };

  render() {
    return (
      <div className="Manage-container" id="main-box">
        <div className="filler">
          <div className="progress-bucket">
            <div className="progress" data-percent="0" data-color="green"></div>
          </div>
          <div className="savings">
            <h1 id="save"> Save ${this.state.savings}</h1>
          </div>
        </div>
        {/* COST -BOX */}

        <div className="cost-box">
          {/* TOP-CONTAINER  */}

          <div className="top-container">
            <div className="title-head">
              <h1>Expense-Monitor</h1>
            </div>
            <div className="title-sub">
              <p>Check out the filler to make Savings</p>
            </div>
          </div>

          <form className="item-box">
            <div className="item-box-a">
              <div className="box-header">
                <img src={grocery} alt="grocery" id="item-img" />
              </div>

              <h2>Grocery</h2>
              <input
                type="number"
                className="item-cost"
                name="Grocery"
                placeholder="$"
                onChange={this.handleChange}
              />
            </div>
            <div className="item-box-a">
              <div className="box-header">
                <img src={bills} alt="bills" id="item-img" />
              </div>
              <h2>bills</h2>
              <input
                type="number"
                className="item-cost"
                name="bills"
                placeholder="$"
                onChange={this.handleChange}
              />
            </div>
            <div className="item-box-a">
              <div className="box-header">
                <img src={school} alt="fees" id="item-img" />
              </div>

              <h2>fees</h2>
              <input
                type="number"
                className="item-cost"
                name="fees"
                placeholder="$"
                onChange={this.handleChange}
              />
            </div>
            <div className="item-box-a">
              <div className="box-header">
                <img src={rent} alt="rent" id="item-img" />
              </div>

              <h2>Rent</h2>
              <input
                type="number"
                className="item-cost"
                name="rent"
                placeholder="$"
                onKeyUp={this.handleChange}
              />
            </div>
          </form>
          <div className="bottom-container">
            <div className="message">
              <p>"{this.state.message}"</p>
            </div>
            <div>
              <button className="screen" onClick={this.handlePdf}>
                Take a screenshot
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Manage;
