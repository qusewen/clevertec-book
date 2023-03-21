import React from 'react';
import { useSelector } from 'react-redux';
import select from '../../assets/png/select.png';
import select2 from '../../assets/svg/sort2.svg'
import './filter.scss';

type Props = {
  filterName: string,
  sortClick: React.MouseEventHandler<HTMLButtonElement>,
  sort: boolean
};
export const Filter = ({ filterName, sortClick, sort }: Props) => (
  <div className={filterName}>
    <button type='button' onClick={sortClick} data-test-id='sort-rating-button' className='select__filter'>
      {' '}
      <img src={sort? select2 : select} alt='select' className='select__img' /> По рейтингу

    </button>
  </div>
)
;
