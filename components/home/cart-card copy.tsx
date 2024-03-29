"use client";

import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import toast from "react-simple-toasts";

export default function CartCard({
  id,
  title,
  price,
  image,
  session,
  quantity,
  disabled,
  setDisabled,
  loadData,
}: {
  id: string;
  title: string;
  price: string;
  image: string;
  session: Session | null;
  quantity: number;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  loadData: () => Promise<void>;
}) {
  async function add(item: any) {
    var raw = JSON.stringify(item);
    let result = await fetch("/api/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    })
      .then(() => {
        // toastConfig({ position: "top-right", theme: "success" });
        // toast("Added Succesfully");
        toast("Updated Succesfully", {
          position: "top-right",
          theme: "custom-success",
        });
      })
      .catch(() => {
        toast("Fail to Update", {
          position: "top-right",
          theme: "custom-error",
        });
      });
  }

  async function reduce(item: any) {
    var raw = JSON.stringify(item);
    let result = await fetch("/api/reduce", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    })
      .then(() => {
        // toastConfig({ position: "top-right", theme: "success" });
        // toast("Added Succesfully");
        toast("Updated Succesfully", {
          position: "top-right",
          theme: "custom-success",
        });
      })
      .catch(() => {
        toast("Fail to Update", {
          position: "top-right",
          theme: "custom-error",
        });
      });
  }

  return (
    <div className="flex w-full flex-col border-b border-gray-400 py-4 md:flex-row">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt="Product image"
          className="h-32 w-32 object-cover"
        />
      </div>
      <div className="float-right mt-4 w-full md:ml-6 md:mt-0">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="mt-4 flex items-center">
          <span className="mr-2 text-gray-600">Quantity:</span>
          <div className="flex items-center">
            <button
              className="rounded-l-lg bg-gray-200 px-2 py-1"
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                await reduce({ id: id });
                await loadData();
                setDisabled(false);
              }}
            >
              -
            </button>
            <span className="mx-2 text-gray-600">{quantity}</span>
            <button
              className="rounded-r-lg bg-gray-200 px-2 py-1"
              disabled={disabled}
              onClick={async () => {
                setDisabled(true);
                await add({ id: id });
                await loadData();
                setDisabled(false);
              }}
            >
              +
            </button>
          </div>
          <span className="ml-auto text-2xl font-bold ">
            ${(parseFloat(price) * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
