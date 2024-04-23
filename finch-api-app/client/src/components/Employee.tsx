import axios from "axios";
import React, { useState } from "react";
import UserDetails from "./Individual.tsx";
import Employment from "./Employment.tsx";

interface DropdownProps {
  directoryData: any[]; // Replace 'any' with the actual type of directoryData
}

interface IndividualData {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  preferred_name: string | null;
  emails: { data: string; type: string }[];
  phone_numbers: { data: string; type: string }[];
  gender: string;
  ethnicity: string;
  dob: string;
  residence: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

interface EmployeeData {
  id?: string;
  first_name?: string;
  middle_name?: string | null;
  last_name?: string;
  title?: string;
  manager?: { id: string } | null;
  department?: { name: string } | null;
  employment?: { type: string; subtype: string } | null;
  start_date?: string;
  end_date?: string | null;
  is_active?: boolean;
  class_code?: string;
  location?: {
    line1?: string;
    line2?: string | null;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  } | null;
  income?: {
    unit?: string;
    amount?: number;
    currency?: string;
    effective_date?: string;
  } | null;
  income_history?: {
    unit?: string;
    amount?: number;
    currency?: string;
    effective_date?: string;
  }[];
  custom_fields?: { name: string; value: string }[];
}

const EmploymentSection: React.FC<DropdownProps> = ({ directoryData }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [fetchingEmployeeData, setFetchingEmployeeData] = useState(false);
  const [individualData, setIndividualData] = useState<IndividualData>();
  const [employmentData, setEmploymentData] = useState<EmployeeData>();
  const [error, setError] = useState("");
  // const [data, setData] = useState<any>();

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEmployee(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedEmployee) {
      setFetchingEmployeeData(true);
      const data = {
        requests: [
          {
            individual_id: selectedEmployee,
          },
        ],
      };
      setIndividualData(undefined);
      try {
        // Call the sandbox endpoint with the selected employee
        const individualResponse = await axios.post(
          "/employer/individual",
          data,
        );
        setIndividualData(individualResponse.data);
        // Get the selected employment data from the sandbox endpoint
      } catch (error) {
        console.error("Error:", error.response);
        setError("Failed to fetch Individual Data. Please try again.");
        setIndividualData(undefined);
      }

      try {
        const employmentResponse = await axios.post(
          `/employer/employment`,
          data,
        );
        setEmploymentData(employmentResponse.data);
      } catch (employmentError) {
        console.error(
          "Error fetching employment data:",
          employmentError.response,
        );
        setError("Failed to fetch Employment Data. Please try again.");
        setEmploymentData(undefined);
      }

      setFetchingEmployeeData(false);
    }
  };

  return (
    <div>
      <h3>Select an individual:</h3>
      <select
        id="individual-select"
        className="individual-select"
        value={selectedEmployee || ""}
        onChange={handleOptionChange}
      >
        <option value="">Select an individual</option>
        {directoryData.map((individual) => (
          <option key={individual.id} value={individual.id}>
            {`${individual.first_name || ""} ${individual.middle_name || ""} ${individual.last_name || ""}`}
          </option>
        ))}
      </select>
      <button
        id="submit-button"
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div className="loading-section">
        {fetchingEmployeeData && <div>Loading Data...</div>}
        {error && <div className="error-employee">{error}</div>}
      </div>
      {!fetchingEmployeeData && individualData && (
        <UserDetails individualData={individualData} />
      )}
      {!fetchingEmployeeData && employmentData && (
        <Employment employmentData={employmentData} />
      )}
    </div>
  );
};

export default EmploymentSection;
