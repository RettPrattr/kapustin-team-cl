import React, { useState } from 'react';
import Button from '@/components/atoms/Button'
import Image from 'next/image'
import findImageUrl from '@/components/utils/findImageUrl'
import useWindowDimensions from "@/components/hooks/useWindowDimensions"


function SideBarPage(props) {

    const [width] = useWindowDimensions()


    const { company, industry, description, preview, overlay, services, images, order, seoData, slug, caseLink } = props

    const type = props.type // : number

    const imageWidth = 2000
    const imageHeight = 2000

    const link = '#'

    

    // TYPE 1
    if ( type === 1) {
        return (
            <section className={'sideBarPage sideBarPage-' + type + ' flex flex-row '}>
                <div className='leftSide relative'> </div>
                    <div className="content w-full flex flex-col justify-between">
                        <div className='flex flex-col'>
                            {width > 800 ? <Button
                                type={1}
                                text='Вернуться на главную'
                                className='mt0 mr0'
                                href={'/'} 
                            /> : ''}
                            <h1 className='mt'>{company}</h1>
                            <h3 className='op py'>{industry}</h3>
                            {caseLink && (<Button 
                                type={1}
                                text={caseLink.text}
                                className='mb mt0 caseBtn'
                                href={caseLink.href}
                                target='_blank'
                            />)}
                            {/* <p>Описание по необходимости</p> */}
                        </div>
                        <div className='mtm'>
                            <div 
                                className="" 
                                dangerouslySetInnerHTML={{ __html: services }}>
                            </div>
                        </div>
                    </div>
                <div className="rightSide flex flex-col">
                    <Image width={imageWidth} height={imageHeight} src={findImageUrl(preview, 'url')}></Image>
                    {images.data.map((item, i) => {
                        return <Image key={i} width={imageWidth} height={imageHeight} src={findImageUrl(item, 'url')}/>
                    })}
                    {/* <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/>
                    <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/>
                    <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/>
                    <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/>
                    <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/>
                    <Image width={imageWidth} height={imageHeight} src='/images/image.webp'/> */}
                </div>
            </section>
        )}
}

export default SideBarPage