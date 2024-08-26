"use client";

import React, { useEffect, useState } from "react";
import Background from "../Components/Background";
import Loader from "../Components/Loader";
import QRCode from "react-qr-code";

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await fetch("/api/create");
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);
          setFetchedData(data.data);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    handleData();
  }, []);

  const latestData =
    fetchedData.length > 0 ? fetchedData[fetchedData.length - 1] : null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Background />
      {loading ? (
        <Loader /> // Using your Loader component
      ) : latestData ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 relative">
          <div className="flex justify-center mb-4">
            {latestData.Passport && (
              <img
                // src={latestData.Passport}
                src="/icon.jpeg"
                alt={latestData.Full_Name}
                className="rounded-full border border-gray-300"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </div>
          <div className="text-center mb-4">
            <p className="text-lg text-black font-semibold">
              {latestData.Full_Name}
            </p>
            <p className="text-sm text-gray-600">
              Matric Number: {latestData.Matric_Number || "N/A"}
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <QRCode
              value={`Wallet ID : ${latestData.Wallet || "N/A"}, Phone : ${
                latestData.Phone || "N/A"
              }`}
              size={100}
            />
          </div>
          {latestData.Passport && (
            <div className="flex justify-center mt-4">
              <img
                src={latestData.Passport}
                alt="Chip Icon"
                className="rounded-full"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          )}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default Page;
