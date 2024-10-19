"use client";

import React, { useEffect, useState, useRef } from "react";
import Background from "../Components/Background";
import Loader from "../Components/Loader";
import QRCode from "react-qr-code";
import Web3 from "web3";
import { LandingNavbar } from "@/components/landing/navbar";
import ReactCardFlip from "react-card-flip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCallsStatus, useWriteContracts } from "wagmi/experimental";
import { useAccount, useConnect } from "wagmi";
import TransactionStatus from "../Components/TransactionStatus";
import NFTAbi from "@/abi/NFT";

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const reportRef = useRef();
  // const { user } = useUser();
  const router = useRouter();
  const [balance, setBalance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState();


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 300);
  };

  // useEffect(() => {
  //   if (user === undefined) return;

  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user, router]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch("/api/create");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);

          setFetchedData(data.data);
          console.log(data.data, "data")

        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleData();
  }, []);


  const [latestData, setLatestData] = useState({
    Full_Name: "Yinka",
    Matric_Number: "CSC/2022/097",
    Passport: "",
    Phone: "09222223",
    Wallet: "0x3D39D68D2B2fBd98C40a228d56F5205218B9a33D",
  });


  const downloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    const logo = new Image();
    logo.src = "/oaulogo.png";
    logo.onload = () => {
      const logoWidth = 70;
      const logoHeight = 30;
      const logoX = (imgWidth - logoWidth) / 2;
      const logoY = 10;

      pdf.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);

      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      const dateTimeText = `Generated on: ${formattedDate} at ${formattedTime}`;
      const disclaimer =
        "Tender the QRcode in the ICT center for Physical ID card Collection";

      pdf.setFontSize(12);
      pdf.text(dateTimeText, imgWidth / 2, logoY + logoHeight + 10, {
        align: "center",
      });
      pdf.text(disclaimer, imgWidth / 2, logoY + logoHeight + 20, {
        align: "center",
      });

      position = logoY + logoHeight + 30;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position - imgHeight,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
        position = heightLeft;
      }

      const pdfName = `STUDENTID(${formattedDate.replace(
        /\//g,
        "-"
      )}_${formattedTime.replace(/:/g, "-")}).pdf`;
      pdf.save(pdfName);
    };
  };

  const handlePay = async (e) => {
    setIsLoading(true);
    e.preventDefault();

   
  };


  const account = useAccount();
  const { connectors, status } = useConnect();

  const { address, isConnected } = useAccount();
  const {
      writeContractsAsync,
      error: mintError,
      status: mintStatus,
      data: id,
  } = useWriteContracts();

  const { data: callsStatus } = useCallsStatus({
    id: id,
    query: {
        enabled: !!id,
        // Poll every second until the calls are confirmed
        refetchInterval: (data) =>
            data.state.data?.status === "CONFIRMED" ? false : 1000,
    },
});

