"use client";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header";
import { Box } from "@/components/styledElements";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Modal from "react-modal";
import ContactModal from "@/components/ContactModal.tsx";
import Button from "@/components/Button";
import useGlobalState, { modalAtom } from "@/hooks/useGlobalState";
import { useAtom, useAtomValue } from "jotai";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const ApolloProvider = dynamic(() => import("@/context/ApolloProvider"), {
  ssr: false,
});

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    width: "100%",
    padding: 0,
    border: "none",
  },
  overlay: {
    background: "#141414bf",
  },
};

export default function TemplateRoot({ children }: { children: ReactNode }) {
  const [showModal, setShoModal] = useAtom(modalAtom);

  return (
    <ApolloProvider>
      <SnackbarProvider
        dense
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Box>
          <Header />
          <Box padding={2}>{children}</Box>
        </Box>
        <Button
          position={"fixed"}
          bottom={"8px"}
          right={"16px"}
          fontSize={24}
          p={2}
          borderRadius={"100%"}
          onClick={() => {
            setShoModal(true);
            enqueueSnackbar({
              message: "Please fill the form",
              variant: "info",
            });
          }}
        >
          + Contact
        </Button>
        <Modal
          style={customModalStyles}
          isOpen={showModal}
          ariaHideApp={false}
          onRequestClose={() => setShoModal(false)}
        >
          <ContactModal />
        </Modal>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
