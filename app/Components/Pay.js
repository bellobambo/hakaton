import React, { useState } from "react";

function PayForm() {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Wallet Address:", walletAddress);
    console.log("Amount:", amount);
    // Handle the form submission logic here
  };

  return (
    <div className="pay-form-container">
      <h2>Pay</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="walletAddress">Wallet Address</label>
          <input
            type="text"
            id="walletAddress"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default PayForm;
