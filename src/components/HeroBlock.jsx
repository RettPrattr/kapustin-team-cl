import useWindowDimensions from './hooks/useWindowDimensions'
import { React, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Button from '../components/atoms/Button'
import findImageUrl from './utils/findImageUrl'
import MenuItem from './MenuItem';
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { AllContexts } from '@/components/context/Context'
import PopupLayout from './layouts/PopupLayout'
import axios from 'axios';

import Link from 'next/link'

const heroCards = [
    {
        gridClass: '1',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '2',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '3',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '4',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '5',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '6',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '7',
        url: '/images/case.jpg',
        href: '/'
    },
    {
        gridClass: '8',
        url: '/images/case.jpg',
        href: '/'
    },
]

const HeroBlock = () => {
  return (
    <section id="main" className='heroBlock'>
      {heroCards?.map((h, i) => {
          return <Link href={h.href} key={i} className={"heroEl heroEl-" + h.gridClass}>
                    <Image 
                        src={h.url} 
                        width={2000} 
                        height={2000} 
                        quality={100} 
                        alt={''}
                        className={'heroElImage heroElImage-' + h.gridClass}
                        >
                    </Image>
          </Link>
      })}
    </section>
  )
}

export default HeroBlock