async function mint() {
  try {
      await writeContractsAsync({
          contracts: [
              {
                  address: "0xA2bCe1b3a30Bb9f29092a3501b19FD9E55D36622",
                  abi: NFTAbi,
                  args: [
                      address,
                      BigInt(0), // tokenId
                      BigInt(1), // quantity
                      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // currency
                      BigInt(0), // pricePerToken
                      {
                          proof: [],
                          quantityLimitPerWallet: BigInt(
                              "115792089237316195423570985008687907853269984665640564039457584007913129639935"
                          ),
                          pricePerToken: BigInt(0),
                          currency:
                              "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
                      },
                      `0x`, // data
                  ],
                  functionName: "claim",
              },
          ],
      });
  } catch (error) {
      console.error(error);
  }
}


  return (
    <div className="min-h-screen card-gradient ">
      <Toaster position="top-right" reverseOrder={false} />
      <LandingNavbar />

      <div className="  flex items-center justify-center min-h-[70vh]   ">
        <Background />
        {loading ? (
          <Loader />
        ) : latestData ? (
          <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              {/* Front Side of the Card */}

              <div className="items-center flex flex-col justify-center">
                <div className="bg-black  rounded-lg p-6 w-fit min-w-[300px] h-[350px] relative">
                  <div className="flex justify-center mb-4">
                    {latestData.Passport && (
                      <img
                        src={latestData.Passport}
                        alt={latestData.Full_Name}
                        className="rounded border border-gray-300"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-lg text-white font-semibold">
                      {latestData.Full_Name}
                    </p>
                    <p className="text-sm text-white/70">
                      Matric Number:
                      <div>{latestData.Matric_Number || "N/A"}</div>
                    </p>
                  </div>
                  {latestData.Passport && (
                    <div className="flex justify-center  mt-[60px] ">
                      <img
                        src="/chip.png"
                        alt="Chip Icon"
                        className="rounded-full"
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Back Side of the Card */}
              <div className="items-center flex flex-col justify-center">
                <div className="bg-black  rounded-lg p-6 w-fit max-w-[300px] h-[350px] relative space-y-8">
                  <div
                    className="flex justify-center mb-20  bg-white p-1 w-fit items-center mx-auto"
                    ref={reportRef}
                  >
                    <QRCode
                      value={`Wallet ID : ${
                        latestData.Wallet || "N/A"
                      }, Phone : ${latestData.Phone || "N/A"}`}
                      size={100}
                    />
                  </div>
                  <div>
                    <p className="mt-5 text-center text-white">
                      Valid till : 20/09/25
                    </p>
                    <small className="items-center text-center block text-white px-1 mt-2">
                      This ID should be returned to the University ICT center if
                      found
                    </small>
                  </div>
                </div>
              </div>
            </ReactCardFlip>

            <div className="flex justify-center items-center gap-6">
              <button
                className="bg-[#471d47] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-3 rounded"
                onClick={handleFlip}
              >
                Flip Card
              </button>
              <button
                className="bg-[#5e235e] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-3 rounded"
                onClick={downloadPDF}
              >
                Save QRCode
              </button>
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-[#220c22] border border-gray-500 text-white w-full md:w-auto h-[48px] mt-4 px-8 mr-3 rounded"
                onClick={openModal}
              >
                Pay
              </button>
            </div>
            <br />

            <small>
              <i className="text-white">
                The QR code will be used to confirm your identity in the
                school's ICT Center
              </i>
            </small>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>

      <div className="flex justify-center items-center h-screen">
        {/* <button
          className="px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-700 transition"
          onClick={openModal}
        >
          Pay
        </button> */}
        <AnimatePresence>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-gray-400 bg-opacity-40 flex justify-center items-center z-50"
              onClick={closeModal}
            >
              <motion.div
                className="bg-black p-6 rounded-lg shadow-lg max-w-[500px] w-full "
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-white">
                <h2>Account</h2>

                <div>
                    status: {account.status}
                    <br />
                    addresses: {JSON.stringify(account.addresses)}
                    <br />
                    chainId: {account.chainId}
                </div>
            </div>

                <small className="mb-8">
                  Wallet Address {latestData.Wallet}
                </small>
                <form onSubmit={handlePay}>
                  <div className="form-group my-8">
                    <label
                      htmlFor="walletAddress"
                      className="block text-purple-700"
                    >
                      Receiver Wallet Address
                    </label>
                    <input
                      type="text"
                      id="walletAddress"
                      className="mt-1 w-full p-2 border border-gray-300 rounded text-black"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="amount" className="block text-purple-700">
                      Amount
                    </label>
                    <input
                      type="number"
                      id="amount"
                      className="mt-1 w-full p-2 border border-gray-300 rounded text-black"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  {isConnected ? (
                <div className="text-white">
                    <h2>Mint</h2>
                    <span onClick={mint} isLoading={mintStatus === "pending"}>
                        {mintStatus === "pending" ? "Loading..." : "Mint"}
                    </span>
                    <div>writeContracts Status: {mintStatus}</div>
                    <div>{mintError?.message}</div>
                    <TransactionStatus callStatus={callsStatus} />
                </div>
            ) : null}
                </form>
                <button
                  onClick={closeModal}
                  className="mt-4 w-full text-center text-purple-700 hover:underline border-2 p-2 no-underline"
                >
                  Cancel
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
