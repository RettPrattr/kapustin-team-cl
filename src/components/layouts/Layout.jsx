import React, { useContext, useEffect, useState } from 'react';

import { motion } from "framer-motion";
import Header from "@/components/Header"
// import BrandFooter from "@/components/BrandFooter"
import FixedButton from "@/components/atoms/FixedButton"

import axios from 'axios';
import { Context } from '../context/Context';
import PopupLayout from './PopupLayout';

import { AllContexts } from '@/components/context/Context';

import dynamic from "next/dynamic";

const BrandFooterD = dynamic(() => import("@/components/BrandFooter"));


export default function Layout({children}) {
    const {popupState, setPopupState} = useContext(AllContexts)
    const [footerData, setFooterData] = useState()
    const [headerData, setHeaderData] = useState()
    const [fixedBtnData, setFixedBtnData] = useState()


    async function fetchData() {
        const layoutResponse = await axios.get(`${process.env.API_LINK}/api/layout?populate=deep`)

        return {layoutRes: layoutResponse.data}
    }

    useEffect(() => {
        (async () => {
            const data = await fetchData()
            setFooterData(data?.layoutRes?.data?.attributes?.Footer)
            setHeaderData(data?.layoutRes?.data?.attributes?.Header)
            setFixedBtnData(data?.layoutRes?.data?.attributes?.FixedButton)
          })()
    }, [])

    if (headerData && footerData && fixedBtnData) {
        return (
            <Context>
                {/* {popupState === true && <PopupLayout/> } */}
                {/* <PopupLayout /> */}
    
                <Header props={headerData}/>
                <motion.main

                >
                    {children}
                </motion.main>
                <BrandFooterD props={footerData} />
                <FixedButton props={fixedBtnData} />
            </Context>
        )
    }
}