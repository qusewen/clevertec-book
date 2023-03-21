import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from '../button/button';
import { Rate } from '../rate/rate';
import './card.scss';

type Props = {
  cardClass: string;
  cardImg: string;
  img: [] | any;
  lineCard: string;
  cardContent: string;
  rateContent: string;
  val: number;
  cardName: string;
  name: string | [] | any;
  cardAuthor: string;
  author: string[];
  buttonContentBody: string;
  buttonContent: string;
  categories: string;
  id: number;
  inputValue: string;
  buttonText:string;
  disabled:boolean;
  buttonClass2:string;
  onClick:React.MouseEventHandler<HTMLButtonElement>;
};
export const Card = ({
  cardClass,
  cardImg,
  img,
  lineCard,
  cardContent,
  rateContent,
  val,
  cardName,
  name,
  cardAuthor,
  author,
  buttonContentBody,
  buttonContent,
  categories,
  id,
  inputValue,
  buttonText,
  disabled,
  buttonClass2,
  onClick
}: Props) => (
  <div className={cardClass} data-test-id='card'>
    <div className='card__photo'>
      <img src={img} alt='book' className={cardImg} />
    </div>
    <Link to={`/books/${categories}/${id}`}>
      {' '}
      <div className='links'> </div>
    </Link>

    <div className={lineCard}>
      <div className={cardContent}>
        <div className={cardName}>{name} </div>
        <div className={cardAuthor}>{author}</div>
      </div>
      <div className={rateContent}>
        <Rate name='rating' val={val} />
      </div>
    </div>
    <div className={buttonContentBody}>
      <Button   testId='booking-button' buttonClass2={buttonClass2} disabled={disabled} onClick={onClick} buttonClass={buttonContent} buttonText={buttonText} />
    </div>
  </div>
);
