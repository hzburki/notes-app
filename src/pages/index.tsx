import { Title } from "@mantine/core";
import { type NextPage } from "next";

const Landing: NextPage = () => {
  return (
    <div className="mx-auto my-10 max-w-4xl">
      <Title order={1} className="text-gray-600">
        Add Note
      </Title>
    </div>
  );
};

export default Landing;
