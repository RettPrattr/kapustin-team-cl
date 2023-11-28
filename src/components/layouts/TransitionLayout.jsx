import React, { useContext, useEffect, useState } from 'react';

import { motion } from "framer-motion";


import { Context } from '../context/Context';
import PopupLayout from './PopupLayout';

import { AllContexts } from '@/components/context/Context';


export default function TransitionLayout ({children}) {


    return (

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: .4,
                    ease: "easeInOut"
                }}
            >
                {children}
            </motion.div>
    )
}