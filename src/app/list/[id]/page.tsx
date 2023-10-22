"use client";

import { Box } from "@/components/styledElements";
import { useParams } from "next/navigation";

export default function ListContactDetail() {
  const { id } = useParams();
  return <Box>hi{id}</Box>;
}
