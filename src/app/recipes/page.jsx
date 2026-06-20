import RecepieCard from '@/Components/Recepies/RecepieCard';
import React from 'react';

const RecipePage = () => {
    return (
        <div className='bg-amber-500  h-screen'>
             <h1 className='text-7xl'>Recpie apge</h1>
       <RecepieCard></RecepieCard>
               
        </div>
    );
};

export default RecipePage;