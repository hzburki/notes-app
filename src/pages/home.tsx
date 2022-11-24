import { type NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Notes App - hzburki</title>
        <meta
          name="description"
          content="Personal and secure notes app from hzburki"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto my-12 max-w-4xl border">
        <p className="text-grey p-2 text-2xl">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
      </main>
    </>
  );
};

export default Home;
