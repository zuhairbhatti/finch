import React from "react";

interface ResponseData {
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

interface EmployeeDetailsProps {
  employmentData: ResponseData;
}

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  employmentData,
}) => {
  return (
    <div className="employee-details">
      {employmentData.id && <h2>Employee Details</h2>}
      {employmentData.id && (
        <p className="employee-id">ID: {employmentData.id}</p>
      )}
      {employmentData.first_name && (
        <p className="employee-first-name">
          First Name: {employmentData.first_name}
        </p>
      )}
      {employmentData.middle_name && (
        <p className="employee-middle-name">
          Middle Name: {employmentData.middle_name}
        </p>
      )}
      {employmentData.last_name && (
        <p className="employee-last-name">
          Last Name: {employmentData.last_name}
        </p>
      )}
      {employmentData.title && (
        <p className="employee-title">Title: {employmentData.title}</p>
      )}
      {employmentData.manager && employmentData.manager.id && (
        <p className="employee-manager-id">
          Manager ID: {employmentData.manager.id}
        </p>
      )}
      {employmentData.department && employmentData.department.name && (
        <p className="employee-department">
          Department: {employmentData.department.name}
        </p>
      )}
      {employmentData.employment && employmentData.employment.type && (
        <p className="employee-employment-type">
          Employment Type: {employmentData.employment.type}
        </p>
      )}
      {employmentData.employment && employmentData.employment.subtype && (
        <p className="employee-employment-subtype">
          Employment Subtype: {employmentData.employment.subtype}
        </p>
      )}
      {employmentData.start_date && (
        <p className="employee-start-date">
          Start Date: {employmentData.start_date}
        </p>
      )}
      {employmentData.end_date && (
        <p className="employee-end-date">End Date: {employmentData.end_date}</p>
      )}
      {employmentData.is_active !== undefined && (
        <p className="employee-is-active">
          Is Active: {employmentData.is_active ? "Yes" : "No"}
        </p>
      )}
      {employmentData.class_code && (
        <p className="employee-class-code">
          Class Code: {employmentData.class_code}
        </p>
      )}
      {employmentData.location && (
        <div className="employee-location">
          <h3 className="employee-location-heading">Location</h3>
          {employmentData.location.line1 && (
            <p className="employee-location-line1">
              Line 1: {employmentData.location.line1}
            </p>
          )}
          {employmentData.location.line2 && (
            <p className="employee-location-line2">
              Line 2: {employmentData.location.line2}
            </p>
          )}
          {employmentData.location.city && (
            <p className="employee-location-city">
              City: {employmentData.location.city}
            </p>
          )}
          {employmentData.location.state && (
            <p className="employee-location-state">
              State: {employmentData.location.state}
            </p>
          )}
          {employmentData.location.postal_code && (
            <p className="employee-location-postal-code">
              Postal Code: {employmentData.location.postal_code}
            </p>
          )}
          {employmentData.location.country && (
            <p className="employee-location-country">
              Country: {employmentData.location.country}
            </p>
          )}
        </div>
      )}
      {employmentData.income && (
        <div className="employee-income">
          <h3 className="employee-income-heading">Income</h3>
          {employmentData.income.unit && (
            <p className="employee-income-unit">
              Unit: {employmentData.income.unit}
            </p>
          )}
          {employmentData.income.amount && (
            <p className="employee-income-amount">
              Amount: {employmentData.income.amount}
            </p>
          )}
          {employmentData.income.currency && (
            <p className="employee-income-currency">
              Currency: {employmentData.income.currency}
            </p>
          )}
          {employmentData.income.effective_date && (
            <p className="employee-income-effective-date">
              Effective Date: {employmentData.income.effective_date}
            </p>
          )}
        </div>
      )}
      {employmentData.income_history &&
        employmentData.income_history.length > 0 && (
          <div className="employee-income-history">
            <h3 className="employee-income-history-heading">Income History</h3>
            {employmentData.income_history.map((history, index) => (
              <div key={index} className="employee-income-history-item">
                {history.unit && (
                  <p className="employee-income-history-unit">
                    Unit: {history.unit}
                  </p>
                )}
                {history.amount && (
                  <p className="employee-income-history-amount">
                    Amount: {history.amount}
                  </p>
                )}
                {history.currency && (
                  <p className="employee-income-history-currency">
                    Currency: {history.currency}
                  </p>
                )}
                {history.effective_date && (
                  <p className="employee-income-history-effective-date">
                    Effective Date: {history.effective_date}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      {employmentData.custom_fields &&
        employmentData.custom_fields.length > 0 && (
          <div className="employee-custom-fields">
            <h3 className="employee-custom-fields-heading">Custom Fields</h3>
            {employmentData.custom_fields.map((field, index) => (
              <div key={index} className="employee-custom-field">
                {field.name && (
                  <p className="employee-custom-field-name">
                    Name: {field.name}
                  </p>
                )}
                {field.value && (
                  <p className="employee-custom-field-value">
                    Value: {field.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default EmployeeDetails;
