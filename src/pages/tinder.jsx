import React, {useState, useEffect} from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import utm from '@/components/utils/utm'

import { useSearchParams } from 'next/navigation';

import Head from 'next/head'

export default function Tinder () {

    const [cards, setCards] = useState([
        {id: 1, name: 'айдентика', v1: 'айдентику', v2: 'айдентики', 
            text: 'Ты такой красивый... бренд', 
            category: 'упаковка', photo: 'aidentika', slug: '/services/aidentika'},
        {id: 2, name: 'CRM', v1: 'CRM', v2: 'CRM',
            text: '',
            category: '', photo: '', slug: '/services/crm'},
        {id: 3, name: 'скрипты продаж', v1: 'скрипты продаж', v2: 'скриптов продаж', 
            text: '', 
            category: '', photo: '', slug: '/services/scripty_prodazh'
        },
        {id: 4, name: 'омниканальный мессенджер', v1: 'омниканальный мессенджер', v2: 'омниканального мессенджера', 
            text: '', 
            category: '', photo: '', slug: '/services/omnikanalniy_messenger'
        },
        {id: 5, name: 'продукт трипваер', v1: 'продукт трипваер', v2: 'продукта трипваера', 
            text: '', 
            category: '', photo: '', slug: '/services/product_tripvaier'
        },
        {id: 6, name: 'новый сайт', v1: 'новый сайт', v2: 'нового сайта', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 7, name: 'email маркетинг', v1: 'email маркетинг', v2: 'email маркетинга', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 8, name: 'SMM', v1: 'SMM', v2: 'SMM', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 9, name: 'таргетированная реклама', v1: 'таргетированную рекламу', v2: 'таргетированной рекламы', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 10, name: 'геймификация', v1: 'геймификацию', v2: 'геймификации', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 11, name: 'маркетинговая стратегия', v1: 'маркетинговую стратегию', v2: 'маркетинговой стратегии', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 12, name: 'таск трекер', v1: 'таск трекер', v2: 'таск трекера', 
            text: '', 
            category: '', photo: '', slug: ''
        },
        {id: 13, name: 'чат бот', v1: 'чат бота', v2: 'чат бота', 
            text: '', 
            category: '', photo: '', slug: ''
        }
    ]);

    const phrases = [
        // Stage 0-5
        [
            [1, 'Люблю'],
            [2, 'Не хватает']
        ],
        [
            [0, 'String'],
            [0, 'String']
        ],
        [
            [0, 'String'],
            [0, 'String']
        ],
        [
            [0, 'String'],
            [0, 'String']
        ],
        [
            [0, 'String'],
            [0, 'String']
        ],
        [
            [0, 'String'],
            [0, 'String']
        ]
    ];

    const all = 13
    const total = all - cards.length 

    var [no, setNo] = useState([])
    const [result, setResult] = useState({ like: 0, nope: 0 });

    const [random, setRandom] = useState()

    const activeIndex = cards.length - 1;
    const removeCard = (oldCard, swipe) => {

        var exist = no?.find((i) => i === oldCard)
        if ( exist == undefined ) {
            setTimeout(()=>{
                setCards((current) =>
                    current.filter((card) => { return card.id !== oldCard.id })
                );
            }, 250)
            setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
            var tempArr = no
            swipe == 'nope' && tempArr.push(oldCard)
            setNo(tempArr)
            cards.length == 1 ? setRandom(Math.floor(Math.random()*no.length)) : null
        }
    };

    const [overlay, setOverlay] = useState(true)

    const [phrase, setPhrase] = useState()
    useEffect(()=> {
        shuffle(cards)
        setPhrase(randomIntFromInterval(0,1))
    }, [])

    const [stage, setStage] = useState(-1) 
    useEffect(()=> {
        total - no.length == 0 && setStage(0)
        total - no.length >= 1 && total - no.length <= 3 && setStage(1)
        total - no.length >= 4 && total - no.length <= 6 && setStage(2)
        total - no.length >= 7 && total - no.length <= 9 && setStage(3)
        total - no.length >= 10 && total - no.length <= 12 && setStage(4)
        total - no.length == 13 && setStage(5)

        console.log(no)
    }, [cards])

    const searchParams = useSearchParams();
    // E.g. `/dashboard?page=2&order=asc`
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');


    return (

        <div className='tinder'>
            <Logo />
            <AnimatePresence>
               <div className="cardsStack relative">
                   {overlay && (
                    <div className="cardsOverlay Card g20">
                        <p><b>Помнишь правила тиндера?</b></p>
                        <p>Наша игра похожа, пройди все 13 карточек и получи краткий отчет о том, насколько твой бизнес в тренде технологий. </p>
                        <p>Если ты используешь инструмент в своем бизнесе – лайкни его свайпом вправо, свайп влево если не используешь!</p>
                        <div onClick={()=>setOverlay(!overlay)} className="btn">Начать</div>
                    </div>
                   )}
                    <div className="finish g20 flex flex-col items-center justify-center">
                        <Image src="/images/case.jpg" alt="" className={'rounded'} width={500} height={500}/>
                        <h2 className={'res' + stage}>{total - no.length} из 13</h2> 
                        <p className={'finalText'}>
                            {stage >= 0 && phrases[stage][phrase][1] + ' '}
                            <a href={
                                'https://kapustin.team'
                                + no[random]?.slug
                                + utm(source ? source + '_quest_finished' : 'quest_finished', medium ? medium + '_promo' : 'promo', 'tinder_completed')
                            }>
                                {stage >= 0 && phrases[stage][phrase][0] === 0 && no[random]?.name}
                                {stage >= 0 && phrases[stage][phrase][0] === 1 && no[random]?.v1}
                                {stage >= 0 && phrases[stage][phrase][0] === 2 && no[random]?.v2}
                            </a>
                        </p> 
                        
                        
                        

                        <Image onClick={() => window.location.reload()} src={'/tinder/renew.svg'} className='renew' width={200} height={200}/>
                    </div>
                    {cards.map((card, index) => (
                        <Card
                        key={card.id}
                        active={index === activeIndex}
                        removeCard={removeCard}
                        card={card}
                        />
                    ))}
                </div>
            </AnimatePresence>
            <div className={'Progress'}><ProgressBar currentValue={total} targetValue={13}/></div>
            <Footer />
            
        </div>
    )
}
    
