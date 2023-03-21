import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { books } from '../../assets/constants/mock-data';
import noPic from '../../assets/jpg/badbook.jpg';
import personImg from '../../assets/svg/person.png';
import { Button } from '../../components/button/button';
import { SucErrBooking } from '../../components/content-block/suc-err-booking';
import { Loader } from '../../components/loader/loader';
import { Modal } from '../../components/modal/modal';
import { SucErr } from '../../components/modal/suc-err';
import { Order } from '../../components/order/order';
import { Rate } from '../../components/rate/rate';
import { ResError } from '../../components/res-error/res-error';
import { RouteBar } from '../../components/route-bar/route-bar';
import { Swipers } from '../../components/swiper/swiper';
import { getPage } from '../../redux/actions/page-action';
import { AppDispatch } from '../../redux/store';
import { Coments, Images, Page, States } from '../../types/types';

import './book-page.scss';

type Param = {
  id: any;
  categories: any;
};

export const BookPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAcard, setOpenAcard] = useState(false);
  const { categories, id } = useParams<Param>();
  const { page, loading, success, error } = useSelector((state: States) => state.page);
  useSelector((state: States) => console.log(state.page));
  const dispatch: AppDispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { booking, suc, err } = useSelector((state: States) => state.booking);
  const { sucDel, errorDel } = useSelector((state: States) => state.deleteBook);
  const [userBook, setUserBook] = useState(false);
  const { sucPut, errorPut } = useSelector((state: States) => state.updateBook);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      dispatch(getPage(id, token));
    } else {
      navigate('/auth');
    }
  }, [dispatch, navigate, id, token]);
  const openAcardion = () => {
    if (openAcard) {
      setOpenAcard(false);
    } else {
      setOpenAcard(true);
    }
  };
  function ModalStateOpen() {
    dispatch({ type: 'openModal' });
  }

  useEffect(() => {
    if (suc || err || sucPut) {
      setOpenModal(false);
    } else if (sucDel || errorDel || errorPut) {
      setOpenModal(false);
    }
  }, [suc, err, sucDel, errorDel, sucPut, errorPut]);

  localStorage.setItem('card', id);

  return (
    <>
      {loading ? <Loader /> : ''}
      {error ? <ResError /> : ''}
      <SucErrBooking />
      <Order
        onClick2={() => setOpenModal(false)}
        isIdbtn={userBook}
        modalSet={openModal}
        onClick={() => setOpenModal(false)}
      />
      <RouteBar
        categoriesLink={categories === undefined ? '/books/all' : `/books/${categories}`}
        categori={categories === undefined ? 'Все книги' : page?.categories}
        name={page?.title}
      />
      {success ? (
        <section className='book'>
          <div className='container container-book'>
            <SucErr />
            <div className='book__information'>
              <div className='book__picture'>
                {page?.images?.length !== 0 ? (
                  <Swipers
                    slide={page?.images?.map((e: any) => (
                      <SwiperSlide key={Math.random()}>
                        <img alt='slide' src={`https://strapi.cleverland.by${e?.url}`} />
                      </SwiperSlide>
                    ))}
                    secondSlide={
                      page?.images?.length < 2
                        ? ''
                        : page?.images?.map((e: Images) => (
                            <SwiperSlide key={Math.random()}>
                              <img alt='slide' src={`https://strapi.cleverland.by${e?.url}`} className='little_img' />
                            </SwiperSlide>
                          ))
                    }
                  />
                ) : (
                  <img src={noPic} alt='book' className='book__picture_img' />
                )}
              </div>
              <div className='book__text'>
                <div className='book__text_body'>
                  <h2 data-test-id='book-title' className='book__text_title'>
                    {page.title}
                  </h2>
                  <p className='book__text_subtitle'>{page?.authors}</p>
                  <div className='book__button'>

                    <Button
                      testId='booking-button'
                      buttonClass2={
                        page?.booking?.customerId === Number(localStorage.getItem('userId')) ? 'pre_disabled' : ''
                      }
                      onClick={() => {
                        setOpenModal(true);
                        if (page?.booking?.customerId === Number(localStorage.getItem('userId'))) {
                          setUserBook(true);
                        } else {
                          setUserBook(false);
                        }
                      }}
                      buttonClass='book__button_new'
                      disabled={
                        page?.booking?.order
                          ? page?.booking?.customerId === Number(localStorage.getItem('userId'))
                            ? false
                            : true
                          : page?.delivery
                          ? true
                          : false
                      }
                      buttonText={
                        page?.booking?.order
                          ? 'забронирована'
                          : page?.delivery
                          ? `занята до ${page?.delivery?.dateHandedTo.slice(
                              8,
                              -14
                            )}.${page?.delivery?.dateHandedTo.slice(5, -17)}`
                          : 'забронировать'
                      }
                    />
                  </div>
                </div>
                <div className='book__text_body  book__text_body-about'>
                  <div className='book__text_title-about'>О книге</div>
                  <p className='book__text_subtitle-about'>{page?.description}</p>
                </div>
              </div>
            </div>

            <div className='book__rate'>
              <div className='book__rate_body'>
                <h2 className='book__rate_title'>Рейтинг</h2>
                <div className='book__rate-count'>
                  <Rate name='rating' val={page?.rating} />
                  <span className='book__rate-span'>{page?.rating}</span>
                </div>
              </div>
              <div className='book__rate_info'>
                <h2 className='book__rate_title'>Подробная информация</h2>
                <div className='book__rate_more-information__body'>
                  <div className='book__rate_more-information'>
                    <ul className='book__rate-list'>
                      <li className='book__rate-item'>Издательство</li>
                      <li className='book__rate-item'>Год издания</li>
                      <li className='book__rate-item'>Страниц</li>
                      <li className='book__rate-item'>Переплёт</li>
                      <li className='book__rate-item'>Формат</li>
                    </ul>
                    <ul className='book__rate-list'>
                      <li className='book__rate-item-text'>{page?.publish}</li>
                      <li className='book__rate-item-text'> {page?.issueYear}</li>
                      <li className='book__rate-item-text'>{page?.pages}</li>
                      <li className='book__rate-item-text'>{page?.cover}</li>
                      <li className='book__rate-item-text'>{page?.format}</li>
                    </ul>
                  </div>
                  <div className='book__rate_more-information'>
                    <ul className='book__rate-list'>
                      <li className='book__rate-item book__rate-item-first'>Жанр</li>
                      <li className='book__rate-item'>Вес</li>
                      <li className='book__rate-item'>ISBN</li>
                      <li className='book__rate-item item-text-320-1'>Возрастные ограничения</li>
                      <li className='book__rate-item'>Изготовитель</li>
                    </ul>
                    <ul className='book__rate-list'>
                      <li className='book__rate-item-text'>{page?.categories}</li>
                      <li className='book__rate-item-text'> {page?.weight}</li>
                      <li className='book__rate-item-text'>{page?.ISBN}</li>
                      <li className='book__rate-item-text item-text-320'>+18</li>
                      <li className='book__rate-item-text'>{page?.producer}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='reviews'>
                <h2 className='book__rate_title'>
                  Отзывы{' '}
                  <span className='book__rate-reviews'>
                    {page?.comments === null ? 0 : page?.comments?.length}{' '}
                    <button
                      className={openAcard ? 'arrow_reviews' : 'arrow_reviews_close'}
                      type='button'
                      data-test-id='button-hide-reviews'
                      onClick={openAcardion}
                    >
                      {' '}
                    </button>
                  </span>
                </h2>

                <div data-test-id='reviews' className={openAcard ? 'reviews__body' : 'reviews__body_close'}>
                  <ul data-test-id='comment-wrapper' className='reviews__list'>
                    {page?.comments?.map((page: Coments) => (
                      <li key={Math.random()} className='reviews__list_item'>
                        <div className='reviews__person'>
                          <img className='reviews__person_img' src={personImg} alt='person' />
                          <div className='person__body'>
                            <p data-test-id='comment-author' className='reviews__person_name'>
                              {page?.user?.firstName} {page?.user?.lastName}
                            </p>
                            <p data-test-id='comment-date' className='reviews__person_date'>
                              {new Intl.DateTimeFormat().format(new Date(page?.createdAt))}
                            </p>
                          </div>
                        </div>
                        <div className='reviews__rate'>
                          <Rate data-test-id='rating' name='rating' val={page?.rating} />
                        </div>
                        <div data-test-id='comment-text' className='reviews__subtitle'>
                          {page?.text}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='reviews__button'>
                  <Button
                     testId='booking-button'
                    buttonClass2=''
                    disabled={false}
                    onClick={() => ModalStateOpen()}
                    buttonClass='reviews__button_new'
                    buttonText='оценить книгу'
                  />
                </div>
                <Modal />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};
