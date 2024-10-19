"use client";

import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Web3 from "web3";
import Loader from "./Loader";
import Background from "./Background";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function AuthUser() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  const [matricNumber, setMatricNumber] = useState("CSC/2022/097");
  const [Private_Key, setPrivate_Key] = useState("");
  const [hashedAddress, setHashedAddress] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generateWalletFromMatricNumber = async (value) => {
    if (!value) {
      setHashedAddress("");
      setBalance("");
      return;
    }

    const web3 = new Web3();
    const hashedMatricNumber = web3.utils.sha3(value);
    console.log(hashedMatricNumber, "hashed matric number");

    try {
      const account = web3.eth.accounts.privateKeyToAccount(hashedMatricNumber);
      setHashedAddress(account.address);
      console.log("Private Key:", account.privateKey);
      setPrivate_Key(account.privateKey);
      const balanceWei = await web3.eth.getBalance(account.address);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);
      console.log(balanceEth, "balanceing");
    } catch (error) {
      console.error("Error fetching balance:", error);
      setHashedAddress("");
      setBalance("");
    }
  };

  useEffect(() => {
    generateWalletFromMatricNumber(matricNumber);
  }, [matricNumber]);

  const inputVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const handleCreateId = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading

    const payload = {
      Matric_Number: matricNumber,
      Full_Name: name || user.fullName,
      Passport: image,
      Phone: phone,
      Wallet: hashedAddress,
      Private_Key: Private_Key,
    };

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);

        router.push("/card");
      } else {
        console.error("Failed to create document:", await response.json());
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error creating document:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className=" flex justify-center py-10">
      <div className=" p-6 rounded-lg max-w-4xl  bg-black">
        <Background />

        <motion.form
          className=""
          initial="hidden"
          animate="visible"
          onSubmit={handleCreateId}
        >
          <motion.div className="" variants={textVariants}>
            <p className="text-xl font-medium mb-1.5">
              {/* Welcome, {user.fullName}. */}
            </p>
            <p className="text-white/60 mb-4 ">
              Confirm Details To Request/Access Your University ID
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4"
            variants={textVariants}
          >
            {/* Matric Number Input */}
            <motion.div
              className="flex flex-col space-y-2"
              variants={inputVariants}
              custom={0}
            >
              <label className="text-white/60">Matric Number</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                type="text"
                value={matricNumber}
                readOnly
                onChange={(e) => setMatricNumber(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Name Input */}
            <motion.div
              className="flex flex-col space-y-2"
              variants={inputVariants}
              custom={2}
            >
              <label className="text-white/60">Name</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Wallet Address Input */}
            <motion.div
              className="flex flex-col space-y-2"
              variants={inputVariants}
              custom={2}
            >
              <label className="text-white/60">Wallet Address</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                value={address}
                readOnly
                type="text"
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>
            {/*  Private Key */}

            <motion.div
              className="hidden flex-col space-y-2 "
              variants={inputVariants}
              custom={2}
            >
              <label className="text-white/60">Private Key</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                value={Private_Key}
                readOnly
                type="text"
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Balance Input */}
            <motion.div
              className="hidden flex-col space-y-2 "
              variants={inputVariants}
              custom={3}
            >
              <label className="text-white/60">Balance</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                value={balance}
                readOnly
                type="text"
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Phone Number Input */}
            <motion.div
              className="flex flex-col space-y-2"
              variants={inputVariants}
              custom={5}
            >
              <label className="text-white/60">Phone Number</label>
              <motion.input
                className="border-b-2 bg-transparent border-purple-900 focus:outline-none text-white/60 w-full max-w-xs"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              />
            </motion.div>

            <div></div>

            {/* Image Upload */}
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-between items-center flex-col">
            <motion.div
              className="flex flex-col space-y-2 justify-start"
              variants={inputVariants}
              custom={4}
            >
              <label className="text-white/60">Image (passport photo)</label>
              <UploadDropzone
                className="bg-[#581c87] "
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  if (res && Array.isArray(res) && res.length > 0) {
                    setImage(res[0].url);
                  }
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </motion.div>
            <motion.button
              className="mt-6 px-7 py-2 bg-purple-900 text-white rounded-md duration-300 font-medium text-center"
              // whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          </div>

          {/* Success Message */}
          {success && !loading && (
            <p className="text-white/60 mt-4">
              Submission Successful! Redirecting...
            </p>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}

export default AuthUser;
