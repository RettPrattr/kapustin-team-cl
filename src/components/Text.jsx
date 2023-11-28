import React from 'react';

function Text(props) {

    // Fetch кладется внутрь тела компонента и вызывается универсально для любого типа
    // После фетчей подключаем все в переменные ниже

    const type = props.type // : number
    
    const title = 'Увеличиваем прибыль вашего бизнеса'
    const subtitle = 'Подзаголовок'
    const text1 = 'Делаем это быстро и надежно'
    const text2 = 'Какой то длинный текст'

    // TYPE 1
    if ( type === 1 ) {
        return (
            <section className={'text text-1 flex flex-col'}>
                <div className="container text justify-between">
                    <div className="cd8 cm4 mbs">
                        <h4>{subtitle}</h4>
                        <h2>{title}</h2>
                    </div>
                    <div className="cd6 cm4 flex-col">
                        <p>{text1}</p>
                    </div>
                    <div className="cd6 cm4 flex-col">
                        <p>{text2}</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Text