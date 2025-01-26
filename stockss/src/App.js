import React, { useState, useEffect } from "react";

export default function StockCalculator() {
  const [amount, setAmount] = useState(0);
  const [slPercent, setSlPercent] = useState(0);
  const [atr, setAtr] = useState(0);
  const [nValue, setNValue] = useState(0);
  const [slValue, setSlValue] = useState(0);
  const [nMultiplied, setNMultiplied] = useState(0);
  const [numShares, setNumShares] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSlValue((amount * slPercent) / 100);
  }, [amount, slPercent]);

  useEffect(() => {
    setNMultiplied(nValue * atr);
  }, [nValue, atr]);

  useEffect(() => {
    if (atr !== 0) {
      setNumShares(slValue / atr);
    }
  }, [slValue, atr]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-blue-600 text-white p-4 rounded">
        <div className="text-lg font-bold">Logo</div>
        <div className="text-xl">Stock Calculator</div>
        <div>{currentTime.toLocaleString()}</div>
      </header>

      <main className="mt-6 bg-white p-6 rounded shadow">
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter the amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">SL (by %):</label>
            <input
              type="number"
              value={slPercent}
              onChange={(e) => setSlPercent(parseFloat(e.target.value) || 0)}
              className="w-full border p-2 rounded"
            />
            <p className="mt-2 text-gray-600">SL Value: {slValue.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-gray-700">ATR:</label>
            <input
              type="number"
              value={atr}
              onChange={(e) => setAtr(parseFloat(e.target.value) || 0)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">N:</label>
            <input
              type="number"
              value={nValue}
              onChange={(e) => setNValue(parseFloat(e.target.value) || 0)}
              className="w-full border p-2 rounded"
            />
            <p className="mt-2 text-gray-600">N * ATR: {nMultiplied.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-gray-700 font-bold">
              Number of Shares (SL / ATR): {atr !== 0 ? numShares.toFixed(2) : "N/A"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
