# ra-mdx-editor

A [React Admin](https://marmelab.com/react-admin/) input component powered by [MDXEditor](https://mdxeditor.dev/).

## Features

- 📝 **WYSIWYG Markdown Editing**: harnessing the power of MDXEditor.
- 🔌 **Plug-and-Play**: drop it into any `SimpleForm` or `TabbedForm`.
- 🎨 **Customizable**: accepts all `MDXEditor` props including plugins, styling, and toolbar configuration.

## Installation

```bash
npm install ra-mdx-editor @mdxeditor/editor
```

*Note: React Admin and React are assumed to be present in your project.*

## Usage

### Basic Usage

Import `MdxInput` and use it within your React Admin resources.

```tsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { MdxInput } from 'ra-mdx-editor';

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" />
      <MdxInput source="body" />
    </SimpleForm>
  </Edit>
);
```

### Custom Plugins

You can extend the default plugins or provide your own complete list.

```tsx
import { MdxInput, defaultPlugins, headingsPlugin } from 'ra-mdx-editor';

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <MdxInput 
                source="body" 
                plugins={[...defaultPlugins, headingsPlugin({ allowedHeadingLevels: [1, 2] })]}
            />
        </SimpleForm>
    </Edit>
);
```

### Styling

```tsx
<MdxInput 
    source="description" 
    className="my-custom-editor"
    placeholder="Start typing..."
/>
```

## Props

`MdxInput` accepts all props from React Admin's `useInput` (like `source`, `label`, `validate`) AND all props from `MDXEditor` (except `markdown`, `onChange`, `ref`, `onBlur` which are handled internally).

| Prop | Type | Description |
|------|------|-------------|
| `source` | `string` | Field name in the record. |
| `plugins` | `Plugin[]` | List of MDXEditor plugins. Defaults to `defaultPlugins`. |
| `className` | `string` | CSS class for the wrapper div. |
| ... | | All other `MDXEditor` props. |

## Publishing

This project is configured to publish to NPM automatically when a new GitHub release is created.

### Prerequisites

1.  **NPM Token**: Create a "Classic" or "Granular" automation token on NPM.
2.  **GitHub Secret**: Add the token as a repository secret named `NPM_TOKEN` in your GitHub repository settings (**Settings > Secrets and variables > Actions**).

### How to Publish

1.  Update the version in `package.json`.
2.  Commit and push the change.
3.  Create a new Release (or Tag) on GitHub.
4.  The "Publish to NPM" workflow will trigger, run tests, build the project, and publish it.


## Running the Example

This repository includes a fully functional example application.

1. **Clone the repository**
   ```bash
   git clone https://github.com/TurtIeSocks/ra-mdx-editor.git
   cd ra-mdx-editor
   ```

2. **Install dependencies and build the library**
   ```bash
   npm install
   npm run build
   ```

3. **Run the example**
   ```bash
   cd example
   npm install
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal).
