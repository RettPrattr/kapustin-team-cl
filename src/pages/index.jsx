import delve from "dlv";
import BlockManager from "@/components/shared/BlockManager";
import getDataDependencies from "@/components/utils/api";
import { redirectToHomepage, getData } from "@/components/utils/index";
import { resolveMotionValue } from "framer-motion";
import Layout from "@/components/layouts/Layout"

const Universals = ({ pageData }) => {
  const blocks = delve(pageData, "blocks");
  return <Layout><BlockManager blocks={blocks} /></Layout>;
};

export async function getServerSideProps(context) {
    // const slug  = delve(context.query, "slug")

  try {
    // const data = await fetch(`${process.env.API_LINK}/api/test-pages?slug=*`)
    // const data = getData(' ', '/main-page');
    const res = await fetch('http://localhost:1337/api/main-page?populate=deep');
    const json = await res.json();

    // if (!json.length) {
    //   return redirectToHomepage();
    // }

    const pageData = await getDataDependencies(delve(json.data, 'attributes'));
    return {
      props: { pageData },
    };
  } catch (error) {
    return {
      props: { error }
    };
  }
}

export default Universals;