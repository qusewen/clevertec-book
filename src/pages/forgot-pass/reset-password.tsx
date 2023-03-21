import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postReset } from '../../redux/actions/reset-action';
import { AppDispatch } from '../../redux/store';
import { States } from '../../types/types';
import EyeClosed from '../../assets/svg/EyeClosed.svg';
import Eye from '../../assets/svg/Eye.svg';
import Check from '../../assets/svg/check.svg';
import './forgot-pass.scss';
import { Loader } from '../../components/loader/loader';

export const ResetPass = () => {
  const [postNewPass, setPostNewPass] = useState(false);
  const [reset, setReset] = useState('');
  const { loading, success, error } = useSelector((state: States) => state.reset);
  const navigate = useNavigate();
  const [openCloseEye, setOpenCloseEye] = useState(false);
  const [openCloseEye2, setOpenCloseEye2] = useState(false);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [valid, setValid] = useState(false);
  const [blur, setBlur] = useState(true);
  const [secondBlur, setSecondBlur] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
      code: useLocation().search.slice(6),
    },
  });
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (postNewPass) {
      dispatch(postReset(reset));
    }
  }, [reset, postNewPass, dispatch]);
  if (loading) {
    return <Loader />;
  }

  const handleValidate = () => {

    if (firstValue.length >= 8 && firstValue.localeCompare(firstValue.toLowerCase()) && /\d/.test(firstValue)) {
      setValid(true);
    }
  };
  return (
    <>
      {error ? (
        <div data-test-id='status-block' className='error_log_body'>
          <h2 className='error__title'>Данные не сохранились</h2>
          <p className='error__subtitle'>Что-то пошло не так. Попробуйте ещё раз</p>
          <button onClick={() => window.location.reload()} type='button' className='submit_btn log_btn'>
            повторить
          </button>
        </div>
      ) : success ? (
        <div data-test-id='status-block' className='error_log_body'>
          <h2 className='error__title'>Новые данные сохранены</h2>
          <p className='error__subtitle'>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
          <button onClick={() => navigate('/auth')} type='button' className='submit_btn log_btn'>
            вход
          </button>
        </div>
      ) : (
        <>
          <h2 className='forgot__title reset_title'>Восстановление пароля</h2>
          <form
            onSubmit={handleSubmit((data) => {
              setReset(JSON.stringify(data));
              setPostNewPass(true);
            })}
            className='forgot_form forgot_form_reset'
            data-test-id='reset-password-form'
          >
            <div className='input_body'>
              <input
                {...register('password')}
                className={
                  firstValue.length >= 8 && firstValue.localeCompare(firstValue.toLowerCase()) && /\d/.test(firstValue)
                    ? 'input reset_input'
                    : 'input reset_input error_input'
                }
                type={openCloseEye ? 'text' : 'password'}
                placeholder='Пароль'
                name='password'
                onBlur={() => {
                  handleValidate();
                  setBlur(true);
                }}
                onFocus={() => setBlur(false)}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setFirstValue(e.target.value)}
              />
              {blur && firstValue.length === 0 ? (
                <p data-test-id='hint' className=' reset_info reg_error'>
                  Поле не может быть пустым
                </p>
              ) : (
                ''
              )}
              {!blur && firstValue.length === 0 ? (
                <p data-test-id='hint' className='not_error information_error'>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </p>
              ) : (
                ''
              )}
              {!blur &&
              firstValue.length > 0 &&
              (!(firstValue.length >= 8) ||
                !firstValue.localeCompare(firstValue.toLowerCase()) ||
                !/\d/.test(firstValue)) ? (
                <p className='reset_info not_error' data-test-id='hint'>
                  Пароль <span className={firstValue.length <= 8 ? 'error_text-info' : ''}>не менее 8 символов</span>,{' '}
                  <span className={!firstValue.localeCompare(firstValue.toLowerCase()) ? 'error_text-info' : ''}>
                    c заглавной буквой
                  </span>{' '}
                  и <span className={/\d/.test(firstValue) ? '' : 'error_text-info'}>цифрой</span>
                </p>
              ) : !blur &&
                firstValue.length >= 8 &&
                firstValue.localeCompare(firstValue.toLowerCase()) &&
                /\d/.test(firstValue) ? (
                <p data-test-id='hint' className='not_error information_error'>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </p>
              ) : (
                ''
              )}
              {blur && firstValue.length > 0 ? (
                <p data-test-id='hint' className='not_error information_error'>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </p>
              ) : (
                ''
              )}
              <button
                onClick={() => (openCloseEye ? setOpenCloseEye(false) : setOpenCloseEye(true))}
                className='input_password  input_password_reset'
                type='button'
              >
                {firstValue.length >= 8 &&
                firstValue.localeCompare(firstValue.toLowerCase()) &&
                /\d/.test(firstValue) ? (
                  <img data-test-id='checkmark' src={Check} alt='Check' className='input_password_img check' />
                ) : (
                  ''
                )}

                <img
                  data-test-id={openCloseEye ? 'eye-opened' : 'eye-closed'}
                  src={openCloseEye ? Eye : EyeClosed}
                  alt='eye'
                  className='input_password_img'
                />
              </button>
            </div>
            <div className='input_body'>
              <input
                {...register('passwordConfirmation')}
                className={
                  secondValue === firstValue || secondValue.length === 0
                    ? 'input reset_input'
                    : 'input reset_input error_input'
                }
                type={openCloseEye2 ? 'text' : 'password'}
                placeholder='Повторите пароль'
                name='passwordConfirmation'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSecondValue(e.target.value)}
onBlur={()=>setSecondBlur(true)}
onChange={()=> setSecondBlur(false)}
              />
              {secondValue.length === 0 ? (
                <p data-test-id='hint' className=' reset_info reg_error'>
                  Поле не может быть пустым
                </p>
              ) : (
                ''
              )}
              {secondBlur && secondValue.length > 0 ? (
                secondValue === firstValue ? (
                  ''
                ) : (
                  <p data-test-id='hint' className='reset_info error_information'>
                    Пароли не совпадают
                  </p>
                )
              ) : (
                ''
              )}
              <button
                onClick={() => (openCloseEye2 ? setOpenCloseEye2(false) : setOpenCloseEye2(true))}
                className='input_password input_password_reset'
                type='button'
              >
                <img
                  data-test-id={openCloseEye ? 'eye-opened' : 'eye-closed'}
                  src={openCloseEye2 ? Eye : EyeClosed}
                  alt='eye'
                  className='input_password_img'
                />
              </button>
            </div>

            <input
              disabled={
                !secondBlur ||
                firstValue.length >= 8 &&
                firstValue.localeCompare(firstValue.toLowerCase()) &&
                /\d/.test(firstValue) &&
                secondValue === firstValue
                  ? false
                  : true
              }
              className='submit_btn reg_btn forgot_btn'
              type='submit'
              value='сохранить изменения'
            />
          </form>
          <p className='auth_reg forgot_section_reg'>
            <span className='auth__subtitle_reg '>После сохранения войдите в библиотеку, используя новый пароль</span>
          </p>
        </>
      )}{' '}
    </>
  );
};
