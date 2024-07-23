// pages/api/getData.js
import fs from "fs";
import path from "path";
import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const filePath = path.join(
      process.cwd(),
      "data",
      process.env.DATA_FILE,
    );
    var jsonData = fs.readFileSync(filePath, "utf-8");

    jsonData = JSON.parse(jsonData);

    // Get Extra data from shippo API to enrich the data
    const shippoResponse = await axios.get(
      "https://api.goshippo.com/carrier_accounts?carrier=ups&results=100",
      { headers: { Authorization: `ShippoToken ${process.env.API_KEY}` } }
    );

    const shippoData = shippoResponse.data.results;

    // console.log('shippo data', shippoData)

    // Merge the data from the two sources
    const enrichedData = jsonData.map((userAccount) => {
      const shippoAccount = shippoData.find(
        (account) => account.object_id === userAccount.shippo_object_id
      );
      return { ...userAccount, ...shippoAccount };
    });

    // console.log(enrichedData);

    //
    res.status(200).json(enrichedData);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
