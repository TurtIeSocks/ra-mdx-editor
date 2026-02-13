import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { PostList, PostEdit, PostCreate } from "./posts";

const dataProvider = simpleRestProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
  </Admin>
);

export default App;
