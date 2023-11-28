// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { motion } from "framer-motion";
import MaskedInput from "react-text-mask";
import useWindowDimensions from '../hooks/useWindowDimensions';
import Link from "next/link";
import Metrika from '@/components/utils/metrika'

import { AllContexts } from '@/components/context/Context'

import { useState, useEffect, useContext } from 'react';

import Button from './Button';
import { isSchema } from 'yup';

const styleForm = {
    width: "100%",
    justifyContent: "space-between",
    marginBottom: "50px"
}

const styleInnerInput = {
    margin: "0",
    width: '100%',
    maxWidth: '100%',
    transition: "all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
}

const styleInput = {
    display: "inline-block",
    width: '100%',
    maxWidth: '100%',
    height: '35px',
	marginBottom: '40px'
}

const title = 'Зарегистрироваться на день открытых дверей'
const successMessage = 'Заявка успешно отправлена'


// const SignupSchema = Yup.object({
// 		  name: Yup.string()
// 		  .label('Full Name')
// 		  .required(),
//   mobilephone: Yup.number()
// 		  .min(11, 'Минимальное количество символов: 11.')
// 		  .required(),
// })

const phoneNumberMask = [
	"+", "7", " ",
	/[1-9]/,
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/,
	" ",
	/\d/,
	/\d/
  ];











