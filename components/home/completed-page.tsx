"use client";

import { Session } from "next-auth";
import { SetStateAction, useEffect, useState } from "react";
import CartCard from "./cart-card copy";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import PaymentModule from "./payment-module";

export default function CompletedPage({
  session,
}: {
  session: Session | null;
}) {
  const [isDone, setIsDone] = useState(false);

  async function checkout(setIsDone: any) {
    await fetch("/api/checkout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setIsDone(true);
      })
      .catch(() => {
        checkout(setIsDone);
      });
  }
  useEffect(() => {
    checkout(setIsDone);
  }, []);

  return (
    <>
      {!isDone ? (
        <div
          id="store"
          className="top-0 z-10 w-full items-center justify-center px-6 py-1 text-center"
        >
          <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between px-2 py-3 text-center">
            <div className="w-full items-center justify-center text-center text-xl font-bold uppercase tracking-wide text-gray-800 no-underline hover:no-underline ">
              <div
                className="mx-auto flex h-24 w-24 animate-spin items-center justify-center rounded-full
                    border-8 border-solid border-purple-500 border-t-transparent"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="store"
          className="top-0 z-10 w-full items-center justify-center px-6 py-1 text-center"
        >
          <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between px-2 py-3 text-center">
            <div className="w-full items-center justify-center text-center text-xl font-bold uppercase tracking-wide text-gray-800 no-underline hover:no-underline ">
              THANK YOU FOR YOUR PURCHASE
            </div>
          </div>
        </div>
      )}
    </>
  );
}
