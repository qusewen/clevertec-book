import React, { useState } from 'react';
import glass from '../../assets/png/search.png';
import cross from '../../assets/svg/cross.svg'
import activeGlass from '../../assets/svg/active-serch.svg'
import './search.scss';

type Props = {
  searchName: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  searchState: boolean,
  onclick2:React.MouseEventHandler<HTMLButtonElement>,
  onInput: React.FormEventHandler,
  onFocus: React.FormEventHandler,
  onBlur:React.FormEventHandler,
  focusInputGlass:boolean
}
export const Search = ({searchName,onClick,searchState,onclick2, onInput, onFocus,onBlur,focusInputGlass}: Props) =>
  (
  <div className={searchName} >
    <button  onClick={onClick} data-test-id='button-search-open' type='button' className={searchState? 'searchButton_unactive' : 'searchButton'}><label className='button__search_label' htmlFor="searchBtn"> </label> </button>
    <input data-test-id='input-search' onInput={onInput} onFocus={onFocus}  id='searchBtn' onBlur={onBlur} className={searchState? 'search__field_active': 'search__field'} type='text' placeholder='Поиск книги или автора…'  />
    <img src={focusInputGlass? activeGlass:glass} alt='glass' className='search__img' />
    <button data-test-id='button-search-close' type='button' onClick={onclick2} className={searchState? 'closeButton-active':'closeButton'}> </button>


  </div>
);
