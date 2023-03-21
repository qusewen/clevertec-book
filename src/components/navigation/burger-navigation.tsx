import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import './navigation.scss';
import { getCategories } from '../../redux/actions/categories-action';
import { AppDispatch } from '../../redux/store';
import { Count } from '../count/count';
import { Menu, States } from '../../types/types';

type RootState = {
  burger: any;
};

export const BurgerNavigation = () => {
  const valueStateBurger = useSelector((state: States) => state.burger);
  const [openAcard, setOpenAcard] = useState(false);
  const { categories, loading, error } = useSelector((state: States) => state.categories);
  const dispatch: AppDispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();
  const [login, setLogin] = useState(true);
  const { user, success, bodyError } = useSelector((state: States) => state.user);
  useEffect(() => {
    if (location.pathname === '/treaty' || location.pathname === '/rules') {
      setOpenAcard(false);
    } else {
      setOpenAcard(true);
    }
    if(success){
      dispatch(getCategories(user.jwt));
    }
    dispatch(getCategories(token));
  }, [location.pathname, dispatch, user.jwt, success,token]);
  useEffect(() => {
    if (!login) {
      window.location.reload();
    }
  }, [login]);
  function burgerStateClose() {
    dispatch({ type: 'closeBurger' });
  }
  const closeBurgerMenu = () => {
    if (valueStateBurger) {
      burgerStateClose();
    }
  };

  const openAcardion = () => {
    if (openAcard) {
      setOpenAcard(false);
    } else {
      setOpenAcard(true);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={closeBurgerMenu}
        className={valueStateBurger.burgerSet ? 'burger__close_field' : ''}
      >
        {' '}
      </button>
      <div className={valueStateBurger.burgerSet ? 'burger__navigation_active' : 'burger__navigation'}>
        <aside className={valueStateBurger.burgerSet ? 'nav__burger' : 'nav'}>
          <div className='nav__body'>
            <ul className='nav__list'>
              <li className='nav__list_item'>
                <NavLink
                  onClick={openAcardion}
                  data-test-id='burger-showcase'
                  className={({ isActive }) =>
                    isActive
                      ? 'first-link-active nav__list_item-text nav__list_item-text-first'
                      : 'link nav__list_item-text nav__list_item-text-first'
                  }
                  to='/all'
                >
                  Витрина книг{' '}
                </NavLink>

                <ul className={openAcard ? 'close__acardion ' : 'nav__list_second'}>
                  <li className='nav__list_second-item'>
                    <NavLink
                      data-test-id='burger-books'
                      onClick={closeBurgerMenu}
                      className={({ isActive }) => (isActive ? 'link-active' : 'link')}
                      to='/all'
                    >
                      Все книги
                    </NavLink>
                  </li>

                  {categories.map((categories: Menu) => (
                    <li key={Math.random()} className='nav__list_second-item'>
                      <NavLink
                        data-test-id={`burger-${categories.path}`}
                        onClick={closeBurgerMenu}
                        className={({ isActive }) => (isActive ? 'link-active' : 'link')}
                        to={`/books/${categories.path}`}
                      >
                        {categories.name}
                      </NavLink>
                      <Count datatest={`burger-book-count-for-${categories.path}`} name={categories.name} />
                    </li>
                  ))}
                </ul>
              </li>
              <li className='nav__list_item'>
                <NavLink
                  data-test-id='burger-terms'
                  onClick={closeBurgerMenu}
                  className={({ isActive }) => (isActive ? 'first-link-active' : 'link')}
                  to='/rules'
                >
                  <span className='nav__list_item-text'>Правила пользования</span>
                </NavLink>
              </li>
              <li className='nav__list_item'>
                <NavLink
                  data-test-id='burger-contract'
                  onClick={closeBurgerMenu}
                  className={({ isActive }) => (isActive ? 'first-link-active' : 'link')}
                  to='/treaty'
                >
                  <span className='nav__list_item-text'>Договор оферты</span>
                </NavLink>
              </li>

              <ul className='burger__navigation_profile'>
                <li className='nav__list_item'>
                  <NavLink onClick={closeBurgerMenu} to='/'>
                    <span className='nav__list_item-text'>Профиль</span>
                  </NavLink>
                </li>
                <li className='nav__list_item'>
                  <button
                  data-test-id='exit-button'
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
                </li>
              </ul>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};
