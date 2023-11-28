import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { motion } from "framer-motion";
import MaskedInput from "react-text-mask";

import { AllContexts } from '@/components/context/Context'

import { useState, useEffect, useContext } from 'react';

import Button from './Button';
import { isSchema } from 'yup';

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


  const schema = Yup.object({
    name: Yup.string()
            .min(3, 'Минимальное количество символов: 3')
            .required('Обязательное поле'),
    mobilephone: Yup.string()
            .min(16, 'Введите номер полностью')
            .required('Обязательное поле')

            // .test('existenceNumber',
            //     function(value, formData) {

            //         // const arr = await fetchStrapiPhones()

            //         axios.get(`https://api.zesvet.ru/api/form-requests?populate=*&sort[0]=updatedAt%3Adesc&pagination[pageSize]=1000`)
            //             .then(function(res) {
            //                 setPhonesData(res.data)
            //                 // console.log(phonesData)
            //             })
            //             .catch(function(error) {
            //                 return error
            //             })

            //         let phonesArr = [];
                    
            //         phonesData.data?.map((item) => {
            //             phonesArr.push(item.attributes.phonenumber)
            //             return phonesArr
            //         })

            //         const booleanResult = !phonesArr.includes(value)
            //         // console.log(phonesData)
            //         // console.log(phonesArr)
            //         // console.log(booleanResult)
            //         // console.log(arr)
            //         return booleanResult === true ? true : this.createError({
            //             message: `Вы недавно уже отправляли заявку`,
            //             path: 'mobilephone', // Fieldname
            //           })

            //     } 
            // )
  })



const FormN = () => {
    const [togglePopup, setTogglePopup] = useState(false)
  return (
    <div>
      
    </div>
  )
}

export default FormN
