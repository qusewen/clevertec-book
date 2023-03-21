import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cross from '../../assets/svg/gray_exit.svg';
import { States } from '../../types/types';
import sucLogo from '../../assets/svg/CheckCircle.svg';
import errLogo from '../../assets/svg/errorLogo.svg';
import '../modal/suc-err.scss';

export function SucErrBooking() {
  const { suc, err } = useSelector((state: States) => state.booking);
  const { errorDel, sucDel } = useSelector((state: States) => state.deleteBook);
  const { sucPut, errorPut } = useSelector((state: States) => state.updateBook);
  const [revOpen, setRevOpen] = useState(false);
  function closes() {
    setRevOpen(false);
  }
  useEffect(() => {
    setTimeout(closes, 2000);
  }, [suc, err, errorDel, sucDel, sucPut, errorPut]);
  useEffect(() => {
    if (suc || err || sucPut) {
      setRevOpen(true);
    } else if (errorDel || err || errorPut) {
      setRevOpen(true);
    }
  }, [suc, err, errorDel, sucDel, sucPut, errorPut]);
  return (
    <div className={revOpen ? 'field__true' : 'field'}>
      <div className='container field-container'>
        {revOpen ? (
          <div
            data-test-id='error'
            className={[
              suc || sucDel || sucPut ? 'field__body  success__field booking-suc' : '' ||
              err || errorPut || errorDel ? 'error__field field__body booking-suc' : ''

            ].join(' ')}
          >
            <img
              src={suc || sucPut || sucDel ? sucLogo : err || errorPut || errorDel ? errLogo : ''}
              alt='logo'
              className='field__img'
            />
            <p className='field__subtitle'>
              {suc ? 'Книга забронирована. Подробности можно посмотреть на странице Профиль' : ''}{' '}
              {err ? 'Что-то пошло не так, книга не забронирована. Попробуйте позже!' : ''}
              {sucDel ? 'Бронирование книги успешно отменено!' : ''}
              {errorDel ? 'Не удалось снять бронирование книги. Попробуйте позже!' : ''}
              {errorPut ? 'Изменения не были сохранены. Попробуйте позже!' : ''}
              {sucPut ? 'Изменения успешно сохранены!' : ''}
            </p>
            <button
              data-test-id='alert-close'
              onClick={() => setRevOpen(false)}
              type='button'
              className='btn__field_close'
            >
              <img src={cross} alt='exit' className='field__exit' />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