const FormС = (props) => {
	const [togglePopup, setTogglePopup] = useState(false)
	const [isSchemaValid, setIsSchemaValid] = useState(false)
	const [disableInput1, setDisableInput1] = useState(true)
	const [disableInput2, setDisableInput2] = useState(true)	
    const [disableInput3, setDisableInput3] = useState(true)
	const [submitDelay, setSumbitDelay] = useState(true)
	const [focused, setFocused] = useState(false)
	const [focused2, setFocused2] = useState(false)
    const [focused3, setFocused3] = useState(false)
	const onFocus = () => setFocused(true)
	const onFocus2 = () => { setFocused2(true); } 
    const onFocus3 = () => setFocused3(true)
	const onBlur = () => setFocused(false)
	const onBlur2 = () => setFocused2(false)
    const onBlur3 = () => setFocused3(false)
	const [onBlurOnce1, setOnBlurOnce1] = useState(false)
	const [onBlurOnce2, setOnBlurOnce2] = useState(false)
    const [onBlurOnce3, setOnBlurOnce3] = useState(false)
	const [formData, setFormData] = useState()
    const [choosenItems, setChoosenItems] = useState([''])
    const [message, setMessage] = useState()
    const [btnText, setBtnText] = useState('отправить')
    const [sumbitDisable, setSubmitDisable] = useState(false)

    const [firstFormChoise, setFirstFormChoise] = useState([])

    const [secondFormChoise, setSecondFormChoise] = useState()

    const [phonesData, setPhonesData] = useState({})

    const {popupState, setPopupState} = useContext(AllContexts)

    const [width, height] = useWindowDimensions();


    

    // const {currentPage, currentComponent} = useContext(AllContexts) /// ???

    const schema = Yup.object({
        name: Yup.string()
                .min(3, 'Минимальное количество символов: 3')
                .required('Обязательное поле'),
        email: Yup.string().email('Введите корректный адрес')
                .min(6, 'Минимальное количество символов: 6')
                .required('Обязательное поле'),
        mobilephone: Yup.string()
                .min(16, 'Введите номер полностью')
                .required('Обязательное поле')
    
                .test('existenceNumber',
                    function(value, formData) {
    
                        // const arr = await fetchStrapiPhones()
    
                        axios.get(`${process.env.API_LINK}/api/form-requests?populate=*&sort[0]=updatedAt%3Adesc&pagination[pageSize]=1000`)
                            .then(function(res) {
                                setPhonesData(res.data)
                            })
                            .catch(function(error) {
                                return error
                            })
    
                        let phonesArr = [];
                        
                        phonesData.data?.map((item) => {
                            phonesArr.push(item.attributes.phonenumber)
                            return phonesArr
                        })
    
                        const booleanResult = !phonesArr.includes(value)
                        return booleanResult === true ? true : this.createError({
                            message: `Вы недавно уже отправляли заявку`,
                            path: 'mobilephone', // Fieldname
                          })
    
                    } 
                )
      })

	const formik = useFormik({
		initialValues: {
		  name: '',
          email: '',
		  mobilephone: '+7',
		},
		validationSchema: schema,
		onSubmit: function (values) {
            const STRAPI_API = `${process.env.API_LINK}/api/form-requests`
			const TOKEN = `${process.env.TOKEN}`;
			const CHAT_ID = `${process.env.CHAT_ID}`;
			const URI_API = `https://api.telegram.org/bot${ TOKEN }/sendMessage`;
            const textArea = document.getElementById("formMessage").value
			let message = `Новая заявка! \n\n<b>Имя:</b> ${values.name} \n<b>Телефон:</b> ${values.mobilephone} \n<b>Интересует:</b> ${firstFormChoise} \n<b>Бюджет:</b> ${secondFormChoise} \n<b>Сообщение:</b> ${textArea} `;
            axios.post(URI_API,{
				chat_id: CHAT_ID,
				parse_mode: 'html',
				text: message
			})

            axios.post(STRAPI_API,{
				data: {
					name: values.name,
                    email: values.email,
					phonenumber: values.mobilephone
				}
			})
            
 
		}
	  })


      const fetchFormData = () => {
        axios.get(`${process.env.API_LINK}/api/form?populate=deep`)
            .then(function(res) {
                setFormData(res.data?.data?.attributes.Form)
            })
            .catch(function(error) {
                return error
            })
      }


      useEffect(() => {
        fetchFormData()
		const timer = setTimeout(() => {
			setDisableInput1(false)
			setDisableInput2(false)
            setDisableInput3(false)
		}, 1000);
		return () => clearTimeout(timer);
	}, [])

    // const {type, firstChoise, secondChoise, firstChoiseSubtitle, secondChoiseSubtitle, firstTextAreaSubtitle, secondTextAreaSubtitle} = formData


    const handleSchemaValue = (nameForm, emailForm, numberForm) => {
	
        const obj = {
            name: nameForm,
            email: emailForm,
            mobilephone: numberForm
        }
    
        setIsSchemaValid(schema.isValidSync(obj))
        }



	setTimeout(() => {
		submitDelay ? '' : setSumbitDelay(true)
	}, 3000);


    // const router = useRouter();
	// const redirectHandler = (c) => {
	// 	if (c === 'CreditStory1') { router.push('https://credistory.ru/rating') }
	// 	else if (c === 'CreditStory2') { router.push('https://nbki.ru/nbki-history/') }
	// 	else { null }
	// } 
    /// ???

    const submitBtnHandler = () => {
		// setRedirect(currentComponent)
		setTogglePopup(!togglePopup)
		// redirectHandler(currentComponent)
	}

    const firstChoiseHandler = (el) => {
        // const found = arr1.some(r=> arr.includes(r))

        
        const item = document.getElementById(el)
        
        item.classList.contains("active") ? item.classList.remove("active") : item.classList.add("active")
        
        let arr = firstFormChoise

        if (arr?.includes(el)) {
            arr = arr.filter(item => item !== el)
            setFirstFormChoise(arr)
        } else {
            arr.push(el.replace(",", ""))
            setFirstFormChoise(arr) 
        }
   
        
    }

    const secondChoiseHandler = (el) => {
        const allItemsNL = document.querySelectorAll('.secondChoise')
        const allItemsArr = Array.from(allItemsNL)
        allItemsArr.map((i) => i.classList.remove('active'))
        const item = document.getElementById(el)
        item.classList.contains("active") ? item.classList.remove("active") : item.classList.add("active")
        setSecondFormChoise(el)

        // let arr = choosenItems

        // if (arr?.includes(el)) {
        //     arr = arr.filter(item => item !== el)
        //     setChoosenItems(arr)
        // } else {
        //     arr.push(el)
        //     setChoosenItems(arr)
        // }
    }    




	return (
        <form onSubmit={formik.handleSubmit} className={"cd12 cm4 flex items-center container"}>
        <div className={"flex flex-col items-center w-full justify-center form-2 relative"}>
            <Link href="/" className={'burger cd1'} onClick={() => {
                // const popup = document.getElementById('popup')
                // popup.classList.remove('appear')
                // const timer = setTimeout(() => {
                //     setPopupState(false)
                // }, 300);
                }}>
                <span className='bar'></span>
                <span className='bar'></span>
                <span className='bar'></span>
            </Link>
            <div className={"choise choise-1 flex flex-col cd8 cm4 justify-between" + (width > 800 ? ' mbm' : ' flex-wrap')}>
                <div className="mbs subtitle">
                    <p>{formData?.firstChoiseSubtitle}</p>
                </div>
                <div className={"choise-items flex flex-row flex-wrap cb-mid" + (width > 800 ? ' justify-between' : ' justify-start')} >
                    {formData?.firstChoise.map((c, i) => {
                        return <p id={c.choiseItem} key={i} onClick={() => firstChoiseHandler(c.choiseItem)} className={' firstChoise choise-item' + (width > 800 ? ' mbs' : ' mbs mrs')}>{c.choiseItem}</p>
                    })}
                </div>
            </div>
            <div className={"inputs flex cb-mid justify-between cd8 cm4" + (width > 800 ? ' flex-row ' : ' flex-col ')}>
                <div className={"input-field cb-mid" + (width > 800 ? ' mr' : ' ')}>
                    <div className="input-container">
                        <input
                            disabled={disableInput1}
                            autoComplete="off"
                            type="text"
                            name="name"
                            id="name"
                            placeholder=" "
                            onFocus={(e) => {
                                onFocus(e)
                                setDisableInput2(true)
                                setDisableInput3(true)
                            }}
                            // onHover={() => {
                            // 	setDisableInput1(false)
                            // }}
                            onChange={(e) => {
                                formik.handleChange(e)
                                const timer = setTimeout(() => {
                                    handleSchemaValue(e.target.value, formik.values.email, formik.values.mobilephone)
                                }, 100);
                                return () => clearTimeout(timer);
                            }
                            }
                            onBlur={(e) => {
                                onBlur(e)
                                setDisableInput2(false)
                                setDisableInput3(false)
                                setOnBlurOnce1(true)
                            }}
                            value={formik.values.name}
                        />
                        <label
                            // initial={{x: 0, opacity: 1}}
                            // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                            className={(focused === false && formik.values.name === '' ? 'label' : 'label animate')}
                            htmlFor="name">
                            Имя
                        </label>
                        {formik.errors.name && onBlurOnce1 === true ? (
                            <motion.div
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="error-container flex items-center">
                                <span className='error-message'>{formik.errors.name}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                </div>
                <div className={"input-field cb-mid" + (width > 800 ? ' mr' : ' ')}>
                    <div className="input-container">
                        <input
                            disabled={disableInput2}
                            autoComplete="off"
                            type="text"
                            name="email"
                            id="email"
                            placeholder=" "
                            onFocus={(e) => {
                                onFocus2(e)
                                setDisableInput1(true)
                                setDisableInput3(true)
                            }}
                            // onHover={() => {
                            // 	setDisableInput1(false)
                            // }}
                            onChange={(e) => {
                                formik.handleChange(e)
                                const timer = setTimeout(() => {
                                    handleSchemaValue(formik.values.name, e.target.value, formik.values.mobilephone)
                                }, 100);
                                return () => clearTimeout(timer);
                            }
                            }
                            onBlur={(e) => {
                                onBlur2(e)
                                setDisableInput1(false)
                                setDisableInput3(false)
                                setOnBlurOnce2(true)
                            }}
                            value={formik.values.email}
                        />
                        <label
                            // initial={{x: 0, opacity: 1}}
                            // animate={focused === false && formik.values.name === '' ? '' : animateInput}
                            className={(focused2 === false && formik.values.email === '' ? 'label' : 'label animate')}
                            htmlFor="email">
                            Email
                        </label>
                        {formik.errors.email && onBlurOnce2 === true ? (
                            <motion.div
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="error-container flex items-center">
                                <span className='error-message'>{formik.errors.email}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                </div>
                <div className="input-field cb-mid">
                    <div className="input-container">
                        <MaskedInput
                            disabled={disableInput3}
                            guide={false}
                            autoComplete="off"
                            mask={phoneNumberMask}
                            type="tel"
                            name="mobilephone"
                            id="mobilephone"
                            placeholder=" "
                            className=''
                            onFocus={(e) => {
                                onFocus3(e)
                                setDisableInput1(true)
                                setDisableInput2(true)
                            }}
                            onChange={(e) => {
                                formik.handleChange(e)
                                const timer = setTimeout(() => {
                                    handleSchemaValue(formik.values.name, formik.values.email, e.target.value)
                                }, 100);
                                return () => clearTimeout(timer);
                            }
                            }
                            onBlur={(e) => {
                                onBlur3(e)
                                setDisableInput1(false)
                                setDisableInput2(false)
                                setOnBlurOnce3(true)
                            }}
                            // onBlur={formik.handleBlur} 
                            value={formik.values.mobilephone.replace(/_/g, " ")}
                        />
                        <label
                            className={(focused3 === false && formik.values.mobilephone === '' ? 'label2' : 'label2 animate')}
                            htmlFor="phone">Телефон
                        </label>
                        <br />
                        {formik.errors.mobilephone && onBlurOnce3 === true ? (
                            <motion.div
                                transition={{
                                    duration: .2,
                                    ease: 'easeInOut',
                                    repeatType: 'mirror'
                                }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="error-container flex items-center">
                                <span className='error-message'>{formik.errors.mobilephone}</span>
                            </motion.div>
                        ) : ''}
                    </div>
                </div>
            </div>
            <div className={"message cd8 cm4 flex flex-col" + (width > 800 ? '' : ' ')}>
                <div className="mbs subtitle">
                    <p>{formData?.firstTextAreaSubtitle}</p>
                </div>
                <textarea name="message" id="formMessage" className={'w-full formMessage' + (width > 800 ? ' p' : ' ')}></textarea>
            </div>
            <div className="choise choise-2 mbm cd8 cm4 flex flex-col justify-between">
                <div className="mbs subtitle">
                    <p>{formData?.secondChoiseSubtitle}</p>
                </div>
                <div className={"choise-items flex flex-row flex-wrap cb-mid" + (width > 800 ? ' justify-between' : ' justify-start')}>
                    {formData?.secondChoise.map((c, i) => {
                        return <p key={i} id={c.choiseItem} onClick={() => secondChoiseHandler(c.choiseItem, choosenItems)} className={'secondChoise choise-item' + (width > 800 ? '' : ' mbs mrs')}>{c.choiseItem}</p>
                    })}
                </div>
            </div>
            {/* <div className="question cd9 cm4 mbm flex flex-col">
                <div className="mbs subtitle">
                    <p>{secondTextAreaSubtitle}</p>
                </div>
                <textarea name="question" id="" cols="30" className='w-full p'></textarea>
            </div> */}
            <div className='form-button px0 justify-center'
            >
                <button
                    
                    disabled={submitDelay && isSchemaValid ? false : true}
                    className={(sumbitDisable ? " p-events-none" : '') + ' ' + (isSchemaValid === true ? "" : " disabled")}
                    onClick={() => (isSchemaValid === true ? setBtnText("отправлено") : setBtnText("отправить"))}
                    type='submit'
                >
                    <a className='py' onClick={() => {setSubmitDisable(true)}}>
                        {btnText}
                    </a>
                </button>
            </div>
        </div>
    </form>
	  );
}

export default FormС






















