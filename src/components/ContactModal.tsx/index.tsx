import {
  Controller,
  FieldValues,
  Form,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import TextField from "../TextField";
import { Box, FlexBox, Text } from "../styledElements";
import Button from "../Button";
import useGlobalState, { modalAtom } from "@/hooks/useGlobalState";
import { networkClient } from "@/network";
import { useSetAtom } from "jotai";
import { enqueueSnackbar } from "notistack";

type ContactPayload = {
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

export default function ContactModal() {
  const { addContacts, refetchContact } = useGlobalState();
  const setModal = useSetAtom(modalAtom);

  const { handleSubmit, control } = useForm<ContactPayload>({
    defaultValues: {
      first_name: "",
      phones: [{ number: "" }],
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

      refetchContact();
      setModal(false);
      enqueueSnackbar({
        message: "Contact Successfully Added",
        variant: "success",
      });
    } catch (err) {
      if (err?.message?.includes("Uniqueness violation.")) {
        return enqueueSnackbar({
          message: "Sorry the contact with that number exist",
          variant: "error",
        });
      }

      enqueueSnackbar({
        message: err?.message ?? "Sorry there is a mistake",
        variant: "error",
      });
    }
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
        <Text fontSize={[12, 18]}>Add Contacts</Text>

        <Button
          width={"50%"}
          fontSize={[14, 18]}
          my={2}
          py={2}
          onClick={() => append({ number: "" })}
        >
          Add more phone
        </Button>
      </FlexBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox flexDirection={"column"} gridGap={2}>
          <Controller
            control={control}
            name="first_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="First Name"
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
                  id={id}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Phone number"
                  icon={index > 0 ? "/logo/trash-icon.png" : ""}
                  onClickIcon={() => (index > 0 ? remove(index) : null)}
                />
              )}
            />
          ))}

          <Button
            mb={3}
            py={2}
            width={"50%"}
            margin={"auto"}
            fontSize={18}
            type="submit"
          >
            Submit
          </Button>
        </FlexBox>
      </form>
    </Box>
  );
}
