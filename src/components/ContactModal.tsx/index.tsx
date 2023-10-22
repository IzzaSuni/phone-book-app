import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import TextField from "../TextField";
import { Box, FlexBox, Text } from "../styledElements";
import Button from "../Button";
import useGlobalState, {
  ContactItemAtom,
  modalAtom,
} from "@/hooks/useGlobalState";
import { useAtomValue, useSetAtom } from "jotai";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import ShowComponent from "../ShowComponent";
import Image from "next/image";
import useDeviceType from "@/hooks/useDeviceType";

type ContactPayload = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

export default function ContactModal() {
  const contactItem = useAtomValue(ContactItemAtom);
  const setModal = useSetAtom(modalAtom);

  const isEditting = !!contactItem?.id;

  const {
    addContacts,
    refetchContact,
    removeContact,
    favorite,
    handleRemoveFromFavorite,
  } = useGlobalState();

  const { isMobileDevice } = useDeviceType();

  const { handleSubmit, control } = useForm<ContactPayload>({
    defaultValues: {
      first_name: contactItem.first_name,
      phones: contactItem?.phones,
    },
  });

  const {
    fields: phones,
    append,
    remove,
  } = useFieldArray({ name: "phones", control });

  const onSubmit: SubmitHandler<ContactPayload> = async (val) => {
    try {
      await addContacts({
        variables: { ...val, last_name: "" },
        onCompleted(data, clientOptions) {
          clientOptions?.client?.resetStore();
        },
      });

      await refetchContact();

      enqueueSnackbar({
        message: "Contact Successfully Added",
        variant: "success",
      });
    } catch (err) {
      // @ts-expect-error
      if (err?.message?.includes("Uniqueness violation.")) {
        enqueueSnackbar({
          message: "Sorry the contact with that number exist",
          variant: "error",
        });
      } else {
        enqueueSnackbar({
          // @ts-expect-error
          message: err?.message ?? "Sorry there is a mistake",
          variant: "error",
        });
      }
    }
    setModal(false);
  };

  const handleDelete = async () => {
    const isFromFavorite = favorite?.find((v) => v.id === contactItem?.id);

    try {
      await removeContact({ variables: { id: contactItem?.id } });

      enqueueSnackbar({
        message: `Contact Deleted ${
          isFromFavorite ? " and removed from favorite" : ""
        }`,
        variant: "success",
      });

      if (isFromFavorite) {
        handleRemoveFromFavorite(contactItem);
      }

      await refetchContact();
    } catch (err) {
      enqueueSnackbar({
        // @ts-expect-error
        message: err?.message ?? "Sorry there is a mistake",
        variant: "error",
      });
    }

    setModal(false);
  };

  const buttonActionStyle = {
    mb: 3,
    py: 2,
    width: "50%",
    margin: "auto",
    fontSize: 18,
  };

  const handleConfirmDelete = () => {
    enqueueSnackbar(
      <>
        Are you sure to Delete this contact?
        <br /> Click this notification to delete
      </>,
      {
        variant: "warning",
        anchorOrigin: {
          horizontal: !isMobileDevice ? "center" : "right",
          vertical: "top",
        },
        SnackbarProps: {
          style: { cursor: "pointer" },
          onClick: () => {
            handleDelete();
            closeSnackbar();
          },
        },
      }
    );
  };

  return (
    <Box
      datatype="modal-form-add-contact"
      borderRadius={4}
      width={["90%", 512]}
      m={"auto"}
      background={"#26408B"}
      p={3}
      maxHeight={"75vh"}
      overflow={"auto"}
    >
      <FlexBox justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={[12, 18]}>{isEditting ? "Delete" : "Add"} Contact</Text>
        <Image
          style={{ cursor: "pointer", marginLeft: "auto" }}
          onClick={() => setModal(false)}
          width={24}
          height={28}
          src={"/logo/cross-icon.png"}
          alt="exit-modal"
        />
      </FlexBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox flexDirection={"column"} gridGap={2}>
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                disabled={isEditting}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Contact Name"
                datatype="field-contact-name"
              />
            )}
          />
          <ShowComponent isShow={!isEditting}>
            <Button
              datatype="button-add-more-field-contact-number"
              margin={"auto"}
              width={"50%"}
              fontSize={[14, 18]}
              my={2}
              py={2}
              onClick={() => append({ number: "" })}
            >
              Add more phone
            </Button>
          </ShowComponent>
          {phones?.map(({ id, number }, index) => (
            <Controller
              key={id}
              control={control}
              name={`phones.${index}.number`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  disabled={isEditting}
                  id={id}
                  datatype="field-contact-number"
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Phone number"
                  value={value}
                  icon={index > 0 && !isEditting ? "/logo/trash-icon.png" : ""}
                  onClickIcon={() =>
                    !isEditting || index > 0 ? remove(index) : null
                  }
                />
              )}
            />
          ))}
          <FlexBox gridGap={3}>
            <ShowComponent isShow={isEditting}>
              <Button
                datatype="button-delete-form-add-contact"
                {...buttonActionStyle}
                background={"#D71D2D"}
                type="button"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </ShowComponent>
            <ShowComponent isShow={!isEditting}>
              <Button
                {...buttonActionStyle}
                type="submit"
                datatype="button-submit-form-add-contact"
              >
                Submit
              </Button>
            </ShowComponent>
          </FlexBox>
        </FlexBox>
      </form>
    </Box>
  );
}
