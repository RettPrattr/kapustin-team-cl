import delve from "dlv";
import BlockManager from "@/components/shared/BlockManager";
import getDataDependencies from "@/components/utils/api";

const Universals = ({ pageData }) => {
  const blocks = delve(pageData, "blocks");
  return <BlockManager blocks={blocks} />;
};

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.API_LINK}/api/services/?populate=deep`);
    const json = await res.json();
    const slug = context.query.id
    var filterData = json?.data?.find(f => f.attributes.slug === slug)

    if (!json.length) {
        return redirectToHomepage();
      }

    const pageData = await getDataDependencies(delve(filterData, 'attributes'));
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