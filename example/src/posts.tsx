import {
  List,
  Datagrid,
  TextField,
  EditButton,
  ShowButton,
  Edit,
  SimpleForm,
  Create,
  TextInput,
  Show,
  SimpleShowLayout,
} from 'react-admin'
import { MdxField, MdxInput } from '../../src'

export const PostList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="body" sx={{ maxWidth: 320 }} />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
)

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" placeholder="" />
      <MdxInput fullWidth source="body" label="Post Body" />
    </SimpleForm>
  </Edit>
)

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput required source="title" helperText="Test" />
      <MdxInput
        required
        fullWidth
        source="body"
        helperText="Halp"
        label="Post Body"
        // readOnly
        mdxProps={{ placeholder: 'Override...' }}
        placeholder="Enter your post content here..."
      />
    </SimpleForm>
  </Create>
)

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <MdxField source="body" />
    </SimpleShowLayout>
  </Show>
)
