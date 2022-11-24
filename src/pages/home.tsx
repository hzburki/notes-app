import { z } from "zod";
import { type NextPage } from "next";
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Title, Text, Button } from "@mantine/core";

/** Editor Imports */
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import SubScript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import { Link, RichTextEditor } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Superscript from "@tiptap/extension-superscript";

// import { trpc } from "../utils/trpc";

const schema = z.object({
  title: z.string().min(2, { message: "Title should have at least 2 letters" }),
  content: z
    .string()
    .min(2, { message: "Note should have at least 2 letters" }),
});

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: zodResolver(schema),
  });

  /** Text Editor (for Note) */
  const editor = useEditor({
    extensions: [
      Link,
      Underline,
      SubScript,
      Highlight,
      StarterKit,
      Superscript,
      Placeholder.configure({ placeholder: "Required" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: form.values.content,
    onUpdate: ({ editor }) => {
      form.setFieldValue("content", editor.getHTML());
      console.log({ value: editor.getHTML() });
    },
  });

  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div className="mx-auto my-10 h-full max-w-4xl">
      <Title order={1} className="text-gray-600">
        Add Note
      </Title>

      {/* Add Note Form */}
      <form
        onSubmit={form.onSubmit((values) =>
          console.log({ values, isValid: form.isValid(), form })
        )}
      >
        <TextInput
          label="Title"
          error={form.errors?.title}
          className="my-2"
          placeholder="Required"
          {...form.getInputProps("title")}
        />

        <div className="my-2">
          <Text fz="sm">Note</Text>
          <RichTextEditor editor={editor}>
            {/* Toolbar */}
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
                <RichTextEditor.ClearFormatting />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignRight />
                <RichTextEditor.AlignJustify />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            {/* Content */}
            <RichTextEditor.Content />
          </RichTextEditor>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default Home;
