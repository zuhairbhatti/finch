import React from "react";

interface CompanySectionProps {
  companyData: any;
}

const notAvailable = "N/A";

export const CompanySection: React.FC<CompanySectionProps> = ({
  companyData,
}) => {
  return (
    <div className="company-section">
      <h2>Company Details</h2>
      {companyData.id && <p id="company-id">ID: {companyData.id}</p>}
      {companyData.legal_name && (
        <p id="legal-name">Legal Name: {companyData.legal_name}</p>
      )}
      {companyData.entity?.type && (
        <p id="entity-type">Entity Type: {companyData.entity.type}</p>
      )}
      {companyData.entity?.subtype && (
        <p id="entity-subtype">Entity Subtype: {companyData.entity.subtype}</p>
      )}
      {companyData.ein && <p id="ein">EIN: {companyData.ein}</p>}
      {companyData.primary_email && (
        <p id="primary-email">Primary Email: {companyData.primary_email}</p>
      )}
      {companyData.primary_phone_number && (
        <p id="primary-phone-number">
          Primary Phone Number: {companyData.primary_phone_number}
        </p>
      )}
      <h3>Departments</h3>
      <ul className="departments-list">
        {companyData.departments?.map((department: any, index: number) => (
          <li key={index}>{department.name}</li>
        ))}
      </ul>
      <h3>Locations</h3>
      <ul className="locations-list">
        {companyData.locations?.map((location: any, index: number) => (
          <li key={index}>
            {location.line1}, {location.line2}, {location.city},{" "}
            {location.state}, {location.postal_code}, {location.country}
          </li>
        ))}
      </ul>
      <h3>Accounts</h3>
      <ul className="accounts-list">
        {companyData.accounts?.map((account: any, index: number) => (
          <li key={index}>
            Routing Number: {account.routing_number || notAvailable}, Account
            Name: {account.account_name || notAvailable}, Institution Name:{" "}
            {account.institution_name || notAvailable}, Account Type:{" "}
            {account.account_type || notAvailable}, Account Number:{" "}
            {account.account_number || notAvailable}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanySection;
