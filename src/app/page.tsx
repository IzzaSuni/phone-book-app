"use client";
import dynamic from "next/dynamic";
import Loader from "./loading";

const ContactList = dynamic(() => import("./list/page"), {
  loading: () => <Loader />,
});

export default function Home() {
  return <ContactList />;
}
