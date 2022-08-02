import dotenv from "dotenv";
import spr from "../config/connection.js";
dotenv.config();

const getEmployee = async (req, res) => {
  try {
    const email = req.user;
    let response = await spr.get(
      `https://aquila360.sharepoint.com/sites/SPFxDevs/_api/lists/GetByTitle('Employees')/items?$filter=Employee/EMail%20eq%20%27${email}%27&$select=ID,Name,Designation,Joining_Date`
    );
    if (response) {
      //   console.log(response);
      console.log(response.body.d.results[0]);
      res.json({
        ok: true,
        employee: response.body.d.results[0],
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export { getEmployee };
