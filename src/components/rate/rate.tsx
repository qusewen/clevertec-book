import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { States } from '../../types/types';
import './rate.scss';

type Props ={
  val: number,
  onChange?:React.FocusEventHandler<HTMLInputElement>,
  name:string
}
export const Rate = ({val,onChange,name}: Props) => {
   const  [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
const {rate} = useSelector((state: States)=>state.rate)

  return (
    <div>
      {val===null? <p className='rate-no-rate'>ещё нет оценок</p>:[...Array(5)].map((star, i) => {
        const ratingValue:any = i + 1;

        return (
          <label key={Math.random () }>
            <input
              value={ratingValue}
              className='star-input'
              type='radio'
              name={'rating' || name}
              onClick={() => setRating(ratingValue)

              }
                  onChange={onChange}
            />
            <FaStar
              size={20}
              color={ratingValue <= (hover || rating || val)  ? '#FFBC1F' : 'white'}
              className='star-item'

              onMouseEnter={() => {
                setHover(ratingValue);
              }}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}

    </div>
  );
};
