import React from 'react';
import useWindowDimensions from './hooks/useWindowDimensions'

export default function Price (props) {

    const [width, height] = useWindowDimensions();

    if ( props.type === 1 ) {
        return (
            <section id="services" className='price price-1 flex flex-row'>
                <div className="w-full">
                    {
                        props.title &&
                        <div className="cd12 mbm text-center">
                            <h2>{props.title}</h2>
                        </div>
                        
                    }
                    
                    {props.priceItem.map((item)=>{
                        return (
                            <div className="priceItem flex flex-row space-between items-center w-full flex-wrap pbs" key={item.leftText}>
                                {
                                    item.leftText &&
                                        <>
                                        <div className="cd1 cm4">
                                            <h3 className='number'>{item.leftText}</h3>
                                        </div>
                                        <div className="cd-s-1"></div>
                                        </>
                                }
                                <div className='cd6 cm4 flex flex-col mb'>
                                    {item.name && <h3 className='mb'>{item.name}</h3>}
                                    {item.cost && <p className='op'>{item.cost}</p>}
                                </div>
                                {/* <div className="cd-s-1"></div> */}
                                {
                                    item.cost &&
                                        <div className='cd4 cm4 mb op'>
                                            <p>{item.description}</p>
                                        </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </section>
        )
    }
}

