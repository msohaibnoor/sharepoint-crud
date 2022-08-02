import * as sprequest from "sp-request";

const credentialOptions = {
  responseType: "json",
  resolveBodyOnly: false,
  rejectUnauthorized: false,
  retry: 0,
  username: "sohaib.noor@aquila360.com",
  password: process.env.password,
  online: true,
};

const spr = sprequest.create(credentialOptions);
export default spr;
