import { faDownload, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const paymentMethods = [
  { value: "credit", label: "Credit Card" },
  { value: "bank", label: "Bank Transfer" },
  { value: "check", label: "Check" },
  { value: "cash", label: "Cash" },
];


const PaymentDetailsForm = () => {
  const [method, setMethod] = useState("bank");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="">
      <div className="bg-white p-8 rounded-2xl">
        <div className="flex flex-row justify-between items-center mb-4">
        <div className="text-2xl font-semibold mb-6">Payment Details</div>
        <div className="flex flex-row gap-3 items-center">
          <div>
            <FontAwesomeIcon icon={faFilter} className="text-gray-500 mr-2 items-center bg-blue-300 rounded-lg  px-4 py-3 text-slate-900" />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl flex flex-row gap-3">
              <span>Export</span>
              <span>
                <FontAwesomeIcon icon={faDownload} />
              </span>
            </button>
          </div>
        </div>
      </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mt-6" >
          {/* Row 1 */}
          <div className="col-span-2">
            <label className="text-sm text-gray-700">Enter Copen Code</label>
            <input className="mt-1 w-3/6 block rounded-md bg-gray-100 h-10 pl-3 focus:outline-none" />
          </div>
          <div className="col-span-1">
            <label className="text-sm text-gray-700">Payment Amount</label>
            <input type="number" className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none" />
          </div>
          {/* Row 2 */}
          <div className="col-span-1">
            <label className="text-sm text-gray-700">Payment Date</label>
            <div className="relative">
              <input
                type="date"
                defaultValue={formattedDate}
                className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none pr-8"
              />
            </div>
          </div>
          {/* Row 3: Payment Method */}
          <div className="col-span-2">
            <label className="text-sm text-gray-700">Payment Method</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-3 mt-2">
              {paymentMethods.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setMethod(m.value)}
                  className={`rounded-md px-5 py-2 text-sm font-semibold
                    ${method === m.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"}
                  `}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          {/* Row 4: Account details */}
          <div>
            <label className="text-sm text-gray-700">Account Holder Name</label>
            <input className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Select Bank Name</label>
            <input className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-700">Account No</label>
            <input className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none" />
          </div>
          <div>
            <label className="text-sm text-gray-700">IFFC Code</label>
            <input className="mt-1 w-full rounded-md bg-gray-100 h-10 px-3 focus:outline-none" />
          </div>
          {/* Row 5: Actions, full width */}
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button type="button" className="bg-gray-200 px-6 py-2 rounded text-gray-700 font-semibold">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded font-semibold">
              Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
