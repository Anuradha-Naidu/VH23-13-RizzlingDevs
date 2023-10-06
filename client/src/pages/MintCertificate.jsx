import React, { useState } from "react";
import { courses } from "../utils/data";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import mint from "../img/mint.json"

const MintCertificate = () => {
  const host = "https://linkedblocks.onrender.com";
  let navigate = useNavigate();
  const [candidateName, setCandidateName] = useState("");
  const [course, setCourse] = useState(null);
  const [expiryDate, setexpiryDate] = useState(365);
  const [organizationName, setorganizationName] = useState(null)

  const mintCertificateOnChain = async() => {
    const token = localStorage.getItem('token').toString();
    const response = await fetch(`${host}/api/certificate/createcertificate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({
        candidateName:candidateName,
        orgName:organizationName,
        courseName:course,
        duration:expiryDate
    }),
    });
    console.log(response)
    const json = await response.json();
    if (json.success) {
      alert("Swayam Karle Generated New Certificate check Console");
      console.log("Name: ",json.saveCertificate.candidateName, " Minted Certificcate with name : ",json.saveCertificate.courseName);
      
      console.log(`https://sepolia.etherscan.io/tx/${json.result_hash}`)
    } else {
      alert("Login with proper credentials")
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center md:mt-36 mt-12">
      <div className="w-[90%] md:w-[50%] border-2 border-purpleColor shadow-[5px_5px_0px_0px_rgba(109,40,217)] rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="Tell me your name..."
          className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
        />
      </div> */}
      <Lottie
          animationData={mint}
          className="border md:border-none border-dotted border-purpleColor border-2 bg-white md:bg-transparent rounded-lg"
        />
        <div className="w-full">
          <select
            onChange={(e) => setCourse(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white w-full">
              Select Course
            </option>
            {courses &&
              courses.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.certificateName}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setorganizationName(e.target.value)}
            className="outline-none w-full text-base border-b border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Organization
            </option>
            {courses &&
              courses.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.organization}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full py-2 border-b bg-white rounded p-4 border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
            placeholder="Enter Name"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full py-2 border-b bg-white rounded p-4 border-gray-300 flex items-center gap-2">
          <input
            type="text"
            required
            value={expiryDate}
            onChange={(e) => setexpiryDate(e.target.value)}
            placeholder="Enter Expiry Date"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className=" w-full">
          <button
            type="button"
            className=" ml-0 border border-black bg-purpleColor text-white  md:ml-auto w-full md:w-auto border-none outline-none bg-lightBlue px-12 py-2 rounded-lg text-lg font-semibold"
            onClick={mintCertificateOnChain}
          >
            Mint Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintCertificate;
