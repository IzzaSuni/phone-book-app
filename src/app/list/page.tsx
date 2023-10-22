"use client";

import Card from "@/components/Card";
import { Box, Text } from "@/components/styledElements";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import useGetListData from "../../hooks/useGetListData";

export default function ContactList() {
  const { push } = useRouter();
  const pathname = usePathname();
  const { contactList } = useGetListData();

  return (
    <Box>
      <Card>
        <Text>Favorite Contact ❤️</Text>
      </Card>
    </Box>
  );
}