export const Card = ({ card, removeCard, active }) => {
    const [leaveX, setLeaveX] = useState(0);
    const [rotate, setRotate] = useState(0);
    const onDragEnd = (_e, info) => {
        if (info.offset.x > 100) { setLeaveX(500); removeCard(card, "like"); }
        if (info.offset.x < -100) { setLeaveX(-500); removeCard(card, "nope"); }
        setRotate(0)
    };

    const onDrag = (_e, info) => setRotate(info.offset.x / 30)

    const searchParams = useSearchParams();
    // E.g. `/dashboard?page=2&order=asc`
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');

    return (
        <>
        {active ? (
             <motion.div 
                className='Card active flex flex-col justify-center items-center'
                drag='x'
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                initial={{ scale: 1 }}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                animate={{ scale: 1, rotate: rotate }}
                style={leaveX > 200 || leaveX < -200 ? { opacity: 0, scale: 0.5, transition: { duration: 0.5 } } : ''}
            >
                <div className="photoOverlay"></div>
                <div className={'textBlock'}>
                    <div className={'text'}>
                        <div className={'main'}>{card.name}</div>
                        <div className={'middle'}><Image src={'/tinder/caseIcon.svg'} width={100} height={100} alt="caseIcon" />{card.category}</div>
                        <div className={'bottom'}>{card.text}</div>
                    </div>
                    <a className={'aboutButton'} href={
                        'https://kapustin.team'
                        + card.slug
                        + utm(source ? source + '_quest_process' : 'quest_process', medium ? medium + '_promo' : 'promo', 'tinder_not_completed')
                    }>
                        <Image src={'/tinder/aboutIcon.svg'} width={100} height={100} alt="aboutIcon" />
                    </a>
                </div>
                <div className={'buttonLine'}>
                    <div className={'buttonLine flex flex-row'}>
                        <ActionButton type={'Back'} active={false}/>
                        <ActionButton onClick={()=> { setLeaveX(-500); removeCard(card, "nope"); }} type={'X'} active={true}/>
                        <ActionButton type={'Star'} active={false}/>
                        <ActionButton onClick={()=> { setLeaveX(500); removeCard(card, "like"); }} type={'Like'} active={true}/>
                        <ActionButton type={'Boost'} active={false}/>
                    </div>          
                </div>
            </motion.div>
        ) : (
            <motion.div 
                className='Card flex flex-col justify-center items-center'
                drag='x'
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                initial={{ scale: 1 }}
                onDragEnd={onDragEnd}
                animate={{ scale: 1. }}
                style={leaveX > 200 && { opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
            >
                <div className="photoOverlay"></div>
                <div className={'textBlock'}>
                    <div className={'text'}>
                        <div className={'main'}>{card.name}</div>
                        <div className={'middle'}><Image src={'/tinder/caseIcon.svg'} width={100} height={100} alt="caseIcon" />{card.category}</div>
                        <div className={'bottom'}>{card.text}</div>
                    </div>
                    <div className={'aboutButton'}>
                        <Image src={'/tinder/aboutIcon.svg'} width={100} height={100} alt="aboutIcon" />
                    </div>
                </div>
                <div className={'buttonLine'}>
                    <div className={'buttonLine flex flex-row'}>
                        <ActionButton type={'Back'} active={false}/>
                        <ActionButton onClick={()=> { setLeaveX(-500); removeCard(card, "nope"); }} type={'X'} active={true}/>
                        <ActionButton type={'Star'} active={false}/>
                        <ActionButton onClick={()=> { setLeaveX(500); removeCard(card, "like"); }} type={'Like'} active={true}/>
                        <ActionButton type={'Boost'} active={false}/>
                    </div>          
                </div>
            </motion.div>
        )}
        </>
    );
    }


export const Footer = (props) => {

    const searchParams = useSearchParams();
    // E.g. `/dashboard?page=2&order=asc`
    const source = searchParams.get('utm_source');
    const medium = searchParams.get('utm_medium');

    return (
        <footer className={'footer'}>
            <p>special project by <a href={'https://kapustin.team' + utm(source ? source + '_quest' : 'quest', medium ? medium + '_promo' : 'promo', 'tinder')} target='blank'>kapustin.team</a></p>
        </footer>
    )
}

export const Logo = (props) => {
    return (
        <div className={'logo'}>
            <Image src={'/tinder/logoIcon.svg'} width={25} height={25} alt="businessLogo"></Image>
            <div className={'logoText'}>business</div>
        </div>
    )
}

export const ProgressBar = ({ currentValue, targetValue }) => {
    const progressPercent = (currentValue/targetValue)*100;

    return (
        <div className={'progressBlock'}>
        <div className={'progressBar cb-mid'}><div className={'progress'} style={{width: `${progressPercent}%`}}></div></div>
        <div className={'progressText'}>{currentValue} из {targetValue}</div>
        </div>
    )
}

export const ActionButton = ({type, active, onClick}) => {
    const [buttonSize, setButtonSize] = useState({ width: 0 });

    useEffect(() => {
        const handleResize = () => {
            setButtonSize({
                width: window.innerWidth * 0.18,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (active) {
        return (
            <div className={'active'} onClick={onClick}>
                <Image src={'/tinder/' + type + '.svg'} width={buttonSize.width} height={buttonSize.width} alt="Button" />
            </div>
        )}
    else {
        return (
        <div className={'disable'}>
            <Image src={'/tinder/' + type + '.svg'} width={buttonSize.width-15} height={buttonSize.width-15} alt="Button" />
        </div> 
        )
    }
}

export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  export async function getServerSideProps() {
    const noLayout = true
  
    return {
      props: { noLayout }
    };
  }
  
// export function ProgressBar ({ currentValue, targetValue }) {

//     const progressPercent = (currentValue/targetValue)*100;

//     return (
//         <div className={'w-full flex flex-row justify-between items-center'}>
//         <div className={'w-full ov-hidden'} style={{height: 7, backgroundColor: '#D9D9D9', borderRadius: 30}}>
//             <div className={styles.progress} style={{width: `${progressPercent}%`}}></div></div>
//         <div className={styles.progressText}>{currentValue} из {targetValue}</div>
//         </div>
//     )
// }
