import React from 'react';
import Link from "next/link";
import useWindowDimensions from './hooks/useWindowDimensions'
import Button from './atoms/Button.jsx';
import Image from 'next/image'
import findImageUrl from './utils/findImageUrl'
import findValue from './utils/findValue'
import { apiLink } from '@/components/utils/varUrls'


const title = 'Над вашим проектам будут работать...'

const subtitle = 'Тут нужен небольшой текст про команду'

const teamCards = [
    {
        name: 'Дмитрий Капустин',
        image: '/images/dmitriy.jpg',
        role: 'Основатель'
    },
    {
        name: 'Татьяна Натахина',
        image: '/images/tatiana.jpg',
        role: 'Дизайнер'
    },
    {
        name: 'Григорий Белотелов',
        image: '/images/grigoriy.jpg',
        role: 'Маркетолог'
    },
    {
        name: 'Никита Вонжулов',
        image: '/images/nikita.jpg',
        role: 'Fullstack разработчик'
    },
    // {
    //     name: 'Николац Бурцев',
    //     image: '/images/tatiana.jpg',
    //     role: ''
    // },
]

const TeamBlock = (props) => {

    const [width] = useWindowDimensions()

  return (
    <section id="team" className='teamBlock flex flex-col '>
      <div className="title flex w-full justify-center text-center">
          <h2>{title}</h2>
      </div>
      <div className="subtitle flex w-full justify-center text-center">
          <h4>{subtitle}</h4>
      </div>
      <div className={"teamCards flex flex-wrap" + (width > 800 ? ' flex-row ' : ' flex-col')}>
        {teamCards?.map((t, i) => {
            return <div className={"teamCard cd3 cm4 relative flex flex-col teamCard-" + i}>
                    <Image 
                        src={t.image}
                        // src={findImageUrl(t.image, "url")} 
                        width={2000} 
                        height={2000} 
                        quality={100} 
                        alt={''}
                        className=''
                        >
                    </Image>
                    <p className="name">{t.name}</p>
                    <span className='role absolute'>{t.role}</span>
                </div>
        })}
      </div>
    </section>
  )
}

export default TeamBlock
