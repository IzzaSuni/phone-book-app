"use client";

import "react-loading-skeleton/dist/skeleton.css";
import Header from "@/components/Header";
import { Box } from "@/components/styledElements";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Modal from "react-modal";
import ContactModal from "@/components/ContactModal.tsx";
import Button from "@/components/Button";
import { modalAtom } from "@/hooks/useGlobalState";
import { useAtom } from "jotai";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import useDeviceType from "@/hooks/useDeviceType";

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

function NoSSRTemplate({ children }: { children: ReactNode }) {
  const [showModal, setShoModal] = useAtom(modalAtom);
  const { isMobileDevice, isTabletDevice } = useDeviceType();

  return (
    <>
      <Box>
        <Header />
        <Box padding={2}>{children}</Box>
      </Box>
      <Button
        datatype="button-show-modal-form-add-contact"
        position={"fixed"}
        bottom={isTabletDevice || isMobileDevice ? "8px" : "32px"}
        right={isTabletDevice || isMobileDevice ? "16px" : "32px"}
        fontSize={isTabletDevice || isMobileDevice ? 24 : 26}
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
        Add Contact
      </Button>
      <Modal
        style={customModalStyles}
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShoModal(false)}
      >
        <ContactModal />
      </Modal>
    </>
  );
}

export default function TemplateRoot({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider>
      <SnackbarProvider
        dense
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <NoSSRTemplate>{children}</NoSSRTemplate>
      </SnackbarProvider>
    </ApolloProvider>
  );
}
