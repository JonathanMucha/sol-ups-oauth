import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function UpsLink(props) {
  const router = useRouter();
  const { id } = router.query;

  const { data } = props;
  // console.log(data);

  const [accountId, setAccountId] = useState("");
  const [link, setLink] = useState("");

  console.log(id);

  useEffect(() => {
    if (id) {
      setAccountId(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const state = uuidv4().replace(/-/g, '');
      console.log('state', state)
      sessionStorage.setItem("oauth_state", state);
      console.log("session state", sessionStorage.getItem("oauth_state"));
      const response = await axios.post("/api/getJwt", {
        accountId: accountId,
        state: state,
      });

      // // Get the redirect URL from the response headers
      const redirectUrl = response.data.redirectUrl;
      console.log(redirectUrl.redirectUrl);
      setLink(redirectUrl);
      // window.location.href = redirectUrl
      // Redirect the user to the fetched URL
    } catch (error) {
      console.error("There's been an error:", error);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md'>
        <h1 className='text-xl font-bold mb-4'>
          Generate UPS Authentication Link
        </h1>
        <input
          type='text'
          disabled={id ? true : false}
          value={accountId}
          onChange={(e) => setQueryParam(e.target.value)}
          placeholder='Enter Query Parameter'
          className='border p-2 rounded w-full mb-4'
        />
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Generate
        </button>

        {link && (
          <div className='mt-4'>
            <p className='text-xl font-bold mb-2 text-black'>
              Please click the link below to authenticate with UPS using one of
              the following usernames
            </p>
            <ul>
              {data.usernames.map((username, index) => (
                <li key={index} className='list-disc list-inside text-black'>
                  {username}
                </li>
              ))}
            </ul>
            <div className='flex justify-center mb-2'>
              <Link
                href={link}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Link
              </Link>
            </div>
            <div className='flex justify-center text-black'>
              (link expires in 5 minutes)
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log("context", context);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCarrierAccountInfo`
  );
  const data = await response.json();

  // console.log(data)

  const info = data.find((item) => item.shippo_object_id === context.query.id);

  if (!info) {
    return {
      notFound: true,
    };
  }

  // Pass data to the page via props
  return { props: { data: info } };
}
