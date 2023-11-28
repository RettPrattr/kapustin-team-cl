import React, {useState} from 'react';
import TextCards from '@/components/TextCards';
import FormС from '@/components/atoms/Form';


export default function Test () {
    return (
        <div>
            <TextCards />
            <FormС 
                type={2}
            />
        </div>
    )
}