import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ThankYou() {
  const router = useRouter();
  const { state } = router.query;

  console.log(state);

  useEffect(() => {
    if (!router.isReady) return; // Wait until the router is ready

    const storedState = sessionStorage.getItem("oauth_state");

    if (state !== storedState) {
      alert("State parameter mismatch! Potential CSRF attack detected.");
      // Handle the error appropriately, e.g., redirect to an error page
    } else {
      alert(
        "Your UPS account has been successfully authenticated via OAuth. You can now proceed with your day."
      );
      // Clear the state after successful verification
      sessionStorage.removeItem("oauth_state");
    }
  }, [state, router.isReady]); 

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-md text-center'>
        <h1 className='text-2xl font-bold mb-4'>Thank You!</h1>
        <p className='mb-4 text-black'>
          Your UPS account has been successfully authenticated via OAuth. You
          can now proceed with your day.
        </p>
        <Link
          href='/'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
