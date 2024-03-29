"use client";

import { Session } from "next-auth";
import { SetStateAction, useEffect, useState } from "react";
import CartCard from "./cart-card copy";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import PaymentModule from "./payment-module";

export default function CartPage({ session }: { session: Session | null }) {
  const [value, setValue] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<any>(0.0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState("LOADING");

  async function loadData(setValue: any, setCart: any, setTotal: any) {
    setValue([]);
    setCart([]);
    const result = await fetch("/api/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    setValue(data.allItems);

    const cartResult = await fetch("/api/getCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const cart = await cartResult.json();
    setCart(cart.cart);
    let tempTotal = 0.0;
    cart.cart.forEach((element: any) => {
      console.log(element);
      setTotal(
        (tempTotal +=
          parseFloat(
            data.allItems.find((x: any) => x.product_id == element.id).price,
          ) * element.quantity),
      );
    });
  }

  useEffect(() => {
    setIsLoading("LOADING");
    setTotal(0.0);
    loadData(setValue, setCart, setTotal).then((_) => {
      setIsLoading("Nothing is in the cart");
      console.log(cart);
      console.log(total);
    });
  }, []);

  return (
    <>
      {cart.length > 0 ? (
        <PaymentModule
          total={total.toFixed(2)}
          email={session?.user?.email}
          showDemoModal={showModal}
          setShowDemoModal={setShowModal}
        />
      ) : (
        <></>
      )}

      <div className="container z-10 mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="my-4 text-2xl font-bold">SHOPPING CART</h1>
        </div>
        {isLoading == "LOADING" || cart.length == 0 ? (
          <nav
            id="store"
            className="top-0 z-10 w-full items-center justify-center px-6 py-1 text-center"
          >
            <div className="container mx-auto mt-0 flex w-full flex-wrap items-center justify-between px-2 py-3 text-center">
              <div className="w-full items-center justify-center text-center text-xl font-bold uppercase tracking-wide text-gray-800 no-underline hover:no-underline ">
                {isLoading}
              </div>
            </div>
          </nav>
        ) : (
          <></>
        )}
        <div className="mt-8">
          {cart.map((element: any) => (
            // eslint-disable-next-line react/jsx-key
            <CartCard
              id={element.id}
              title={value.find((x) => x.product_id == element.id).name}
              price={value.find((x) => x.product_id == element.id).price}
              image={value.find((x) => x.product_id == element.id).img}
              session={session}
              quantity={element.quantity}
              disabled={disabled}
              setDisabled={setDisabled}
              loadData={async () => {
                await loadData(setValue, setCart, setTotal);
              }}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-end">
          <span className="mr-4 text-gray-600">Subtotal:</span>
          <span className="text-3xl font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="z-10 flex flex-col md:mt-12 md:flex-row md:items-center md:justify-between">
          <h1 className="my-4 text-2xl font-bold"></h1>
          <button
            disabled={isLoading == "LOADING" || cart.length == 0}
            onClick={() => {
              setShowModal(true);
            }}
            className="rounded bg-indigo-500 px-36 py-2 font-bold text-white hover:bg-indigo-700"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
