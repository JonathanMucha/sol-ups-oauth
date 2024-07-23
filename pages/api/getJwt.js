import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { accountId, state } = req.body;
    console.log("get jwt state", state);
    try {
      // Get the redirect URL from the Shippo API
      const shippoResponse = await axios.get(
        `https://api.goshippo.com/carrier_accounts/${accountId}/signin/initiate?redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&state=${state}`,
        {
          headers: {
            Authorization: `ShippoToken ${process.env.API_KEY}`,
          },
          maxRedirects: 0, // Prevent axios from following the redirect
          validateStatus: (status) => status >= 200 && status < 400, // Accept 3xx status codes as valid
        }
      );
      console.log(shippoResponse.headers.location);

      // Get the redirect URL from the response headers
      const redirectUrl = shippoResponse.headers.location;

      // Return the redirect URL to the client
      res.status(200).json({ redirectUrl });
      //   res.status(200).json(jwt);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Failed to get JWT or redirect URL ${error}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
