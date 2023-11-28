import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react';
import findImageUrl from '@/components/utils/findImageUrl'
import findValue from '@/components/utils/findValue'
import { casesUrl } from '@/components/utils/varUrls'
import useWindowDimensions from '@/components/hooks/useWindowDimensions'
import FixedButton from '@/components/atoms/FixedButton';
import SideBarPage from '@/components/SideBarPage';
import Header from '@/components/Header';
import SEO from '@/components/layouts/SEO';
import PopupLayout from '@/components/layouts/PopupLayout';
import Button from '@/components/atoms/Button';
import TransitionLayout from '@/components/layouts/TransitionLayout';
import Link from 'next/link'

import { AllContexts } from '@/components/context/Context'

export async function getServerSideProps (context) {
    const casesRes = await fetch(`${process.env.API_LINK}/api/cases/?populate=deep`)
    const headerRes = await fetch(`${process.env.API_LINK}/api/header/?populate=deep`)

    return {
        props: {
            casesData: await casesRes.json(), 
            headerData: await headerRes.json(), 
        }
    }
}

const CasePage = (props) => {

    const [width] = useWindowDimensions()

    const {popupState, setPopupState} = useContext(AllContexts)


    let caseId;
    let caseIdReal = null;
    findValue(props, 'url')

    const router = useRouter();
    const data = router.query;



    const casesData = props.casesData
    var index = -1;
    const slug = data.id
    var filteredObj = casesData?.data.find(function(item, i){
      if(item.attributes.slug === slug){
        caseIdReal = item.id
        caseId = i
        return item
      }
    });

    if (width) {

        return (
            <>
              <TransitionLayout>
                <SEO {...filteredObj.attributes.seoData} />
                {/* {width < 800 && <Header {...props.headerData?.data?.attributes.header} inCase={true} /> } */}
                {width < 800 && <div className="pys"></div> }
                {width < 800 &&  <div className={'fixedButton fixedButton-2 flex flex-row'}>
                  <Button
                        type={1}
                        text='Вернуться на главную'
                        className='mt0 mr0'
                        href={'/'}
                    />
                </div> }
        
                <div className={'fixedButton fixedButton-1 flex flex-row cb-mid'}>
                    <Link href={"/form"} className='container сursor-pointer'>
                        
                        <div className="flex justify-between items-center сursor-pointer">
                            {/* <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_574_1463)"><path d="M32 0H8C3.58172 0 0 3.58172 0 8V32C0 36.4183 3.58172 40 8 40H32C36.4183 40 40 36.4183 40 32V8C40 3.58172 36.4183 0 32 0Z" fill="#35C759"/><path d="M28.0113 13.668C27.9633 14.3384 27.5802 16.6864 27.197 19.2256L25.997 26.7456C25.997 26.7456 25.9011 27.8472 25.0867 28.0392C24.2723 28.2312 22.9266 27.368 22.6906 27.1768C22.4986 27.0328 19.0969 24.8768 17.8513 23.8232C17.7246 23.7373 17.6217 23.6208 17.5521 23.4844C17.4825 23.348 17.4485 23.1962 17.4533 23.0432C17.4581 22.8902 17.5015 22.7409 17.5795 22.6091C17.6575 22.4774 17.7675 22.3674 17.8994 22.2896C19.6242 20.7088 21.6842 18.744 22.9298 17.4984C23.505 16.9232 24.0801 15.5784 21.6841 17.2112L14.9283 21.7632C14.583 21.9191 14.2097 22.0037 13.831 22.012C13.4523 22.0202 13.0759 21.9519 12.7242 21.8112C11.2842 21.38 9.60973 20.8048 9.60973 20.8048C9.60973 20.8048 8.46019 20.0848 10.4242 19.3192L21.5882 14.7201C22.6898 14.2401 26.4273 12.708 26.4273 12.708C26.4273 12.708 28.1545 12.0384 28.0113 13.668Z" fill="white"/></g><defs><clipPath id="clip0_574_1463"><rect width="40" height="40" fill="white"/></clipPath></defs></svg> */}
                            Оставить заявку
                        </div>
                    </Link>
            </div>
                {filteredObj && <SideBarPage {...filteredObj.attributes} type={1}/>}
                {popupState === true && <PopupLayout/> }
              </TransitionLayout>
            </>
          );
    }
}
export default CasePage