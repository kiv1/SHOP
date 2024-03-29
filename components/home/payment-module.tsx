"use client";

import { Session } from "next-auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartCard from "./cart-card copy";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import Modal from "../shared/modal";

export default function PaymentModule({
  total,
  email,
  showDemoModal,
  setShowDemoModal,
}: {
  total: number;
  email: string | null | undefined;
  showDemoModal: boolean;
  setShowDemoModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  async function createIntent(total: any, setClientSecret: any) {
    var raw = JSON.stringify({ total: total });
    await fetch("/api/createPaymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret))
      .catch(() => {});
  }
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    setStripePromise(
      loadStripe(
        "pk_test_51OyoY0Il7ocdHMiCSt7SZjASaFuqKDE2xVvnra4nZAfC3tuwOGiy2GEhAPLFqCBH5vU6UfJpSuKj85hCRcmsX5vl00w6CmTWZC",
      ),
    );
    createIntent(total, setClientSecret).then(() => {});
  }, []);
  return (
    <>
      <Modal
        showModal={showDemoModal}
        setShowModal={setShowDemoModal}
        className=" px-5 py-5"
      >
        {clientSecret && email ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm email={email} />
          </Elements>
        ) : (
          <div className="w-full items-center justify-center text-center text-xl font-bold uppercase tracking-wide text-gray-800 no-underline hover:no-underline ">
            LOADING
          </div>
        )}
      </Modal>
    </>
  );
}
