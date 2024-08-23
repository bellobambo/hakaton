"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import Loader from "./Loader";
import Background from "./Background";
import { UploadButton } from "@uploadthing/react";

function AuthUser() {
  const { user } = useUser();

  const [matricNumber, setMatricNumber] = useState("");
  const [hashedAddress, setHashedAddress] = useState("");
  const [image, setImage] = useState("");
  const [Name, setName] = useState("");
  const [balance, setBalance] = useState("");

  const handleMatricNumberChange = async (e) => {
    const value = e.target.value;
    setMatricNumber(value);

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

      const balanceWei = await web3.eth.getBalance(account.address);
      const balanceEth = web3.utils.fromWei(balanceWei, "ether");
      setBalance(balanceEth);
      console.log(balanceEth, "balance");
    } catch (error) {
      console.error("Error fetching balance:", error);
      setHashedAddress("");
      setBalance("");
    }
  };

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

  if (!user) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const handleCreateId = async (e) => {
    e.preventDefault();
  };

  return (
    <motion.div className="mt-[100px]" initial="hidden" animate="visible">
      <Background />
      <motion.div
        className="flex justify-center items-center"
        variants={textVariants}
      >
        Welcome, {user.firstName}!!!
      </motion.div>
      <motion.div
        className="flex flex-col justify-center items-center space-y-4 mt-4"
        variants={textVariants}
      >
        <p className="text-center text-[#7DD3FCB3]">
          Fill The Form To Request For Your University ID
        </p>

        <motion.div
          className="flex flex-col space-y-2"
          variants={inputVariants}
          custom={0}
        >
          <label className="text-[#7DD3FCB3]">Matric Number</label>
          <motion.input
            className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black"
            type="text"
            value={matricNumber}
            onChange={handleMatricNumberChange}
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>
        <motion.div
          className="flex flex-col space-y-2"
          variants={inputVariants}
          custom={2}
        >
          <label className="text-[#7DD3FCB3]">Name</label>
          <motion.input
            className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black"
            type="text"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>

        <motion.div
          className=" flex-col space-y-2 flex"
          variants={inputVariants}
          custom={2}
        >
          <label className="text-[#7DD3FCB3]">Wallet Address</label>
          <motion.input
            className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black"
            value={hashedAddress}
            readOnly
            type="text"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>

        <motion.div
          className=" flex-col space-y-2 flex"
          variants={inputVariants}
          custom={3}
        >
          <label className="text-[#7DD3FCB3]">Balance</label>
          <motion.input
            className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black"
            value={balance}
            readOnly
            type="text"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>

        <motion.div
          className="flex flex-col space-y-2"
          variants={inputVariants}
          custom={4}
        >
          <label className="text-[#7DD3FCB3]">Image (passport photo)</label>
          <UploadButton
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

        <motion.div
          className="flex flex-col space-y-2"
          variants={inputVariants}
          custom={5}
        >
          <label className="text-[#7DD3FCB3]">Signature</label>
          <motion.input
            className="border-b-2 border-[#7DD3FCB3] focus:outline-none text-black"
            type="text"
            whileFocus={{ scale: 1.05 }}
          />
        </motion.div>

        <motion.button
          className="mt-6 px-4 py-2 bg-[#7DD3FCB3] text-white rounded-lg hover:bg-[#7dd3fc] transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default AuthUser;
