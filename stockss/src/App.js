import React, { useState, useEffect } from "react";
import "./App.css";

export default function StockCalculator() {
  const [amount, setAmount] = useState("");
  const [slPercent, setSlPercent] = useState("");
  const [atr, setAtr] = useState("");
  const [nValue, setNValue] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [slValue, setSlValue] = useState(0);
  const [nMultiplied, setNMultiplied] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const [slStockPrice, setSlStockPrice] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSlValue((parseFloat(amount) || 0) * (parseFloat(slPercent) || 0) / 100);
  }, [amount, slPercent]);

  useEffect(() => {
    setNMultiplied((parseFloat(nValue) || 0) * (parseFloat(atr) || 0));
  }, [nValue, atr]);

  useEffect(() => {
    if (parseFloat(atr) !== 0) {
      setNumShares((parseFloat(slValue) || 0) / parseFloat(atr));
    }
  }, [slValue, atr]);

  useEffect(() => {
    setSlStockPrice((parseFloat(stockPrice) || 0) - (parseFloat(nMultiplied) || 0));
  }, [stockPrice, nMultiplied]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const inputs = Array.from(document.querySelectorAll("input"));
      const index = inputs.indexOf(e.target);
      if (index > -1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };

  const clearAll = () => {
    setAmount("");
    setSlPercent("");
    setAtr("");
    setNValue("");
    setStockPrice("");
    setSlValue(0);
    setNMultiplied(0);
    setNumShares(0);
    setSlStockPrice(0);
  };

  return (
    <div className="container">
      <header className="header">
        {/* <div className="logo">
          <img src="/path-to-your-image.png" alt="Logo" className="logo-image" />
        </div> */}
        <div className="title">Stock Calculator</div>
        <div className="time">{currentTime.toLocaleString()}</div>
      </header>

      <main className="main">
        <div className="form-group">
          <label>Enter the amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>SL (by %):</label>
          <input
            type="number"
            value={slPercent}
            onChange={(e) => setSlPercent(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input"
          />
          <p className="result">SL Value: {slValue.toFixed(2)}</p>
        </div>

        <div className="form-group">
          <label>Enter the stock price:</label>
          <input
            type="number"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>ATR:</label>
          <input
            type="number"
            value={atr}
            onChange={(e) => setAtr(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input"
          />
        </div>

        <div className="form-group">
          <label>N:</label>
          <input
            type="number"
            value={nValue}
            onChange={(e) => setNValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="input"
          />
          <p className="result">N * ATR: {nMultiplied.toFixed(2)}</p>
        </div>

        <div className="form-group">
          <p className="shares">Number of Shares (SL / ATR): {parseFloat(atr) !== 0 ? numShares.toFixed(2) : "N/A"}</p>
        </div>

        <div className="form-group">
          <p className="shares">SL Stock Price: {slStockPrice.toFixed(2)}</p>
        </div>

        <button className="clear-button" onClick={clearAll}>Clear All</button>
      </main>
    </div>
  );
}
