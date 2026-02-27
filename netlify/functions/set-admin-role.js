const ADMIN_EMAILS = ["rg027941@gmail.com"];

exports.handler = async function (event, context) {
  const { identity, user } = context.clientContext || {};

  if (!identity || !user) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  if (!ADMIN_EMAILS.includes(user.email)) {
    return { statusCode: 200, body: JSON.stringify({ message: "No role change needed" }) };
  }

  const currentRoles = (user.app_metadata && user.app_metadata.roles) || [];
  if (currentRoles.includes("admin")) {
    return { statusCode: 200, body: JSON.stringify({ message: "Already admin" }) };
  }

  const adminUrl = `${identity.url}/admin/users/${user.sub}`;
  try {
    const response = await fetch(adminUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${identity.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        app_metadata: { roles: ["admin"] },
      }),
    });

    if (!response.ok) {
      return { statusCode: response.status, body: "Failed to update role" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin role assigned" }),
    };
  } catch (err) {
    return { statusCode: 500, body: "Error updating role" };
  }
};
