import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import * as sprequest from "sp-request";
import axios from "axios";
dotenv.config();
import salaryRoutes from "./routes/salaryRoutes.js";
import employeesRoutes from "./routes/employeesRoutes.js";
app.use(cors());
app.use(express.json());
// const credentialOptions = {
//   responseType: "json",
//   resolveBodyOnly: false,
//   rejectUnauthorized: false,
//   retry: 0,
//   //   username: "sohaib.noor@aquila360.com",
//   username: process.env.user,
//   password: process.env.password,
//   online: true,
// };
// let spr = sprequest.create(credentialOptions);

// spr
//   .get(
//     "https://aquila360.sharepoint.com/sites/SPFxDevs/_api/lists/GetByTitle('Employees')/Fields/GetById('d3ab004e-feec-4a95-91f5-8e698fce4b9c')"
//   )
//   .then((response) => {
//     console.log(response.body);
//   })
//   .catch((err) => {
//     console.log(err);
//     // console.log("Ohhh, something went wrong...");
//   });

// adding new item to the list

// spr
//   .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
//   .then((digest) => {
//     return spr.post(
//       `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Employees')/items`,
//       {
//         headers: {
//           "X-RequestDigest": digest,
//         },
//         body: {
//           __metadata: { type: `SP.Data.EmployeesListItem` },
//           Title: "Test",
//           Name: "Test",
//           Designation: "Test",
//         },
//       }
//     );
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//updating list title

// spr
//   .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
//   .then((digest) => {
//     return spr.patch(
//       "https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Employees')/fields/getbytitle('Designation')",
//       {
//         body: {
//           __metadata: { type: "SP.FieldText" },
//           //   Designation: "Desupdated",
//           Description: "Updated Description of the fiellld",
//         },
//         headers: {
//           "X-RequestDigest": digest,
//           "X-HTTP-Method": "PATCH",
//           "IF-MATCH": "*",
//         },
//       }
//     );
//   })
//   .then(
//     (response) => {
//       if (response.statusCode === 204) {
//         console.log("List title updated!");
//         // console.log(response);
//       }
//     },
//     (err) => {
//       if (err.statusCode === 404) {
//         console.log("List not found!");
//       } else {
//         console.log(err);
//       }
//     }
//   );

const feTchList = async () => {
  const config = {
    Accept: "application/json;odata=verbose",
    headers: {
      Authorization:
        "Bearer " +
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJhcGk6Ly93cC1wYXlyb2xsLWFwaS5hcXVpbGEzNjAuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYjM0NmM4MDgtYTRhZS00ODk5LWJlMjctNzkxMmQ0YzBkY2UzLyIsImlhdCI6MTY1ODc0ODY3NywibmJmIjoxNjU4NzQ4Njc3LCJleHAiOjE2NTg3NTM1NDQsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF5VktNdDk3SlhqSTQyZG5ZVmJCSUhMZ0cxdm5kN1N6akN6aTFzTFc4UFBzM2FtVUJoeEZOa1Q0ZnBUN2YxNFd2bG93R05HTXB3dVNZRkw4MHJTdHdwZVE5d3hlZ21aeHNvS3Jham42czlBaz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiYjYwMGZhYzItMjdjYy00ZTZmLWJkMDUtMTk3M2JhYzQzNGJhIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJSYXphIiwiZ2l2ZW5fbmFtZSI6Ik5hemltIiwiaXBhZGRyIjoiNzIuMjU1LjUuMTgyIiwibmFtZSI6Ik5hemltIFJhemEiLCJvaWQiOiI2ODdkZjhkYS00MTgxLTQyMTEtYmI1ZS0yNjEwN2U2YmQ4YTQiLCJyaCI6IjAuQVZ3QUNNaEdzNjZrbVVpLUoza1MxTURjNDhXcTRGcHJ3VVJNbG9Yb0dhaGdmLXhjQUR3LiIsInNjcCI6IlBheXNsaXBzLlJlYWRXcml0ZS5BbGwiLCJzdWIiOiJnalgxNHI1d0poclpjNnhBTXFVOTJISUdJY1N6V3ItZ1VhcVByX0FFSTlnIiwidGlkIjoiYjM0NmM4MDgtYTRhZS00ODk5LWJlMjctNzkxMmQ0YzBkY2UzIiwidW5pcXVlX25hbWUiOiJuYXppbS5yYXphQGFxdWlsYTM2MC5jb20iLCJ1cG4iOiJuYXppbS5yYXphQGFxdWlsYTM2MC5jb20iLCJ1dGkiOiJ3ZVR4YWdaV3IwdUN6WGZreW5JdkFBIiwidmVyIjoiMS4wIn0.hLLN1-R7A30Q9AFjIKmHUoZ0rrqIPCaRREtp9xs3mW3sIZQJATSjRzfNy0sF9Z-9tg7VKLj-cD4XX__nNSNqcp0O9Dgigl289u1S7FcvAuRztcZlPz40z635kJR918lcnZGNnICjXBtqmtwaxhy9-qAz5-fo5-URA5amtecEYHkw_Xvy24sfOdH85LGUW6-MqYe2inxDhwyN39MEJpU1pBRouzhPO6-lhhyYPpj4k5tVoVz2sbQ6AtOBfWFSXTuvWarTRBK0t8ajR9kS3NC4TVnJoySBw1Ui6wbYSFGPmPJwB2DlKCJxlftJyDO5aDwY-xZBLzZ3qeYtTjL4UZLOyQ",
    },
  };

  try {
    const response = await axios.get(
      "https://aquila360.sharepoint.com/sites/dev/_api/web/lists/GetByTitle('leaves')",
      config
    );
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

// feTchList();

// import * as spauth from "node-sp-auth";
// import * as request from "request-promise";

// //get auth options

// try {
//   spauth
//     .getAuth(
//       "https://aquila360.sharepoint.com/sites/SPFxDevs/",
//       credentialOptions
//     )
//     .then((options) => {
//       //perform request with any http-enabled library (request-promise in a sample below):
//       let headers = options.headers;
//       headers["Accept"] = "application/json;odata=verbose";

//       request
//         .get({
//           url: "https://aquila360.sharepoint.com/sites/dev/_api/web/lists/",
//           headers,
//         })
//         .then((response) => {
//           //process data
//           console.log(response);
//         });
//     });
// } catch (e) {
//   console.log(e);
// }
app.use("/api/salaries", salaryRoutes);
app.use("/api/employees", employeesRoutes);
const port = 5000;
app.listen(port, () => console.log("Server is running on port " + port));
