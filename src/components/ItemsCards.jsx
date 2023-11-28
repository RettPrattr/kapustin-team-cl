import React from 'react';
import Link from "next/link";
import useWindowDimensions from './hooks/useWindowDimensions'
import Button from './atoms/Button.jsx';
import Image from 'next/image'
import findImageUrl from './utils/findImageUrl'
import findValue from './utils/findValue'
import { apiLink } from '@/components/utils/varUrls'

import delve from 'dlv';

import { getStrapiMedia } from '@/components/utils/index';

// Потом сюда вношу маппинг объектов и убираю объект карточки

export default function ItemsCards(props) {

    const [width] = useWindowDimensions()

    const { type } = props

    const itemCards = props.itemCard.sort((a, b) => parseFloat(findValue(a, 'order')) - parseFloat(findValue(b, 'order')))

    const title = 'Проекты, которые мы реализовали'

    // const itemCards = [
    //     {
    //         src: 'image',
    //         name: 'дислексия.рф',
    //         description: 'Разработка POS–материалов для мероприятия',
    //         category: ['First', 'Second']
    //     },
    //     {
    //         src: 'image',
    //         name: 'дислексия.рф',
    //         description: 'Разработка POS–материалов для мероприятия',
    //         category: ['First']
    //     },
    //     {
    //         src: 'image',
    //         name: 'дислексия.рф',
    //         description: 'Разработка POS–материалов для мероприятия',
    //         category: ['Second']
    //     }
    // ]

    findImageUrl(itemCards, 'url')
    // itemCards.sort((a, b) => parseFloat(a.order) - parseFloat(b.order));


    if (type === 1) {
        return (
            <section id='cases' className="ItemCards ItemCards-1">
                <div className="flex flex-col">
                    <div className="cd12 text-center mbm">
                        <h2>{title}</h2>
                    </div>
                    <div data-cy="cards" className={"cards flex" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        {itemCards?.map((m, i) => {
                            let Block = null
                            m.href.data ? Block = Link : Block = 'div'
                            return <div className={' cd6 cm4 mbm pl0 pr0 card card-' + i + (i % 2 === 0 ? ' even ' : ' odd ')} key={i}>  
                                <Block href={m.href.data ? ('/cases/' + findValue(m.href, "slug")) : ''} className={'cards-item flex flex-col cb-mid'} key={i}>
                                        <div className='image-wrapper relative mbs'>
                                            {findValue(m.preview, "url") && 
                                            (<Image 
                                                src={findImageUrl(m.preview, "url")} 
                                                width={2000} 
                                                height={2000} 
                                                quality={100} 
                                                alt={m.title}
                                                className='photo z-0'
                                                >
                                            </Image>)
                                            }
                                            {findValue(m.overlay, "url") && (
                                            <Image 
                                                src={findImageUrl(m.overlay, "url")} 
                                                width={2000} 
                                                height={2000} 
                                                quality={100} 
                                                alt={m.title}
                                                className='overlay z-100'
                                                >
                                            </Image>
                                            )}
                                        </div>
                                        <h3 className='mbs'>{m.title}</h3>
                                        {/* <Link href=''>
                                            <h3 className='mbs'>{m.title}</h3>
                                        </Link> */}
                                        <p className=''>{m.description}</p>
                                    </Block>
                                </div>
                        })}
                    </div>
                </div>
            </section>
        )
    }
    if (type === 2) {
        return (
            <section className="ItemCards ItemCards-2">
                <div className="container flex flex-col">
                    <div className={"cards flex" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        {itemCards.map((m, i) => {
                            return  <div className={'flex cd4 cm4 flex-col my'} key={i}>
                                        <div className='image-wrapper mbs'>
                                            <Image 
                                                src={findImageUrl(m, 'url')} // TASK Вынести в функцию
                                                width={800} 
                                                height={800} 
                                                quality={100} 
                                                alt={m.name}
                                                className='photo'
                                                >
                                            </Image>
                                        </div>
                                        <Link href=''>
                                            <h3 className='mbs'>{m.title}</h3>
                                        </Link>
                                        { m.description && <p className=''>{m.description}</p> }
                                        {/* <div className="flex flex-row">
                                            {m.category.map((c, i) => {
                                                return <p key={i} className='mt mrs pxs category'>{c}</p>
                                            })}
                                        </div> */}
                                    </div>
                        })}
                    </div>
                    {/* <div className="cd12 cm4 title flex justify-end w-full mtm">
                        <Button 
                            href=''
                            icon=''
                            mode='underlined'
                        />
                    </div> */}
                </div>
            </section>
        )
    }
    if (type === 3) {
        return (
            <section className="ItemCards ItemCards-3">
                <div className="container flex flex-col">
                    <div className="cd12 cm4 title w-full mbm">
                        <h2>{title}</h2>
                    </div>
                    <div className={"cards flex" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        {itemCards.map((m, i) => {
                            return  <div className={'flex cd4 cm4 flex-col'} key={i}>
                                        <div className='image-wrapper mbs'>
                                            <Image 
                                                src={'/images/' + m.src + '.webp'} 
                                                width={800} 
                                                height={800} 
                                                quality={100} 
                                                alt={m.name}
                                                className='photo'
                                                >
                                            </Image>
                                        </div>
                                        <Link href=''>
                                            <h3 className='mbs'>{m.name}</h3>
                                        </Link>
                                        <p className=''>{m.description}</p>
                                        <Button 
                                            href=''
                                            icon=''
                                            mode='underlined'
                                        />
                                    </div>
                        })}
                    </div>
                </div>
            </section>
        )
    }
}


