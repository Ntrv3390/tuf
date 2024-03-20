"use client";

import { useState } from "react";

const Page = () => {
  const [data, setData] = useState({
    username: "",
    lang: "c++",
    stdin: "",
    code: "",
  });
  const [resMsg, setResMsg] = useState("");
  const handleFormChange = (e) => {
    setData(prevData => {
      return { ...prevData, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      setResMsg(res.message)
      console.log(res);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen mt-10 px-60 flex flex-col justify-center items-center">
      <div className="text-blue-900 text-2xl text font-bold">
        {resMsg}
      </div>
      <form className="mx-auto min-w-full">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            value={data.username}
            onChange={handleFormChange}
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="lang"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select preferred language
          </label>
          <select
            value={data.lang}
            onChange={handleFormChange}
            id="lang"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={"c++"}>C++</option>
            <option value={"java"}>Java</option>
            <option value={"python"}>Python</option>
            <option value={"js"}>Javascript</option>
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="stdin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            StdIN (optional)
          </label>
          <input
            value={data.stdin}
            onChange={handleFormChange}
            type="text"
            id="stdin"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Enter Standard Input"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="code"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Source Code
          </label>
          <textarea
            value={data.code}
            onChange={handleFormChange}
            id="code"
            rows="10"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add your source code here..."
          ></textarea>
        </div>
        <div className="mb-5">
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
