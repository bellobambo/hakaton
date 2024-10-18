"use client";

import React from "react";
import { Button } from "../ui/button";
import { useAccount, useConnect } from "wagmi";
import CoinbaseButton from "@/app/Components/CoinbaseButton";
// import CoinbaseButton from "./Components/CoinbaseButton"; // import CoinbaseButton

export const Hero = () => {
  const { address, isConnected } = useAccount();
  const { connectors } = useConnect();

  return (
    <div>
      <div className="mx-auto w-[90%] py-16 flex flex-col-reverse lg:flex-row gap-10 ">
        <div className="flex-1">
          <h2 className="text-5xl font-semibold mb-3">
            Seamless Campus Experience: Identity, Payments, and Access - All in
            One Software.
          </h2>
          <h6 className="text-xl font-medium mb-5">
            Your key to effortless shopping, secure identity verification, and
            hassle-free campus activities.
          </h6>

          <div>
            {isConnected ? (
              <div>
                <p>Connected with address: {address}</p>
              </div>
            ) : (
              <div>
                <h2>Connect to Coinbase Wallet</h2>
                {connectors
                  .filter((connector) => connector.name === "Coinbase Wallet")
                  .map((connector, index) => (
                    <CoinbaseButton key={index} connector={connector} />
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Hero;
