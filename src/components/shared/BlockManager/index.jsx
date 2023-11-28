// import BrandFooter from '@/components/BrandFooter'
// import ItemCards from '@/components/ItemsCards'
// import Story from '@/components/Story'
// import Video from '@/components/Video'
import FixedButton from '@/components/atoms/FixedButton'
// import Form from '@/components/atoms/Form'
// import About from '@/components/About'
// import BigText from '@/components/BigText'
import Header from '@/components/Header'
import SliderBlock from '@/components/SliderBlock'
import Seo from '@/components/layouts/SEO'
// import Price from '@/components/Price'

// import TransitionLayout from '@/components/layouts/TransitionLayout'

import dynamic from "next/dynamic";


const Story = dynamic(() => import("@/components/Story"));
const About = dynamic(() => import("@/components/About"));
const ItemsCards = dynamic(() => import("@/components/ItemsCards"));
const Price = dynamic(() => import("@/components/Price"));


const TransitionLayout = dynamic(() => import("@/components/layouts/TransitionLayout"));
const Form = dynamic(() => import("@/components/atoms/Form"));
const Video = dynamic(() => import("@/components/Video"));
const BrandFooter = dynamic(() => import("@/components/BrandFooter"));
const BigText = dynamic(() => import("@/components/BigText"));


const getBlockComponent = ({ __component, ...rest }, index) => {
  let Block;

  switch (__component) {
    case 'blocks.about': Block = About; break;
    case 'blocks.brand-footer1': Block = BrandFooter; break;
    case 'blocks.items-cards': Block = ItemsCards; break;
    case 'blocks.big-text': Block = BigText; break;
    case 'blocks.video': Block = Video; break;
    case 'blocks.fixed-button': Block = FixedButton; break;
    case 'blocks.form': Block = Form; break;
    case 'blocks.story': Block = Story; break;
    case 'blocks.form': Block = Form; break;
    case 'blocks.header': Block = Header; break;
    case 'blocks.price': Block = Price; break;
    case 'shared.seo': Block = Seo; break;
    case 'blocks.slider-block': Block = SliderBlock; break;
  }

  return Block ? <Block key={`index-${index}`} {...rest} /> : null;
};

const BlockManager = ({ blocks }) => {
  return (
  <TransitionLayout>
     <div>{blocks.map(getBlockComponent)}</div>
  </TransitionLayout>
  )
  ;
};

BlockManager.defaultProps = {
  blocks: [],
};

export default BlockManager;