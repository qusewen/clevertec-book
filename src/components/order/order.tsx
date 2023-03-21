import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import exit from '../../assets/svg/exit.svg';
import { Loader } from '../loader/loader';
import './order.scss';
import { FullBookDTO, MainBookDTO, States } from '../../types/types';
import { Calendar } from '../test/calendar';
import { postBooking } from '../../redux/actions/booking-action';
import { postBookingDelete } from '../../redux/actions/delete-booking';
import { getPage } from '../../redux/actions/page-action';
import { postBookingUpdate } from '../../redux/actions/update-booking';
import { Button } from '../button/button';

type Props = {
  isIdbtn: boolean;
  modalSet: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClick2: React.MouseEventHandler<HTMLButtonElement>;
  data?: FullBookDTO | MainBookDTO;
};
export function Order({ modalSet, onClick, data, isIdbtn, onClick2 }: Props) {
  const [isEditOpen, setIsEditOpen] = useState<Date>();
  const [selectedDate, setSelectedDay] = React.useState(new Date());
  const [bookId, setBookId] = useState<any>(localStorage.getItem('card'));
  const [bodys, setBodys] = useState('');
  const [date, setDate] = useState<string | null | undefined>();
  const [send, setSend] = useState(false);
  const [send2, setSend2] = useState(false);
  const [select, setSelect] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [newData, setNewData] = useState();
  const [isClick, setIsClick] = useState(false);

  console.log(newData);
  const [updateObj, setUpdateObj] = useState({
    order: true,
    dateOrder: date,
    book: bookId,
    customer: '',
  });
  const [objBod, setObjBod] = useState({
    order: true,
    dateOrder: date,
    book: bookId,
    customer: '',
  });
  const { loading } = useSelector((state: States) => state.booking);
  const { loadingDel } = useSelector((state: States) => state.deleteBook);
const {loadingPut}= useSelector((state: States)=> state.updateBook)
  const { page } = useSelector((state: States) => state.page);
  const { user } = useSelector((state: States) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      order: true,
      dateOrder: date,
      book: bookId,
      customer: localStorage.getItem('userId'),
    },
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (send) {
      dispatch(postBooking(JSON.stringify(objBod)));
    }
  }, [send, dispatch, objBod]);

  const deleteBook = () => {
    dispatch(postBookingDelete(page?.booking?.id));
  };
  useEffect(() => {
    if (send2) {
      dispatch(postBookingUpdate(page?.booking?.id, JSON.stringify(updateObj)));
    }
  }, [updateObj, send2, dispatch, page]);

  useEffect(() => {
    dispatch(getPage(bookId, token));
  }, [dispatch, bookId, token]);
  useEffect(() => {
    setBookId(localStorage.getItem('card'));
    setObjBod({
      order: true,
      dateOrder: date,
      book: bookId,
      customer: localStorage.getItem('userId') || JSON.stringify(user.user.id),
    });
  }, [bookId, date, user]);

  useEffect(() => {
    setBookId(localStorage.getItem('card'));
    setUpdateObj({
      order: true,
      dateOrder: date,
      book: bookId,
      customer: localStorage.getItem('userId') || JSON.stringify(user.user.id),
    });
  }, [bookId, date,user]);

  console.log(updateObj);
  return (
    <div data-test-id='modal-outer' className={modalSet ? 'active__modal modal' : 'modal '}>
      {modalSet ? (
        <button onClick={onClick2} type='button' className='modal_win'>
          {' '}
        </button>
      ) : (
        ''
      )}

      {loading || loadingDel || loadingPut ? <Loader /> : ''}
      <div className='container'>
        <div data-test-id='booking-modal' className='modal__body'>
          <button data-test-id='modal-close-button' type='button' className='modal__exit' onClick={onClick}>
            <img src={exit} alt='exit' className='modal__exit-img' />
          </button>
          <h2 data-test-id='modal-title' className='modal__title'>
            {isIdbtn ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}
          </h2>
          <form
            onSubmit={handleSubmit((data) => {
              setBodys(JSON.stringify(data));
            })}
          >
            <div className='modal-calender'>
              <Calendar
                click2={() => setIsClick(true)}
                isIdbtn={isIdbtn}
                selectedDate={selectedDate}
                selectDate={(date) => {
                  setDate(new Date(date.setHours(date.getHours() + 3)).toISOString());
                  setIsEditOpen(date);
                  setSelectedDay(date);
                  setSelect(true);
                }}
              />
            </div>

            <button
              data-test-id={modalSet ? 'booking-button' : ''}
              type='submit'
              className='button mod_btn'
              onClick={() => {
                if (!isIdbtn) {
                  setSend(true);
                } else {
                  setSend2(true);
                }
              }}
              disabled={select && isClick ? false : true}
            >
              забронировать
            </button>
            {isIdbtn ? (
              <button
                data-test-id='booking-cancel-button'
                onClick={() => deleteBook()}
                className='button mod_btn delete_btn'
                type='button'
              >отменить бронь
              </button>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
