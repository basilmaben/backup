import React from "react";
import { Field } from "react-final-form";
import { TextField } from "@material-ui/core";

function FieldTextInputComponent(props) {
  const { input, ...rest /* any other props from mui */ } = props; /*  */

  return (
    <TextField
      fullWidth /* style */
      {...input} /* react-final-form */
      {...rest}
    />
  );
}

function FieldTextInput(props) {
  return <Field component={FieldTextInputComponent} {...props} />;
}

export default FieldTextInput;
