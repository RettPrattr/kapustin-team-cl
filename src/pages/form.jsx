import FormC from '@/components/atoms/Form'
import TransitionLayout from '@/components/layouts/TransitionLayout'
import dynamic from "next/dynamic";
import HeroBlock from '@/components/HeroBlock'



const DynamicForm = dynamic(() => import("@/components/atoms/Form"));



export default function FormPage () {
    return (
        <TransitionLayout>
            {/* <SEO data={seoData} /> */}
            <FormC />
            <HeroBlock />
        </TransitionLayout>
    )
}


export async function getServerSideProps() {
    const noLayout = true
  
    return {
      props: { noLayout }
    };
  }