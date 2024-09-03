const { Web3 } = require("web3");

const web3 = new Web3("http://127.0.0.1:8545/");

const privateKey =
  "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0";
const sender = web3.eth.accounts.wallet.add(privateKey)[0];

const receiverAddress = "0x959FA1b65A150Fbf3f21f20409A362645d23d264";

web3.eth
  .sendTransaction({
    from: sender.address,
    to: receiverAddress,
    value: web3.utils.toWei("5", "ether"),
  })
  .on("sending", (sending) => {
    console.log("Sending:", sending);
  })
  .on("sent", (sent) => {
    console.log("Sent:", sent);
  })
  .on("transactionHash", (transactionHash) => {
    console.log("Transaction Hash:", transactionHash);
  })
  .on("receipt", (receipt) => {
    console.log("Receipt:", receipt);

    // Get the receiver's balance after the transaction
    web3.eth.getBalance(receiverAddress).then((balance) => {
      console.log(
        "Receiver Balance:",
        web3.utils.fromWei(balance, "ether"),
        "ETH"
      );
      process.exit(0);
    });
  })
  .on("confirmation", (confirmation) => {
    console.log("Confirmation:", confirmation);
  })
  .on("error", (error) => {
    console.log("Error:", error);
    process.exit(1);
  });
