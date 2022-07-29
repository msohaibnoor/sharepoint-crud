import * as sprequest from "sp-request";
import dotenv from "dotenv";
dotenv.config();

// console.log("===", process.env.password, process.env.user);

const credentialOptions = {
  responseType: "json",
  resolveBodyOnly: false,
  rejectUnauthorized: false,
  retry: 0,
  username: "sohaib.noor@aquila360.com",
  password: process.env.password,
  online: true,
};

let spr = sprequest.create(credentialOptions);

const getSalaries = async (req, res) => {
  console.log("Reached here");
  try {
    let response = await spr.get(
      "https://aquila360.sharepoint.com/sites/SPFxDevs/_api/lists/GetByTitle('Payslips')/Items?$select=Name,Month,Year,TotatSalary,Deduction,Reimbursements,ID"
    );
    if (response) {
      console.log(response);
      console.log(response.body.d.results);
      res.json({
        ok: true,
        salaries: response.body.d.results,
      });
    }
  } catch (err) {
    console.log(err);
  }

  // .then((response) => {
  //   console.log(response.body.d.results);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //   res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const addSalaryRecord = async (req, res) => {
  console.log("Reached here");
  spr
    .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
    .then((digest) => {
      return spr.post(
        `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Payslips')/items`,
        {
          headers: {
            "X-RequestDigest": digest,
          },
          body: {
            __metadata: { type: `SP.Data.PayslipsListItem` },
            Title: "Test",
            Name: "Test",
            Month: "Test",
          },
        }
      );
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // .then((response) => {
  //   console.log(response.body.d.results);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //   res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const updateSalaryRecord = async (req, res) => {
  console.log("Reached here");
  spr
    .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
    .then((digest) => {
      return spr.post(
        `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Payslips')/items(4)`,
        {
          headers: {
            "X-HTTP-Method": "MERGE",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
          },
          body: {
            __metadata: { type: `SP.Data.PayslipsListItem` },
            Title: "Test",
            Name: "Test",
            Month: "Test",
          },
        }
      );
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // .then((response) => {
  //   console.log(response.body.d.results);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //   res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const deleteSalaryRecord = async (req, res) => {
  console.log("Reached here");
  spr
    .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
    .then((digest) => {
      return spr.delete(
        `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Payslips')/items(5)`,
        {
          headers: {
            "X-HTTP-Method": "DELETE",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
          },
          // body: {
          //   __metadata: { type: `SP.Data.PayslipsListItem` },
          //   Title: "Test",
          //   Name: "Test",
          //   Month: "Test",
          // },
        }
      );
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  // .then((response) => {
  //   console.log(response.body.d.results);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  //   res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

export { getSalaries, addSalaryRecord, deleteSalaryRecord, updateSalaryRecord };
