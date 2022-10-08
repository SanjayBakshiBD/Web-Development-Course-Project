// Api key 7226f8e61a2303c758f3db3b5b675c62-us6

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "7226f8e61a2303c758f3db3b5b675c62-us6",
  server: "us6",
});

async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

run();
