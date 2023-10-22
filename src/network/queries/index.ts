import { GET_CONTACT_DETAIL, GET_CONTACT_LIST } from "./get";
import { ADD_CONTACT_NUMBER, ADD_CONTACT_WITH_PHONE } from "./create";
import { EDIT_CONTACT, EDIT_PHONE_NUMBER } from "./edit";
import { DELETE_CONTACT_PHONE } from "./delete";

export const gqlQueries = {
  GET_CONTACT_DETAIL,
  GET_CONTACT_LIST,
};

export const gqlMutation = {
  ADD_CONTACT_NUMBER,
  ADD_CONTACT_WITH_PHONE,
  EDIT_CONTACT,
  EDIT_PHONE_NUMBER,
  DELETE_CONTACT_PHONE,
};
