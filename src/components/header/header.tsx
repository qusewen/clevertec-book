import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/svg/logo.png';
import person from '../../assets/png/avatar.png';
import './header.scss';
import { BurgerNavigation } from '../navigation/burger-navigation';
import { States } from '../../types/types';

export const Header = () => {
  const [burgerOpenState, setBurgerOpenState] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [login, setLogin] = useState(true);
  const { user} = useSelector((state: States) => state.user);
  const dispatch = useDispatch();
  function burgerStateOpen() {
    dispatch({ type: 'openBurger' });
    setBurgerOpenState(true);
  }
  function burgerStateClose() {
    dispatch({ type: 'closeBurger' });
    setBurgerOpenState(false);
  }
  useEffect(() => {
    if (!login) {
      window.location.reload();
    }
  }, [login]);
  const valueStateBurger = useSelector((state: States) => state.burger);
  const location = useLocation().pathname;
  return (
    <header
      className={
        location === '/auth' || location === '/registration' || location === '/forgot-pass' ? 'header_none' : 'header'
      }
    >
      <div className='container'>
        <div className='header__body'>
          <button
            data-test-id='button-burger'
            type='button'
            className='header__burger'
            onScroll={() => false}
            onClick={() => (valueStateBurger.burgerSet ? burgerStateClose() : burgerStateOpen())}
          >
            <span className={valueStateBurger.burgerSet ? 'header__burger_item-active' : 'header__burger_item'}> </span>
            <span className={valueStateBurger.burgerSet ? 'header__burger_item-active' : 'header__burger_item'}> </span>
            <span className={valueStateBurger.burgerSet ? 'header__burger_item-active' : 'header__burger_item'}> </span>
          </button>
          <BurgerNavigation data-test-id='burger-navigation' />
          <div className='header__wrapper'>
            <Link to='/all'>
              <div>
                <img className='header__img' src={logo} alt='logo' />
              </div>
            </Link>
            <h1 className='header__title'>Библиотека</h1>

            <div className='header__person'>
              <button
                type='button'
                className='button_exit'
                onClick={() => (openInfo ? setOpenInfo(false) : setOpenInfo(true))}
              >
                {' '}
              </button>
              <p className='header__person_info'>Привет,{user?.user?.firstName}!</p>
              <img className='header__person_info-img' src={person} alt='person' />
              <div className={openInfo ? 'active_info-person profile_info' : 'profile_info'}>
                <div className='nav__list_item'>
                  <span className='nav__list_item-text'>Профиль</span>
                </div>
                <div className='nav__list_item'>
                  <button


                    className='nav__list_item-text exit-text-btn'
                    type='button'
                    onClick={() => {
                      localStorage.setItem('token', ``);
                      localStorage.setItem('login', 'false');
                      setLogin(false);
                    }}
                  >
                    Выход
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
