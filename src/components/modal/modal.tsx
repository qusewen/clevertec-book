import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postRev } from '../../redux/actions/rev';
import { AppDispatch } from '../../redux/store';
import { States } from '../../types/types';
import { Loader } from '../loader/loader';
import exit from '../../assets/svg/exit.svg';
import './modal.scss';

type Param = {
  id: any;
  categories: any;
};
export function Modal() {
  const [bodys, setBodys] = useState('');
  const { modalSet } = useSelector((state: States) => state.modal);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const { rate } = useSelector((state: States) => state.rate);
  const { user } = useSelector((state: States) => state.user);
  const { id } = useParams<Param>();
  const [send, setSend] = useState(false);
  const { rev, loading, success } = useSelector((state: States) => state.rev);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: '',
      text: '',
      book: id,
      user: localStorage.getItem('userId'),
    },
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (send) {
      dispatch(postRev(bodys));
    }
  }, [dispatch, bodys, send]);
  const hendleCloseModal = () => {
    dispatch({ type: 'closeModal' });
  };
  return (
    <div data-test-id='modal-outer' className={modalSet && !success ? 'active__modal modal' : 'modal '}>
      {loading ? <Loader /> : ''}
      <div className='container'>
        <div data-test-id='modal-rate-book' className='modal__body'>
          <button data-test-id='modal-close-button' onClick={() => hendleCloseModal()} type='button' className='modal__exit'>
            <img src={exit} alt='exit' className='modal__exit-img' />
          </button>
          <h2 data-test-id='modal-title' className='modal__title'>Оцените книгу</h2>
          <div className='modal__subtitle'>Ваша оценка</div>

          <form
            className='modal__form'
            onSubmit={handleSubmit((data) => {
              setBodys(JSON.stringify(data));
              console.log(data);
            })}
          >
            <div data-test-id='rating'>
              {rate === null ? (
                <p className='rate-no-rate'>ещё нет оценок</p>
              ) : (
                [...Array(5)].map((star, i) => {
                  const ratingValue: any = i + 1;

                  return (
                    <label data-test-id='star' key={Math.random()}>
                      <input
                        {...register('rating')}
                        value={ratingValue}
                        className='star-input'
                        type='radio'
                        name='rating'
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        data-test-id={rating ? 'star-active' : ''}
                        size={20}
                        color={ratingValue <= (hover || rating || rate) ? '#FFBC1F' : 'white'}
                        className='star-item'
                        onMouseEnter={() => {
                          setHover(ratingValue);
                        }}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })
              )}
            </div>

            <textarea data-test-id='comment' {...register('text')} className='modal__input' placeholder='Оставить отзыв' name='text' />
            <button data-test-id='button-comment' onClick={() => setSend(true)} className='submit_btn modal__button' type='submit'>
              оценить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
