import type { NextPage } from "next";
import Head from "next/head";
import { CollectionsView } from "../../views";

const Collections: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>BlastCtrl Tools - Collections</title>
        <meta name="Metaplex Collections" content="Basic Functionality" />
      </Head>
      <CollectionsView />
    </div>
  );
};

export default Collections;