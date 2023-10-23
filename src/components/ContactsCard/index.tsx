import Image from "next/image";
import { Box, FlexBox, Text } from "../styledElements";
import Button from "../Button";
import useGlobalState, {
  ContactItemAtom,
  ContactList,
  modalAtom,
} from "@/hooks/useGlobalState";
import ShowComponent from "../ShowComponent";
import Skeleton from "react-loading-skeleton";
import { useSetAtom } from "jotai";

type ContactsCardProps = {
  buttonHandler?: (item: ContactList) => void;
  item?: ContactList;
  buttonText?: string;
  isLoading?: boolean;
};

export default function ContactsCard(props: ContactsCardProps) {
  const setContactItem = useSetAtom(ContactItemAtom);
  const setModal = useSetAtom(modalAtom);

  const { item, buttonHandler, buttonText, isLoading = false } = props;
  const { first_name, last_name, phones } = item || {};

  return (
    <FlexBox
      datatype="contact-card"
      position={"relative"}
      overflow={"hidden"}
      alignItems={"center"}
      py={2}
      borderBottom={"2px solid white"}
      justifyContent={"space-between"}
    >
      <FlexBox gridGap={2}>
        <Image
          width={42}
          height={42}
          alt="user-icon-logo"
          src={"/logo/user-icon.png"}
          loading="lazy"
        />
        <ShowComponent isShow={isLoading}>
          <Skeleton
            count={2}
            width={"300px"}
            baseColor="white"
            highlightColor="#26408B"
            duration={0.5}
          />
        </ShowComponent>
        <ShowComponent isShow={!isLoading}>
          <FlexBox
            flexDirection={"column"}
            justifyContent={"center"}
            isEllipsis
          >
            <Text m={0} fontSize={[12, 16]}>
              {first_name}
            </Text>
            <FlexBox>
              <Text
                fontSize={[10, 16]}
                fontWeight={200}
                m={0}
                color={"#ffffffa1"}
              >
                {phones?.map((e) => e?.number).join(", ")}
              </Text>
            </FlexBox>
          </FlexBox>
        </ShowComponent>
      </FlexBox>
      <ShowComponent isShow={!isLoading}>
        <FlexBox
          gridGap={3}
          alignItems={"center"}
          position={"absolute"}
          right={0}
          bottom={2}
          background={"#26408B"}
          px={2}
        >
          <Button
            datatype="button-add-remove-favorite"
            fontSize={[12, 18]}
            onClick={() => buttonHandler?.(item!)}
          >
            {buttonText}
          </Button>
          <Button
            datatype="button-edit-contact"
            p={"2px"}
            borderRadius={0}
            alignItems={"center"}
            onClick={() => {
              setContactItem(item!);
              setModal(true);
            }}
          >
            <Image
              width={26}
              height={26}
              src={"/logo/edit-icon.svg"}
              alt="edit-icon"
            />
          </Button>
        </FlexBox>
      </ShowComponent>
    </FlexBox>
  );
}
