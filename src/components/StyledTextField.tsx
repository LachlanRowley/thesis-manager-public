import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({}));

export default function StyledCustomisation() {
  return <StyledTextField />;
}
