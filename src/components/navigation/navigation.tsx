import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import './navigation.scss';
import { getCategories } from '../../redux/actions/categories-action';
import { Loader } from '../loader/loader';
import { ResError } from '../res-error/res-error';
import { AppDispatch } from '../../redux/store';
import { Count } from '../count/count';
import { Menu, States } from '../../types/types';

const activeStyle = {
  background: 'linear-gradient(231.58deg, #F83600 -53.35%, #F9D423 297.76%)',
};

type RootState = {
  burger: any
};

export const Navigation = () => {
  const valueStateBurger = useSelector((state: RootState) => state.burger);
  const [closeFlag, setCloseFlag] = useState(valueStateBurger);
  const [openAcard, setOpenAcard] = useState(false);
  const { categories, loading, error } = useSelector((state: States) => state.categories);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const [activCat, setActivCat]= useState(true)
  const { user, success, bodyError } = useSelector((state: States) => state.user);





  useEffect(() => {
    if (location.pathname === '/treaty' || location.pathname === '/rules') {
      setOpenAcard(false);
      setActivCat(false)
    } else {
      setOpenAcard(true);

    }
    if(success){
      dispatch(getCategories(user.jwt));
    }
  }, [location.pathname, dispatch,user.jwt,success]);

  function burgerStateClose() {
    dispatch({ type: 'closeBurger' });
  }
  const closeBurgerMenu = () => {
    if (closeFlag) {
      burgerStateClose();
    }
  };

  if (error) {
    return (
      <>
        <ResError />
        <aside className={valueStateBurger.burgerSet ? 'nav__burger' : 'nav'}>
          <div className='nav__body'>
            <ul className='nav__list'>
              <li className='nav__list_item'>
                <NavLink
                  onClick={() => (openAcard ? setOpenAcard(false) : setOpenAcard(true))}
                  data-test-id='navigation-showcase'
                  className={({ isActive }) =>
                    isActive
                      ? 'first-link-active  nav__list_item-text nav__list_item-text-first'
                      : ' first-link-active link nav__list_item-text nav__list_item-text-first '
                  }
                  to='/all'
                >
                  Витрина книг{' '}
                  <span className={openAcard ? 'nav__list_item-text-first-open' : 'nav__list_item-text-arrow-close'}>
                    {' '}
                  </span>
                </NavLink>
              </li>
              <li className='nav__list_item'>
                <NavLink
                  data-test-id='navigation-terms'
                  className={({ isActive }) => (isActive ? 'first-link-active' : 'link')}
                  to='/rules'
                >
                  <span className='nav__list_item-text'>Правила пользования</span>
                </NavLink>
              </li>
              <li className='nav__list_item'>
                <NavLink
                  data-test-id='navigation-contract'
                  className={({ isActive }) => (isActive ? 'first-link-active ' : 'link ')}
                  to='/treaty'
                >
                  <span className='nav__list_item-text'>Договор оферты</span>
                </NavLink>
              </li>


            </ul>
          </div>
        </aside>
      </>
    );
  }
  if (loading) {
    return <Loader />;
  }

  return (
    <aside className={valueStateBurger.burgerSet ? 'nav__burger' : 'nav'}>
      <div className='nav__body'>
        <ul className='nav__list'>
          <li className='nav__list_item'>
            <NavLink
              onClick={() => (openAcard ? setOpenAcard(false) : setOpenAcard(true))}
              data-test-id='navigation-showcase'
              className={({ isActive }) =>
                isActive || activCat
                  ? 'first-link-active  nav__list_item-text nav__list_item-text-first'
                  : 'link nav__list_item-text nav__list_item-text-first '
              }
              to='/all'
            >
              Витрина книг{' '}
              <span className={openAcard ? 'nav__list_item-text-first-open' : 'nav__list_item-text-arrow-close'}>
                {' '}
              </span>
            </NavLink>

            <ul className={openAcard ? 'nav__list_second' : 'close__acardion'}>
              <li className='nav__list_second-item'>
                <NavLink
                  data-test-id='navigation-books'
                  onClick={closeBurgerMenu}
                  className={({ isActive }) => (isActive ? 'link-active' : 'link')}
                  to={'/all' || '/' || '/books/all'}
                >
                  Все книги
                </NavLink>
              </li>

              {categories.map((categories: Menu) => (
                <li key={categories.id} className='nav__list_second-item'>
                  <NavLink
                    data-test-id={`navigation-${categories.path}`}
                    onClick={closeBurgerMenu}
                    className={({ isActive }) => (isActive ? 'link-active' : 'link')}
                    to={`/books/${categories.path}`}
                  >
                    {categories.name}
                  </NavLink>
                  <span className='nav__list_second-item--count'>
                    <Count datatest={`navigation-book-count-for-${categories.path}`} name={categories.name}/>
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li className='nav__list_item'>
            <NavLink
              data-test-id='navigation-terms'
              className={({ isActive }) => (isActive ? 'first-link-active' : 'link')}
              to='/rules'
            >
              <span className='nav__list_item-text'>Правила пользования</span>
            </NavLink>
          </li>
          <li className='nav__list_item'>
            <NavLink
              data-test-id='navigation-contract'
              className={({ isActive }) => (isActive ? 'first-link-active ' : 'link ')}
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
            <li
            className='nav__list_item'>
              <NavLink onClick={closeBurgerMenu} to='/'>
                <span className='nav__list_item-text'>Выход</span>
              </NavLink>
            </li>
          </ul>
        </ul>
      </div>
    </aside>
  );
};
