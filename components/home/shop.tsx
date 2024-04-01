"use client";

import { Session } from "next-auth";
import ShoppingCard from "./shopping-card";
import { useEffect, useState } from "react";
import { useSignInModal } from "../layout/sign-in-modal";

export default function Shop({ session }: { session: Session | null }) {
  const [value, setValue] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState("LOADING");

  async function loadData(setValue: any) {
    let result = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    setValue(data.allItems);
  }

  useEffect(() => {
    setIsLoading("LOADING");

    loadData(setValue).then((_) => {
      setIsLoading("STORE");
    });
  }, []);
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <SignInModal />
      <section className="bg-white py-8">
        <div className="container mx-auto flex flex-wrap items-center pb-12 pt-4">
          <nav id="store" className="top-0 z-10 w-full px-6 py-1">
            <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between px-2 py-3">
              <div className="text-xl font-bold uppercase tracking-wide text-gray-800 no-underline hover:no-underline ">
                {isLoading}
              </div>
            </div>
          </nav>
          {value.map((element: any) => (
            // eslint-disable-next-line react/jsx-key
            <ShoppingCard
              id={element.product_id}
              title={element.name}
              price={element.price}
              image={element.img}
              setShowSignInModal={setShowSignInModal}
              session={session}
            />
          ))}
        </div>
      </section>
    </>
  );
}
