"use client";

import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";
import toast from "react-simple-toasts";

export default function ShoppingCard({
  id,
  title,
  price,
  image,
  setShowSignInModal,
  session,
}: {
  id: string;
  title: string;
  price: string;
  image: string;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
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
        toast("Added Succesfully", {
          position: "top-right",
          theme: "custom-success",
        });
      })
      .catch(() => {
        toast("Fail to Add", { position: "top-right", theme: "custom-error" });
      });
  }
  return (
    <div className="flex w-full flex-col p-6 md:w-1/3 xl:w-1/4">
      <div className="z-10">
        <img className="" src={image} />
        <div className="flex w-full">
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between pt-3">
              <p className=""> {title}</p>
            </div>
            <p className="pt-1 text-gray-900">$ {price}</p>
          </div>
          <div
            onClick={async () => {
              if (session == null) {
                setShowSignInModal(true);
              } else {
                await add({ id: id });
              }
            }}
            className="group z-10 flex max-w-fit cursor-pointer items-center justify-center space-x-1  border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
            rel="noopener noreferrer"
          >
            <svg
              className="h-4 w-4 group-hover:text-black"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L20 20H4L12 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Add</p>
          </div>
        </div>
      </div>
    </div>
  );
}
