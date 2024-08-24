"use client";

import React, { useEffect, useState } from "react";
import Background from "../Components/Background";

const Page = () => {
  const [fetchedData, setFetchedData] = useState([]);

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
      }
    };

    handleData();
  }, []);

  const latestData =
    fetchedData.length > 0 ? fetchedData[fetchedData.length - 1] : null;

  return (
    <div>
      <Background />
      <div>
        {/* <h1>Latest Fetched Data</h1> */}
        {latestData ? (
          <div>
            <p>
              <strong>Full Name:</strong> {latestData.Full_Name}
            </p>
            <p>
              <strong>Matric Number:</strong>{" "}
              {latestData.Matric_Number || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {latestData.Phone || "N/A"}
            </p>
            {latestData.Passport && (
              <img
                src={latestData.Passport}
                alt={latestData.Full_Name}
                style={{ width: "100px" }}
              />
            )}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
