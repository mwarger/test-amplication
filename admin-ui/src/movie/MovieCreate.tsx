import * as React from "react";
import { Create, SimpleForm, CreateProps, TextInput } from "react-admin";

export const MovieCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label="title" source="title" />
      </SimpleForm>
    </Create>
  );
};
