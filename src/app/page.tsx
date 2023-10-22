"use client";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";

const ContactList = dynamic(() => import("@/screen/list"), {
  loading: () => <Loader />,
  ssr: false,
});

export default function Home() {
  return <ContactList />;
}
