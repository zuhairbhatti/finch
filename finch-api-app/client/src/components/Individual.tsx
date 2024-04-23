import React from "react";

interface ResponseData {
  id?: string;
  first_name?: string;
  middle_name?: string | null;
  last_name?: string;
  preferred_name?: string | null;
  emails?: { data: string; type: string }[];
  phone_numbers?: { data: string; type: string }[];
  gender?: string;
  ethnicity?: string;
  dob?: string;
  residence?: {
    line1?: string;
    line2?: string | null;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
}

interface UserDetailsProps {
  individualData: ResponseData;
}

const UserDetails: React.FC<UserDetailsProps> = ({ individualData }) => {
  return (
    <div className="user-details">
      {individualData.id && <h2>Individual Details</h2>}
      {individualData.id && <p id="id">ID: {individualData.id}</p>}
      {individualData.first_name && (
        <p id="first-name">First Name: {individualData.first_name}</p>
      )}
      {individualData.middle_name && (
        <p id="middle-name">Middle Name: {individualData.middle_name}</p>
      )}
      {individualData.last_name && (
        <p id="last-name">Last Name: {individualData.last_name}</p>
      )}
      {individualData.preferred_name && (
        <p id="preferred-name">
          Preferred Name: {individualData.preferred_name}
        </p>
      )}
      {individualData.emails && individualData.emails.length > 0 && (
        <div>
          <h3>Emails</h3>
          <ul className="emails-list">
            {individualData.emails.map((email, index) => (
              <li key={index}>
                Type: {email.type}, Data: {email.data}
              </li>
            ))}
          </ul>
        </div>
      )}
      {individualData.phone_numbers &&
        individualData.phone_numbers.length > 0 && (
          <div>
            <h3>Phone Numbers</h3>
            <ul className="phone-numbers-list">
              {individualData.phone_numbers.map((phone, index) => (
                <li key={index}>
                  Type: {phone.type}, Data: {phone.data}
                </li>
              ))}
            </ul>
          </div>
        )}
      {individualData.gender && (
        <p id="gender">Gender: {individualData.gender}</p>
      )}
      {individualData.ethnicity && (
        <p id="ethnicity">Ethnicity: {individualData.ethnicity}</p>
      )}
      {individualData.dob && (
        <p id="dob">Date of Birth: {individualData.dob}</p>
      )}
      {individualData.residence && (
        <div>
          <h3>Residence</h3>
          {individualData.residence.line1 && (
            <p id="line1">Line 1: {individualData.residence.line1}</p>
          )}
          {individualData.residence.line2 && (
            <p id="line2">Line 2: {individualData.residence.line2}</p>
          )}
          {individualData.residence.city && (
            <p id="city">City: {individualData.residence.city}</p>
          )}
          {individualData.residence.state && (
            <p id="state">State: {individualData.residence.state}</p>
          )}
          {individualData.residence.postal_code && (
            <p id="postal-code">
              Postal Code: {individualData.residence.postal_code}
            </p>
          )}
          {individualData.residence.country && (
            <p id="country">Country: {individualData.residence.country}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
