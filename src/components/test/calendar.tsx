import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { checkDateIsEqual, checkIsToday } from './untils/helper/date';
import { useCalendar } from './hooks/use-calendar';

import './calendar.scss';

import { States } from '../../types/types';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
  isIdbtn: boolean;
  click2: React.MouseEventHandler<HTMLButtonElement>;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
  isIdbtn,
  click2,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });
  const [test, setTest] = useState<Date>();
  const [st, setSt] = useState(false);
  const [sel, setSel] = useState<Date[]>([]);
  const [firstBtn, setFirstBtn] = useState<Date>();
  const [secondBtn, setSecondBtn] = useState<Date>();
  const { bookingUpdate, sucPut, errorPut } = useSelector((state: States) => state.updateBook);
  useEffect(() => {
    if (sel.length > 2) {
      setSel([]);
    }
  }, [sel]);
  const [isActive, setIsActive] = useState(false);

  return (
    <div data-test-id='calendar' className='calendar'>
      <div className='calendar__header'>
        {state.mode === 'days' && (
          <div data-test-id='month-select' aria-hidden={true} onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )}
        {state.mode === 'monthes' && <div aria-hidden={true}>{state.selectedYear}</div>}
        {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )}
        <div className='btn__body'>
          <div
            data-test-id='button-prev-month'
            aria-hidden={true}
            className='calendar__header__arrow__left'
            onClick={() => functions.onClickArrow('left')}
          />
          <div
            data-test-id='button-next-month'
            aria-hidden={true}
            className='calendar__header__arrow__right'
            onClick={() => functions.onClickArrow('right')}
          />
        </div>
      </div>
      <div className='calendar__body'>
        {state.mode === 'days' && (
          <>
            <div className='calendar__week__names'>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className='calendar__days'>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                const isWeekEndDay = day.dayNumberInWeek !== 1 && day.dayNumberInWeek !== 7;
                const now = new Date().getDate();
                const twoDay = now;
                const aboutSelect = day.date < new Date() || !isWeekEndDay ? false : true ;
                console.log(selectDate);
                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden={true}
                    onClick={() => {
                      functions.setSelectedDay(day);
                      setTest(day.date);
                      selectDate(day.date);
                      setTest(day.date);
                      setSel([...sel, day.date]);
                      if (!firstBtn) {
                        setFirstBtn(day.date);
                      } else {
                        setSecondBtn(day.date);
                      }

                      setSt(true);
                    }}
                    className={['calendar__day', isWeekEndDay ? '' : 'weekend'].join(' ')}
                  >
                    <button
                      data-test-id='day-button'
                      type='button'
                      onClick={click2}
                      className={
                        aboutSelect
                          ? [
                              'button-calendar',
                              isToday ? 'calendar__today__item' : '',
                              isAdditionalDay ? 'calendar__additional__day  ' : '',
                              isSelectedDay ? 'calendar__selected__item ' : '',
                              day.date === firstBtn ? 'calendar__selected__item' : '',
                              day.date === secondBtn ? 'calendar__selected__item' : '',
                              st && isSelectedDay && isWeekEndDay ? 'select_day' : '',
                              isIdbtn && isSelectedDay ? 'select_day' : '',
                              isWeekEndDay ? '' : ' weekend_day weekend',
                              sucPut? 'select_day' : ''
                            ].join(' ')
                          :  [
                              'button-calendar',
                              isToday ? 'calendar__today__item' : '',
                              isAdditionalDay ? 'calendar__additional__day  ' : '',
                              isSelectedDay ? 'calendar__selected__item ' : '',
                              day.date === firstBtn ? 'calendar__selected__item' : '',
                              day.date === secondBtn ? 'calendar__selected__item' : '',
                              st && isSelectedDay && isWeekEndDay ? '' : '',
                              isIdbtn && isSelectedDay ? '' : '',
                              isWeekEndDay ? '' : ' weekend_day weekend',
                            ].join(' ')
                      }
                      disabled={
                        day.dayNumber !== twoDay + 1 &&
                        day.dayNumber !== twoDay + 3 &&
                        day.dayNumber !== twoDay + 2 &&
                        day.dayNumber !== twoDay
                          ? true
                          : !isWeekEndDay
                          ? true
                          : false
                      }
                    >
                      {' '}
                      {day.dayNumber}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'monthes' && (
          <div className='calendar__pick__items__container'>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden={true}
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__pick__item',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                    isCurrentMonth ? 'calendar__today__item' : '',
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
