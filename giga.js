export default async function handler(req, res) {
  const { iccid } = req.query;

  if (!iccid) {
    return res.status(400).json({ success: false, message: "ICCID is required" });
  }

  try {
    const tokenRes = await fetch("https://api.giga.store/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "UNrpD53wqlPFY1vV/yfmN/saIiSA1+G1/YGItDvpsyMC67C0UuJMzCncpQDDqbn0",
        client_secret: "7045050f9de0ba40904ca06b892a3259",
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const response = await fetch(`https://api.giga.store/api/esims/${iccid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch ICCID data");

    const result = await response.json();
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}