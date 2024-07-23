import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [carrierAccounts, setCarrierAccounts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/getCarrierAccountInfo");
      const data = await response.json();
      setCarrierAccounts(data);
    }
    fetchData();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-4xl'>
        <h1 className='text-2xl font-bold mb-4'>
          UPS Accounts Pending Authorization
        </h1>
        <table className='min-w-full bg-white border'>
          <thead>
            <tr>
              <th className='py-2 px-4 border text-gray-500'>
                Shippo Account Object ID
              </th>
              <th className='py-2 px-4 border text-gray-500'>
                Account Metadata
              </th>
              <th className='py-2 px-4 border text-gray-500'>
                UPS Account Number
              </th>
              <th className='py-2 px-4 border text-gray-500'>Username</th>
            </tr>
          </thead>
          <tbody>
            {carrierAccounts.map((account) =>
              account.object_info &&
              account.object_info.authentication.status ===
                "authorization_pending" ? (
                <tr key={account.shippo_object_id}>
                  <td className='py-2 px-4 border'>
                    <Link href={`/links/${account.shippo_object_id}`}>
                      <p className='text-blue-500 hover:underline'>
                        {account.shippo_object_id}
                      </p>
                    </Link>
                  </td>
                  <td className='py-2 px-4 border text-gray-500'>
                    {account.metadata && account.metadata}
                  </td>
                  <td className='py-2 px-4 border text-gray-500'>
                    {account.account_number}
                  </td>
                  <td className='py-2 px-4 border text-gray-500'>
                    <ul>
                      {account.usernames.map((username, index) => (
                        <li key={index} className='list-disc list-inside'>
                          {username}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
