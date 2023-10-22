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

type ContactPayload = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

export default function ContactModal() {
  const contactItem = useAtomValue(ContactItemAtom);
  const setModal = useSetAtom(modalAtom);

  const isEditting = !!contactItem?.id;

  const { addContacts, refetchContact, removeContact, editContact } =
    useGlobalState();

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
      if (isEditting) {
        await editContact({
          variables: {
            id: contactItem?.id,
            _set: val,
          },
        });
      } else {
        await addContacts({
          variables: { ...val, last_name: "" },
          onCompleted(data, clientOptions) {
            clientOptions?.client?.resetStore();
          },
        });
      }

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
    try {
      await removeContact({ variables: { id: contactItem?.id } });
      enqueueSnackbar({
        message: "Contact Deleted",
        variant: "success",
      });

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
      borderRadius={4}
      width={["90%", 512]}
      m={"auto"}
      background={"#26408B"}
      p={3}
      maxHeight={"75vh"}
      overflow={"auto"}
    >
      <FlexBox justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={[12, 18]}>
          {isEditting ? "Delete" : "Add"} Contacts
        </Text>
        <ShowComponent isShow={!isEditting}>
          <Button
            width={"50%"}
            fontSize={[14, 18]}
            my={2}
            py={2}
            onClick={() => append({ number: "" })}
          >
            Add more phone
          </Button>
        </ShowComponent>
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
              />
            )}
          />
          {phones?.map(({ id, number }, index) => (
            <Controller
              key={id}
              control={control}
              name={`phones.${index}.number`}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  disabled={isEditting}
                  id={id}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Phone number"
                  value={value}
                  icon={index > 0 ? "/logo/trash-icon.png" : ""}
                  onClickIcon={() => (index > 0 ? remove(index) : null)}
                />
              )}
            />
          ))}
          <FlexBox gridGap={3}>
            <ShowComponent isShow={isEditting}>
              <Button
                {...buttonActionStyle}
                background={"#D71D2D"}
                type="button"
                onClick={handleConfirmDelete}
              >
                Delete
              </Button>
            </ShowComponent>
            <ShowComponent isShow={!isEditting}>
              <Button {...buttonActionStyle} type="submit">
                Submit
              </Button>
            </ShowComponent>
          </FlexBox>
        </FlexBox>
      </form>
    </Box>
  );
}
