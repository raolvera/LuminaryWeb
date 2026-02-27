exports.handler = async function (event) {
  const data = JSON.parse(event.body);
  const { user } = data;

  const adminEmails = ["rg027941@gmail.com"];

  const responseBody = adminEmails.includes(user.email)
    ? { app_metadata: { roles: ["admin"] } }
    : {};

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};
