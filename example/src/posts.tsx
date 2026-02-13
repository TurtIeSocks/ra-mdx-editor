import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  SimpleForm,
  Create,
  TextInput,
} from "react-admin";
import { MdxInput, defaultPlugins, headingsPlugin } from "ra-mdx-editor";

export const PostList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="title" />
      <MdxInput source="body" />
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <MdxInput
        source="body"
        placeholder="Enter your post content here..."
        className="custom-mdx-editor"
        autoFocus
        plugins={[...defaultPlugins, headingsPlugin()]}
      />
    </SimpleForm>
  </Create>
);
