import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { getBooks } from '../../redux/actions/books-action';
import { Card } from '../card/card';
import { FilterBar } from '../filter-bar/filter-bar';
import unbook from '../../assets/jpg/badbook.jpg';
import { AppDispatch } from '../../redux/store';
import { Book, Menu, States } from '../../types/types';
import { Order } from '../order/order';
import { SucErrBooking } from './suc-err-booking';
import './content-block.scss';

type Param = {
  categoria: string;
};
type Highlight = {
  children: string;
  highlightIndex: number;
};
const Highlights = ({ children, highlightIndex }: Highlight) => (
  <span data-test-id='highlight-matches' className='activeClass'>
    {children}
  </span>
);
export const ContentBlock = () => {
  const { categoria } = useParams<Param>();
  const [flag, setFlag] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const { book, error, loading } = useSelector((state: States) => state.books);
  const { categories } = useSelector((state: States) => state.categories);
  const [path, setPath] = useState('all');
  const [pathName, setPathName] = useState('all');
  const location = useLocation();
  const [test, setTest] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [focusInput, setFocusInput] = useState(false);
  const [focusInput2, setFocusInput2] = useState(false);
  const { user, success } = useSelector((state: States) => state.user);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userBook, setUserBook] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { booking, suc, err } = useSelector((state: States) => state.booking);
  const { sucDel, errorDel } = useSelector((state: States) => state.deleteBook);
  const {sucPut,errorPut} = useSelector((state: States)=> state.updateBook)

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      dispatch(getBooks(token));
    } else {
      navigate('/auth');
    }
  }, [dispatch, success, navigate, token]);

  useEffect(() => {
    if (categoria === undefined) {
      setPath('all');
    } else {
      setPath(categoria);
    }

    categories.filter((elem: Menu) => (elem.path === path ? setPathName(elem.name) : ''));
  }, [location, categories, path, categoria]);

  const newArray = [...book];
  useEffect(() => {
    if (suc || err || sucPut) {
      setOpenModal(false);
    } else if (sucDel || errorDel || errorPut) {
      setOpenModal(false);
    }
  }, [suc, err, sucDel, errorDel,sucPut, errorPut]);
  const sortFunc = () => {
    const newArrayCard: Book[] = [];
    newArray.map((card: Book) => (card.title.toLowerCase().includes(inputValue) ? newArrayCard.push(card) : ''));
    return newArrayCard;
  };
  const sortFuncSecond = () => {
    const newSortArray: Book[] = [];
    if (pathName === 'all') {
      newSortArray.push(book);
    } else {
      newArray.map((card: Book) => (card.categories.includes(pathName) ? newSortArray.push(card) : ''));
    }

    return newSortArray;
  };
  useEffect(() => {
    setFocusInput(false);
  }, [location]);
  return (
    <div className={error ? 'bar-none div' : 'div'}>
      <SucErrBooking />
      {openModal? <Order onClick2={()=> setOpenModal(false)} isIdbtn={userBook} modalSet={openModal} onClick={() => setOpenModal(false)} /> : ''}

      <FilterBar
        filterClick={() => {
          setFlag(1);
        }}
        filterSecondClick={() => {
          setFlag(2);
        }}
        sortClick={() => (test ? setTest(false) : setTest(true))}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value.toLowerCase())}
        onFocus={() => {
          setFocusInput(true);
          setFocusInput2(true);
        }}
        onBlur={() => setFocusInput2(false)}
        sort={test}
        focusInputGlass={focusInput2}
      />
      <div className='content' data-test-id='content'>
        {focusInput ? (
          sortFunc().length < 1 ? (
            <h2 className='error-search-title' data-test-id='search-result-not-found'>
              По запросу ничего не найдено
            </h2>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        {sortFuncSecond().length === 0 && path !== 'all' ? (
          <h2 className='error-search-title' data-test-id='empty-category'>
            В этой категории книг ещё нет
          </h2>
        ) : (
          ''
        )}
        {(test
          ? newArray.sort((a: Book, b: Book) => (+a.rating < +b.rating ? -1 : 1))
          : newArray.sort((a: Book, b: Book) => (+a.rating < +b.rating ? 1 : -1))
        ).map((card: Book) =>
          focusInput && inputValue !== '' ? (
            card.title.toLowerCase().includes(inputValue) ? (
              <Card
                cardClass={flag === 1 ? 'card' : 'line__card'}
                cardImg={flag === 1 ? 'card__photo_img' : 'line_img'}
                img={!card?.image?.url ? unbook : `https://strapi.cleverland.by${card?.image?.url}`}
                lineCard={flag === 1 ? 'card__content' : 'line_info'}
                cardName={flag === 1 ? 'card__name' : 'line__card_name'}
                name={
                  <Highlighter
                    highlightClassName='activeClass'
                    searchWords={[inputValue]}
                    autoEscape={true}
                    textToHighlight={card.title}
                    allowAsProps={true}
                    highlightTag={Highlights}
                  />
                }
                cardAuthor={flag === 1 ? 'card__author' : 'line__card_author'}
                cardContent={flag === 1 ? 'card__content_link' : 'item0 '}
                rateContent={flag === 1 ? 'card__rate' : 'item2'}
                author={card.authors}
                val={card.rating}
                buttonContentBody={flag === 1 ? 'card__button' : 'item3'}
                buttonContent={flag === 1 ? 'card__button' : ' line__button'}
                buttonClass2={
                  card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id) || suc ? 'pre_disabled' : ''
                }
                categories={path}
                id={card.id}
                key={card.id}
                inputValue={inputValue}
                disabled={
                  card?.booking?.order
                    ? card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id) || suc
                      ? false
                      : true
                    : card?.delivery
                    ? true
                    : false
                }
                buttonText={
                  card?.booking?.order || suc
                    ? 'забронирована'
                    : card?.delivery
                    ? `занята до ${card?.delivery?.dateHandedTo.slice(8, -14)}.${card?.delivery?.dateHandedTo.slice(
                        5,
                        -17
                      )}`
                    : 'забронировать'
                }
                onClick={() => {
                  if (card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id)) {
                    setUserBook(true);
                  } else {
                    setUserBook(false);
                  }
                  setOpenModal(true);
                  localStorage.setItem('card', `${card.id}`);
                }}
              />
            ) : (
              ''
            )
          ) : pathName === 'all' || path === 'all' || pathName === undefined || path === 'books/all' ? (
            <Card
              cardClass={flag === 1 ? 'card' : 'line__card'}
              cardImg={flag === 1 ? 'card__photo_img' : 'line_img'}
              img={!card?.image?.url ? unbook : `https://strapi.cleverland.by${card?.image?.url}`}
              lineCard={flag === 1 ? 'card__content' : 'line_info'}
              cardName={flag === 1 ? 'card__name' : 'line__card_name'}
              name={
                <Highlighter
                  highlightClassName='activeClass'
                  searchWords={[inputValue]}
                  autoEscape={true}
                  textToHighlight={card.title}
                  highlightTag={Highlights}
                />
              }
              cardAuthor={flag === 1 ? 'card__author' : 'line__card_author'}
              cardContent={flag === 1 ? 'card__content_link' : 'item0 '}
              rateContent={flag === 1 ? 'card__rate' : 'item2'}
              author={card.authors}
              val={card.rating}
              buttonContentBody={flag === 1 ? 'card__button' : 'item3'}
              buttonClass2={card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id) || suc ? 'pre_disabled' : ''}
              buttonContent={flag === 1 ? 'card__button' : ' line__button'}
              id={card.id}
              key={card.id}
              categories={path}
              inputValue={inputValue}
              disabled={
                card?.booking?.order
                  ? card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id)|| suc
                    ? false
                    : true
                  : card?.delivery
                  ? true
                  : false
              }
              buttonText={
                card?.booking?.order || suc
                  ? 'забронирована'
                  : card?.delivery
                  ? `занята до ${card?.delivery?.dateHandedTo.slice(8, -14)}.${card?.delivery?.dateHandedTo.slice(
                      5,
                      -17
                    )}`
                  : 'забронировать'
              }
              onClick={() => {
                if (card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id)) {
                  setUserBook(true);
                } else {
                  setUserBook(false);
                }
                setOpenModal(true);
                localStorage.setItem('card', `${card.id}`);
              }}
            />
          ) : card.categories.includes(pathName) ? (
            <Card
              cardClass={flag === 1 ? 'card' : 'line__card'}
              cardImg={flag === 1 ? 'card__photo_img' : 'line_img'}
              img={!card?.image?.url ? unbook : `https://strapi.cleverland.by${card?.image?.url}`}
              lineCard={flag === 1 ? 'card__content' : 'line_info'}
              cardName={flag === 1 ? 'card__name' : 'line__card_name'}
              name={
                <Highlighter
                  highlightTag={Highlights}
                  highlightClassName='activeClass'
                  searchWords={[inputValue]}
                  autoEscape={true}
                  textToHighlight={card.title}
                />
              }
              cardAuthor={flag === 1 ? 'card__author' : 'line__card_author'}
              cardContent={flag === 1 ? 'card__content_link' : 'item0 '}
              rateContent={flag === 1 ? 'card__rate' : 'item2'}
              author={card.authors}
              val={card.rating}
              buttonContentBody={flag === 1 ? 'card__button' : 'item3'}
              buttonClass2={(card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id)) || suc ? 'pre_disabled' : ''}
              buttonContent={flag === 1 ? 'card__button' : ' line__button'}
              id={card.id}
              key={card.id}
              categories={path}
              inputValue={inputValue}
              disabled={
                card?.booking?.customerId === Number(user.user.id) || suc
                  ? card?.booking?.order
                    ? true
                    : false
                  : card?.delivery
                  ? true
                  : false
              }
              buttonText={
                card?.booking?.order || suc
                  ? 'забронирована'
                  : card?.delivery
                  ? `занята до ${card?.delivery?.dateHandedTo.slice(8, -14)}.${card?.delivery?.dateHandedTo.slice(
                      5,
                      -17
                    )}`
                  : 'забронировать'
              }
              onClick={() => {
                if (card?.booking?.customerId === Number(localStorage.getItem('userId')) || card?.booking?.customerId === Number(user.user.id) ) {
                  setUserBook(true);
                } else {
                  setUserBook(false);
                }
                setOpenModal(true);
                localStorage.setItem('card', `${card.id}`);
              }}
            />
          ) : (
            ''
          )
        )}
      </div>
    </div>
  );
};
