import React from 'react';
import Image from 'next/image'
import useWindowDimensions from './hooks/useWindowDimensions'
import findImageUrl from './utils/findImageUrl'
import AutoSlider from './atoms/AutoSlider.jsx';


// Как фетчить несколько таких блоков на одну страницу???
//  - Делаем проп - fetchUrl чтобы подбирать ссылку

// Тут надо, чтобы если фоток >1 то автоматом карусель
// - За это будет отвечать компонент AutoSlider

// Надо добавить возможность вставлять кнопку
// - Просто делать это через проброс props.children внутрь нужного места

function Story(props) {

    const [width, height] = useWindowDimensions();

    const {typeOfBlock, title, subtitle, text, description, paragraph, reverse, fullSize} = props
    
    // Fetch кладется внутрь тела компонента и вызывается универсально для любого типа
    // После фетчей подключаем все в переменные ниже

    
    const imageWidth = 2000
    const imageHeight = 2000
    
    // const title = 'Персональная гарантия качества'
    // const subtitle = 'Основатель, Дмитрий Капустин'
    // const text = 'Для нас главный приоритет — это качественный результат в срок. Персональная связь нашей команды лично со мной является гарантом надежности и качества наших услуг. Мы — не очередное безликое агентство и нацелены на плотное и долгосрочное сотрудничество.'

    /// ВМЕСТО br rich text


    findImageUrl(images, 'url')

    // TYPE 1
    if ( type === 1 ) {
        return (
            // <section className={'story story-1 flex flex-col ' + (reverse && ' reverse ')}>
            <section className={'story story-' + type + ' flex flex-col ' + (reverse && ' reverse ')}>
                <div className={"container text justify-between flex" + (width > 800 ? ' flex-row' : ' flex-col')}>
                    <div className="cd3 cm4">
                        <div className="subtitle">
                            <h4>{subtitle}</h4>
                        </div>
                    </div>
                    <div className="cd8 cm4 flex-col">
                        <h2>{title}</h2>
                        <div 
                            className=""
                            dangerouslySetInnerHTML={{ __html: text1 }}>
                        </div>
                        {props.children}
                    </div>
                </div>
                {
                    images 
                    && 
                    <div className={'cd12 cm4 ' + (fullSize === false && ' container')}>    
                        <AutoSlider images={images}/>
                    </div>
                }

            </section>
        )
    }

    if ( type === 2 ) { 
        return (
            <section className={'story story-' + type + ' flex '+ (width > 800 ? ' flex-row' : ' flex-col')}>
                <div className={"cd6 cm4 left-side" + (width > 800 ? ' mb' : ' ')}>
                    <Image className="two-angles-border" quality={100} width={imageWidth} height={imageHeight} src={findImageUrl(images, 'url')} alt={title}></Image>
                </div>
                <div className="container">
                    <div className="cd6 cm4 right-side flex flex-col">
                        <h2 className={'my' + (width > 800 ? ' my' : ' mb mt')}>{title}</h2>
                        <div className="flex">
                            <div className="cd-s-3 cm-s-0"></div>
                            <div 
                                className="cd6 cm4"
                                dangerouslySetInnerHTML={{ __html: text1 }}>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if ( type === 3 ) {
        return (
            <section className={'story story-' + type + ' flex flex-col ' + (reverse && ' reverse')}>
                
                <div className={"items-center " + (fullSize !== true && ' container')}>
                    <div className="cd-s-1"></div>
                    <div className="cd10 cm4">
                        <Image quality={100} width={imageWidth} height={imageHeight} className={'photo ' + (fullSize !== true && '')} src={findImageUrl(images, 'url')} alt={title}></Image>
                    </div>
                </div>
                <div className="container items-center">
                    <div className="cd-s-3"></div>
                    <div className="cd6 cm4 flex-col h-fit text">
                        <div className="subtitle">
                            <h4>{subtitle}</h4>
                        </div>
                            <h2>{title}</h2>
                            <p>{text1}</p>
                            {props.children}
                    </div>
                </div>  
            </section>
        )
    }


    if ( type === 4 ) {
        return (
            <section className={'story story-' + type}>
                <div className={"container items-center flex" + (reverse ? ' flex-row-reverse' : ' flex-row ')}>
                    <div className="cd6 cm4 flex-col h-fit text">
                        <div className="subtitle">
                            <h4>{subtitle}</h4>
                        </div>
                        <h2>{title}</h2>
                        <p className={width > 800 ? '' : ' mbs'}>{text1}</p>
                        {props.children}
                    </div>
                    <div className="cd6 cm4">
                        <Image quality={100} width={imageWidth} height={imageHeight} className={'photo ' + (width > 800 ? '' : ' mts')} src={findImageUrl(images, 'url')} alt={title}></Image>
                    </div>
                </div>  
            </section>
        )
    }

    if ( type === 5 ) {
        return (
            <section className={'story story-' + type + ' flex flex-col ' + (reverse && ' reverse')}>
                <div className="container flex flex-col">
                    <div className="cd12 cm4 flex-col h-fit text">
                        <div className="subtitle">
                            <h4>{subtitle}</h4>
                        </div>
                        <h2>{title}</h2>
                        <p>{text1}</p>
                        {props.children}
                    </div>
                    <div className="cd12 cm4">
                        <AutoSlider images={images}/>
                    </div>
                </div>  
            </section>
        )
    }

    if ( type === 6 ) {
        return (
            <section className={'story story-' + type}>
                <div className="container flex flex-col">
                    <div className={"top cd12" + (width > 800 ? '' : ' mb0')}>
                        <h2>{title}</h2>
                    </div>
                    <div className={"bottom flex items-center" + (width > 800 ? ' flex-row' : ' flex-col')}>
                        <div className="cd6 cm4">
                            <AutoSlider images={images}/>
                        </div>

                        <div 
                            className="cd6 cm4 flex items-center flex-col h-fit text"
                            dangerouslySetInnerHTML={{ __html: text1 }}>
                        </div>
                    </div>
                    {/* <Image quality={100} width={imageWidth} height={imageHeight} className={'photo cd6 cm4'} src='/images/image.webp' alt={title}></Image> */}
                </div>  
            </section>
        )
    }
    if ( type === 7 ) {
        return (
            <section className={'story story-' + type}>
                <div className="container items-center">
                    <div 
                        className="descriptionRich cd4 cm4 mb"
                        dangerouslySetInnerHTML={{ __html: text1 }}>
                    </div>
                    <div className="cd8 cm4">
                        <Image quality={100} width={2000} height={2000} className={'photo cd12 cm4'} src={findImageUrl(images, 'url')} alt={''}></Image>
                    </div>
                </div>
            </section>
        )
    }
    if ( type === 8 ) {
        return (
            <section className={'story story-' + type}>
                <div className="container flex flex-col">
                    <div className="cd12 cm4">
                        <h2>{title}</h2>
                    </div>
                    <div className="container items-center flex flex-row">
                        {images?.data?.map((p, i) => {
                            return  <div key={i} className={"image50 cd6 cm4 pl0" + (width > 800 ? ' ' : ' mb')}>
                                        <Image quality={100} width={2000} height={2000} className={'photo'} src={findImageUrl(p.attributes, 'url')}    alt={''}></Image>
                                    </div>
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default Story