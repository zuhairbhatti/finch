import React, { useState } from "react";
import axios from "axios";
import CompanySection from "./CompanySection.tsx";
import EmploymentSection from "./Employee.tsx";

export const options = [
  { label: "ADP Run", value: "adp_run" },
  { label: "Bamboo HR", value: "bamboo_hr" },
  { label: "Bamboo HR (API)", value: "bamboo_hr_api" },
  { label: "HiBob", value: "bob" },
  { label: "Gusto", value: "gusto" },
  { label: "Humaans", value: "humaans" },
  { label: "Insperity", value: "insperity" },
  { label: "Justworks", value: "justworks" },
  { label: "Namely", value: "namely" },
  { label: "Paychex Flex", value: "paychex_flex" },
  { label: "Paychex Flex (API)", value: "paychex_flex_api" },
  { label: "Paycom", value: "paycom" },
  { label: "Paycom (API)", value: "paycom_api" },
  { label: "Paylocity", value: "paylocity" },
  { label: "Paylocity (API)", value: "paylocity_api" },
  { label: "Personio", value: "personio" },
  { label: "Quickbooks", value: "quickbooks" },
  { label: "Rippling", value: "rippling" },
  { label: "Sage HR", value: "sage_hr" },
  { label: "Sapling", value: "sapling" },
  { label: "Squoia One", value: "sequoia_one" },
  { label: "Square Payroll", value: "square_payroll" },
  { label: "Trinet", value: "trinet" },
  { label: "Trinet (API)", value: "trinet_api" },
  { label: "Ulti Pro", value: "ulti_pro" },
  { label: "Wave", value: "wave" },
  { label: "Workday", value: "workday" },
  { label: "Zenefits", value: "zenefits" },
  { label: "Zenefits (API)", value: "zenefits_api" },
];

export const DataPage: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState([]);
  const [directoryData, setDirectoryData] = useState([]);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (selectedProvider) {
        setFetching(true);

        // Call the sandbox endpoint with the selected provider
        await axios.post("/sandbox/create", { provider_id: selectedProvider });

        // Get the selected company data from the sandbox endpoint
        try {
          const companyData = await axios.get(`/employer/company`);
          setCompanyData(companyData.data);
        } catch (companyError) {
          console.error("Error fetching company data:", companyError.response);
          setCompanyData([]); // Reset company data
        }

        // Get the selected directory data from the sandbox endpoint
        try {
          const directoryData = await axios.get("/employer/directory");
          setDirectoryData(directoryData.data);
        } catch (directoryError) {
          console.error(
            "Error fetching directory data:",
            directoryError.response,
          );
          setDirectoryData([]); // Reset directory data
          // Handle directory data error
        }

        setFetching(false);
      } else {
        console.error("Please select an option");
      }
    } catch (error) {
      console.error("Error:", error.response);
      setError(error.response.data.message);
      setFetching(false);
    }
  };

  return (
    <div className="data-page">
      <div className="select-section">
        <select
          id="provider-select"
          value={selectedProvider || ""}
          onChange={handleOptionChange}
        >
          <option value="">Select a provider</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button id="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="loading-section">
        {fetching && <div>Loading {selectedProvider} Data...</div>}
        {error && <div>{error}</div>}
      </div>
      {!fetching && companyData.length !== 0 && (
        <CompanySection companyData={companyData} />
      )}
      {!fetching && directoryData.length !== 0 && (
        <EmploymentSection directoryData={(directoryData as any).individuals} />
      )}
    </div>
  );
};
