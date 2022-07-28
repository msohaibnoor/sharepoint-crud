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
  console.log(process.env.password, process.env.user);
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

export { getSalaries };
