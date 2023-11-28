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

const phoneNumber = '89999999999'


const navItems = [
  {
    text: 'Главная',
    href: 'main'
  },
  {
    text: 'О нас',
    href: 'we'
  },
  {
    text: 'Кейсы',
    href: 'cases'
  },
  {
    text: 'Команда',
    href: 'team'
  },
  {
    text: 'Услуги',
    href: 'services'
  },
  {
    text: 'Контакты',
    href: 'contacts'
  },
]


export default function Header (props) {

    const { logoText, logo,  text, button } = props.props

    const {popupState, setPopupState} = useContext(AllContexts)

    const [lang, setLang] = useState('RU')

    const [width] = useWindowDimensions()

    // const scrollDirection = useScrollDirection();
  
    const { scrollY } = useViewportScroll();
    const top = useTransform(scrollY, [0, 100], [0, -35]);
    const [hidden, setHidden] = useState(false);


  
    function update() {
      if (popupState === false) {
        if (scrollY?.current < scrollY?.prev) {
          setHidden(false);
        } else if (scrollY?.current > 600 && scrollY?.current > scrollY?.prev) {
          setHidden(true);
        }
      }
    }


    function scrollTo(par) {
      document.getElementById(par).scrollIntoView({ block: 'start' });
      width > 800 ? window.scrollBy(0, -30) : window.scrollBy(0, -40);
      // window.scrollTo({top: contacts, behavior: 'smooth'});
   }

    const fetchFormData = () => {
      axios.get(`${process.env.API_LINK}/api/form?populate=deep`)
          .then(function(res) {
              // setFormData(res.data)
          })
          .catch(function(error) {
              return error
          })
    }

    useEffect(() => {
      fetchFormData()
      return scrollY.onChange(() => update());
    });

    function scrollToContacts() {
      document.getElementById(`contacts`).scrollIntoView({ behavior: 'smooth', block: 'start' });
      width > 800 ? window.scrollBy(0, -60) : window.scrollBy(0, 0);
      // window.scrollTo({top: contacts, behavior: 'smooth'});
    }
  
    
      const variants = {
        visible: { y: 0 },
        hidden: { y: -105 }
      };
      const variantsMobile = {
        visible: { y: 0 },
        hidden: { y: -25 }
      };
    
    // const menuLinks = ['About', 'Services', 'Contact Us', 'Career']

    const clickBtnHandler = () => {
      setPopupState(true)
  }

    const languageHanlder = (arg) => {
      arg === 'RU' ? setLang('EN') : setLang('RU')
    }
    
 
    if ( type === 1 ) {
      if (width) {
        if (width > 800) {
          return (
            <motion.section 
              className={'header' + ( hidden ? ' hidden' : ' ')}
              variants={variants}
              animate={hidden ? "hidden" : "visible"}
              style={{ top }}
            >
              {/* <div className='name flex space-between justify-center cd12'>
                <p>{text}</p>
              </div> */}
              <div className='cd12 flex justify-between items-center '>
                <Link href={'/'} className='flex items-center logo '>
                  <Image quality={100} width={100} className='mrs' height={100} src={findImageUrl(logo, 'url')}></Image>
                  <p>{logoText}</p>
                </Link>
                <div className='nav-container flex justify-center cb-mid '>
                    {navItems?.map((n, i) => {
                        return <div key={i} onClick={() => scrollTo(n.href)}  className='nav-item'><p>{n.text}</p></div>
                    })}
                </div>
                  {/* {popupState === true ?  <div className={'burger cd2'} onClick={() => setPopupState(false)}>
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div> : button && (<div className='cd2 flex justify-end'>
                  <div href={''} onClick={() => clickBtnHandler()} className='nav-item cb-mid'><p>{button.text}</p></div>
                </div>)} */}
                {button && (<div className=' header-btn flex justify-between items-center flex-row'>
                  <a href={'tel:' + phoneNumber} className="phoneNumber flex justify-center">
                      {phoneNumber}
                  </a>
                  <Link href={button.href} onClick={() => clickBtnHandler()} className=' headerBtn cb-mid my'>{button.text}</Link>
                  <span className='language' onClick={() => languageHanlder(lang)}>{lang}</span>
                </div>)}
              </div>
              {/* {popupState === true && <PopupLayout/> } */}
            </motion.section>
          );
      } else {
        return (
          <motion.section 
            className={'header'}
            variants={variantsMobile}
            animate={hidden ? "hidden" : "visible"}
            style={{ top }}
          >
            <div className='name flex space-between justify-center mbs'>
              <p>{text}</p>
            </div>
            <div className='flex justify-between items-center'>
              <Link href={'/'} className='flex items-center logo'>
                <Image quality={100} width={100} className='mrs' height={100} src={findImageUrl(logo, "url")}></Image>
                <p>{logoText}</p>
              </Link>
              <div className='flex justify-center cb-mid'>
                    {navItems?.map((n, i) => {
                        return <div key={i} className='nav-item' onClick={() => scrollTo(n.href)}>{n.text}</div>
                    })}
                  {/* <Link className='nav-item' href='/#we' >Кто мы</Link>
                  <Link className='nav-item' href='/#cases' >Кейсы</Link>
                  <Link className='nav-item' href='/#services' >Услуги</Link> */}
                </div>
              
            </div>
            {/* {popupState === true && <PopupLayout/> } */}
          </motion.section>
        );
      }}
    }

    if (type === 2) {
      if (width && width > 800) {
          return (
              <motion.section 
                  className={"header header-" + type + " w-full " + (toggleBurger === true ? 'active' : '') + " flex flex-col"}
                  // variants={variants}
                  // animate={hidden ? "hidden" : "visible"}
              >
                  <div className='flex flex-row header-top w-full justify-between items-center pxm pb'>
                      <div className="logo">
                          <Link onClick={() => setToggleBurger(false)} href="/">
                              <Image quality={100} width={1000} className={'logo-svg mr ' + (width > 800 ? ' ' : ' mt') } height={1000} src={findImageUrl(logo, 'url')} alt={''}></Image>
                          </Link>
                      </div>
                      <div className={"header-bottom pxm" + (toggleBurger === true ? 'active' : '')  + " flex flex-row cont-padding-l-r justify-center items-center p w-full h-auto"}>
                          {/* <Link href={`/about`}>                				<a>Компания</a>
                          </Link> */}
                          {layoutLinks?.map((l, i) => {
                              return l.text === "Контакты" ? <p onClick={() => scrollToContacts()} className='mx' key={i} href={''}>{l.text}</p> : <Link className='mx w-fit' key={i} href={`${l.href}`}>{l.text}</Link>
                          })}
                      </div>
                      <div className={"info " + (toggleBurger === true ? 'active' : '') + " flex flex-row items-center justify-between"}>
                          {headerButton ? 
                          <Button
                              type={1}
                              text={headerButton.text}
                              href={headerButton.href}
                              className={"m0 form-button"}
                          /> : '' }
                      </div>    
                  </div>
              </motion.section>
          );
      } else if (width && width <= 800) {
          return (
              <motion.section 
                  className={"header header-" + type + " w-full " + (toggleBurger === true ? 'active h-full' : '') + " flex flex-col justify-between"}
                  // variants={variantsMobile}
                  // animate={hidden ? "hidden" : "visible"}
              >
                  <div className='flex flex-row header-top cont-padding-l-r justify-between px pb'>
                      <div className="logo">
                      <Link onClick={() => setToggleBurger(false)} href="/">
                          <Image quality={100} width={1000} className={'logo-svg-mob mr ' + (width > 800 ? ' ' : ' ') } height={1000} src={findImageUrl(logo, 'url')} alt={''}></Image>
                      </Link>    
                      </div>
                      <div className={'burger ' + (toggleBurger === true ? 'active' : '')} onClick={() => setToggleBurger(!toggleBurger)}>
                          <span className='bar'></span>
                          <span className='bar'></span>
                          <span className='bar'></span>
                      </div>
                  </div>
                  <div className={"header-bottom " + (toggleBurger === true ? 'active' : '')  + " flex cont-padding-l-r justify-start p w-full h-auto"}>
                      {/* <Link href={`/about`}>                				<a>Компания</a>
                      </Link> */}
                          {layoutLinks?.map((l, i) => {
                              return l.text === "Контакты" ? <p onClick={() => {scrollTo(); setToggleBurger(false)}} className='ml0 m-mob' key={i} href={''}>{l.text}</p> : <Link onClick={() => setToggleBurger(false)} className={(width > 800 ? "mll" : 'ml0 m-mob')} key={i} href={`${l.link}`}>{l.text}</Link>
                          })}
                  </div>
                  <div className={"info " + (toggleBurger === true ? 'active' : '') + " flex flex-col items-center justify-between mb"}>
                        {headerButton ? 
                          <Button
                              type={1}
                              text={headerButton.text}
                              href={headerButton.href}
                              className={"m0 form-button"}
                          /> : '' }
                              {/* <a onClick={() => {mapScrollTo(); setToggleBurger(false)}} className='msk'>{props?.data?.town}</a>
                              <a href={"tel:" + props?.data?.firstPhone}>{props?.data?.firstPhone}</a>
                              <a href={"tel:" + props?.data?.secondPhone}>{props?.data?.secondPhone}</a> */}
                  </div>  
              </motion.section>
          );
      }
    }
}