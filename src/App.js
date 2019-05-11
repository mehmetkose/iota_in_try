import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    USDTTRY: 0,
    IOTAUSDT: 0,
    balanceInIOTA: 0,
    balanceInTRY: 0
  };
  async componentDidMount() {
    await this.fetchBinanceTicker();
    await this.fetchBTCTURKTicker();
  }
  async fetchBinanceTicker() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v3/ticker/price"
    );
    const priceStack = await response.json();
    priceStack
      .filter(pair => pair.symbol === "IOTAUSDT")
      .map(pair => {
        return this.setState({ IOTAUSDT: pair.price });
      });
  }
  async fetchBTCTURKTicker() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://www.btcturk.com/api/ticker"
    );
    const prices = await response.json();
    prices
      .filter(pair => pair.pair === "USDTTRY")
      .map(pair => {
        return this.setState({ USDTTRY: pair.last });
      });
  }

  onChangeBalance = event => {
    const balanceInIOTA = event.target.value;
    this.setState({ balanceInIOTA: balanceInIOTA });
  };

  render() {
    const balance = Math.round(
      this.state.balanceInIOTA * this.state.IOTAUSDT * this.state.USDTTRY
    );
    return (
      <section>
        <h2>{balance} TRY</h2>
        <form>
          <label>IOTA's you have: </label>
          <input
            value={this.state.balance}
            onChange={this.onChangeBalance}
            type="number"
          />
        </form>
      </section>
    );
  }
}

export default App;
