import React, {useContext, useEffect} from 'react'

import Form from '@/components/atoms/Form'

import { AllContexts } from '@/components/context/Context'

export async function getStaticProps() {
	const respPhones = await axios.get(`${process.env.API_LINK}/api/form-requests?populate=*`);
	const dataPhonesResp = respPhones.data;
	return { props: { dataGetPhones: dataPhonesResp } }
}

const PopupLayout = ({children}) => {

    const {popupState, setPopupState} = useContext(AllContexts)

    // useEffect(() => {
    //   const popup = document.getElementById('popup')
    //   const timer = setTimeout(() => {
    //     popup.classList.add('appear')
    //   }, 50);
    // }, [])

  return (
    <>
        <div id='popup' className={'popup popup-form flex justify-center items-center'}>
            <Form 
              
            />
            <div 
                className='overlay'
                onClick={() => setPopupState(false)}
            ></div>
        </div>
    </>
  )
}

export default PopupLayout