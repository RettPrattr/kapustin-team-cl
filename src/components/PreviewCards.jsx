import React from 'react';
import Link from "next/link";
import useWindowDimensions from './hooks/useWindowDimensions'
import Button from './atoms/Button.jsx';
import Image from 'next/image'


export default function PreviewCards (props) {

    const [width] = useWindowDimensions()





    if (props.type === 1) {
        return (
                <section className="PreviewCards PreviewCards-1">
                    <div className="container flex">
                        {previewCards.map((c, i) => {
                             return (
                            <div key={i} className="cd6 cm4">
                                <Link href="/">
                                    <div className={"relative flex flex-col previewCard-1 mb justify-between" + (width > 800 ? ' pm' : ' px py')}>
                                        <div className="absolute t0 l0 h-full bc-photo z-0">
                                            <Image quality={100} width={1000} className='photo' height={1000} src='/images/image.webp' alt={''}></Image>
                                        </div>
                                        <div className="top z-1">
                                            <h3>{c.name}</h3>
                                            <p>{c.description}</p>
                                        </div>
                                        <Button 
                                            className='z-100'
                                            type={1}
                                            text="button"
                                        />
                                    </div>
                                </Link>
                            </div>
                            )
                        })}

                    </div>
                </section>
        )
    }

    if (props.type === 2) {
        return (
                <section className="PreviewCards PreviewCards-2 bc-fill">
                    <div className="container flex flex-col">
                        <div className="top cd12">
                            <h2>Узнать больше</h2>
                        </div>
                        <div className={"flex" + (width > 800 ? ' flex-row' : ' flex-col')}>
                            {previewCards.map((c, i) => {
                                return i === previewCardsLength - 1 
                                ? 
                                <div className='cd3 cm4 ' key={i}>
                                    <Link href="/" className={"last-card-container previewCard-2 mb"}>
                                        <div className={'flex justify-between last-card relative base-br ' + (width > 800 ? ' flex-col pm pxs' : ' flex-row px pys')}>
                                            <h3 className='w-full mys'>Подобрать программу</h3>
                                            {/* <Button
                                                className="z-1"
                                                type='2'
                                                text="button"
                                            /> */}
                                        </div> 
                                    </Link>
                                </div>
                                : 
                                <div className='cd3 cm4 ' key={i}>
                                    <Link href="/" className='h-fit previewCard-2 mb'>
                                        <div className={"relative flex flex-col previewCard-3 mb justify-between" + (width > 800 ? ' pm' : ' p')}>
                                            <div className={"absolute t0 l0 h-full bc-photo z-0"}>
                                                <Image quality={100} width={1000} className='photo' height={1000} src='/images/image.webp' alt={''}></Image>
                                            </div>
                                            <div className="top z-1">
                                                <h3>{c.name}</h3>
                                                <p>{c.description}</p>
                                            </div>
                                            <Button 
                                                className="z-100"
                                                type={1}
                                                text="button"
                                            />
                                        </div>  
                                    </Link>
                                </div>
                            })}
                        </div>

                    </div>
                </section>
        )
    }
}