import delve from "dlv";
import { useRouter } from 'next/router'
import BlockManager from "@/components/shared/BlockManager";
import getDataDependencies from "@/components/utils/api";
import { redirectToHomepage, getData } from "@/components/utils/index";

const Universals = ({ pageData }) => {
    // const router = useRouter();
    // const index = router.query;
  const blocks = delve(pageData, "blocks");
  return <BlockManager blocks={blocks} />;
};


// function getCurrentURL () {

//     // if (window) {
//     //     const {
//     //         host, hostname, href, origin, pathname, port, protocol, search
//     //       } = window.location
//     //     
//     // }
//   return window.location.href
// }

// Example


export async function getServerSideProps(context) {


  // /main-page
  try {
    // const data = await fetch(`${process.env.API_LINK}/api/test-pages?slug=*`)
    const res = await fetch(`${process.env.API_LINK}/api/promos/?populate=deep`);
    const json = await res.json();
    const slug = context.query.id


    var filterData = json?.data?.find(f => f.attributes.slug === slug)
    
    if (!filterData) {
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