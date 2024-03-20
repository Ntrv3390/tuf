"use client";

import { useState, useEffect } from "react";
import { getOutput } from "@/utils/output";
import { getBatchedOutput } from "@/utils/output";

const Page = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/getData");
        const result = await response.json();
        setData(result.results);
        setIsLoading(false);
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen mt-24 lg:px-40 flex flex-col justify-start items-center">
      <div className="relative overflow-x-auto w-full">
        <div className="text-blue-900 text-center mb-10 text-2xl text font-bold">
          Cached with <span className="text-red-600">Redis</span>🔥
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-blue-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              <th scope="col" className="px-6 py-3">
                Stdin
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Output (Judge0 API)
              </th> */}
              <th scope="col" className="px-6 py-3">
                Added On
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr className="text-center flex justify-center items-center font-bold text-blue-900">
                <td colSpan="5" className="text-center mt-10">Loading....</td>
              </tr>
            )}
            {!isLoading &&
              data.map((res, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {res.username}
                  </td>
                  <td className="px-6 py-4">{res.lang}</td>
                  <td className="px-6 py-4">
                    {res.stdin === "" ? "NA" : res.stdin}
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      readOnly
                      id="code"
                      rows="3"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={
                        res.code.length > 100
                          ? `${res.code.slice(0, 100)}...`
                          : res.code
                      }
                    />
                  </td>
                  {/* <td className="px-6 py-4">{getBatchedOutput(getOutput(res.code, res.stdin, (res.lang === 'c++' ? 76 : res.lang === 'java' ? 91 : res.lang === 'python' ? 92 : 93)))}</td> */}
                  <td className="mt-7">
                    {new Date(res.added_on).toLocaleDateString()} <br />
                    {new Date(res.added_on).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
