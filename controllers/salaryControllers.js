import * as sprequest from "sp-request";
import dotenv from "dotenv";
dotenv.config();

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
  // console.log("Reached here");
  // console.log(req.user);
  try {
    // let response = await spr.get(
    //   "https://aquila360.sharepoint.com/sites/SPFxDevs/_api/lists/GetByTitle('Payslips')/Items?$select=Name,Month,Year,TotatSalary,Deduction,Reimbursements,ID"
    // );
    const email = req.user;
    let response = await spr.get(
      `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/lists/GetByTitle('Payslips')/items?$filter=Employee/EMail%20eq%20%27${email}%27&$select=Id,Title,Month,Name,TotatSalary,Reimbursements,Year,Deductions`
    );
    if (response) {
      // console.log(response);
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
  console.log(req.body);
  const { Name, Month } = req.body;
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
            Title: "Mr",
            Name: Name,

            Month,
          },
        }
      );
    })
    .then((data) => {
      console.log(data.body);
      res.json({ msg: "Item added successfully", item: data.body.d });
    })
    .catch((err) => {
      console.log(err);
    });
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
      res.json({ data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteSalaryRecord = async (req, res) => {
  console.log("Reached here");
  spr
    .requestDigest("https://aquila360.sharepoint.com/sites/SPFxDevs")
    .then((digest) => {
      return spr.delete(
        `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/web/lists/GetByTitle('Payslips')/items(11)`,
        {
          headers: {
            "X-HTTP-Method": "DELETE",
            "X-RequestDigest": digest,
            "IF-MATCH": "*",
          },
        }
      );
    })
    .then((data) => {
      console.log(data);
      res.json({ msg: "Item deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getSalaries, addSalaryRecord, deleteSalaryRecord, updateSalaryRecord };
