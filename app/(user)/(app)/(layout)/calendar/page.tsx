'use client';

import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import { CalendarDay, Modifiers, UI } from 'react-day-picker';
import { HTMLAttributes, JSX, TableHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';


const CustomWeekday: (props: ThHTMLAttributes<HTMLTableCellElement>) => JSX.Element = (
  { children, 'aria-label': ariaLabel, className, ...props }
) => {
  return <th className={cn(
    className,
    "py-2 font-bold text-sm text-black"
  )} {...props}>
    {ariaLabel?.slice(0,1).toUpperCase()}
  </th>
}
// text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none rdp-weekday
const CustomDayCell: (props: ({
  day: CalendarDay
  modifiers: Modifiers
} & HTMLAttributes<HTMLDivElement>)) => JSX.Element = (
  { day, modifiers, className, ...props }
) => {

  if (dayjs(day.date).format('D') == '3') {
    console.log('Modifiers:', modifiers);
  }

  return <td className={cn(
    className,
    'flex justify-center items-center',
    modifiers?.caps && 'bg-white/80 rounded-md',
    (modifiers?.today || (modifiers?.caps && dayjs().isAfter(day.date))) && 'bg-pink-dark text-white font-bold',
  )} {...props}>
    {dayjs(day.date).format('D')}
  </td>;
}

const CustomMonthGrid: (props: TableHTMLAttributes<HTMLTableElement>) => JSX.Element = ({
  className, ...props
}) => {
  return <div
    className={cn(
      className,
    )}
  >
    <table className={cn(
      'border-collapse w-full'
    )} {...props} />
  </div>;
}

export default function CalendarPage() {
  const arr = new Array(12).fill(0).map((_, i) => {
    return dayjs().add(i, 'month').toDate();
  })

  return <div className="flex flex-col gap-4 px-5">
    {arr.map((month, idx) => {
      return <Calendar
        key={idx}
        showOutsideDays={false}
        month={month}
        numberOfMonths={1}
        hideNavigation={true}
        className="w-full bg-transparent p-0"
        modifiers={{
          caps: [
            dayjs('2025-11-11').toDate(),
            dayjs('2025-11-01').toDate(),
            dayjs('2025-11-04').toDate(),
            dayjs('2025-11-17').toDate(),
            dayjs('2025-11-06').toDate(),
          ],
        }}
        classNames={{
          // [UI.Root]: 'border-2 border-pink-dark rounded-lg p-2 bg-transparent',
          // [UI.Chevron]: 'border-2 border-red-500 rounded-lg p-2 bg-transparent',
          // [UI.Day]: 'border-2 border-green-500 rounded-lg p-2 bg-transparent', //
          // [UI.DayButton]: 'border-2 border-blue-500 rounded-lg p-2 bg-transparent',
          // [UI.CaptionLabel]: 'border-2 border-yellow-500 rounded-lg p-2 bg-transparent', //
          // [UI.Dropdowns]: 'border-2 border-purple-500 rounded-lg p-2 bg-transparent',
          // [UI.Dropdown]: 'border-2 border-orange-500 rounded-lg p-2 bg-transparent',
          // [UI.DropdownRoot]: 'border-2 border-teal-500 rounded-lg p-2 bg-transparent',
          // [UI.Footer]: 'border-2 border-gray-500 rounded-lg p-2 bg-transparent',
          [UI.MonthGrid]: 'bg-pink-light rounded-2xl shadow-lg p-2', //
          [UI.MonthCaption]: 'text-center uppercase', //
          // [UI.MonthsDropdown]: 'border-2 border-cyan-500 rounded-lg p-2 bg-transparent',
          // [UI.Month]: 'border-2 border-amber-500 rounded-lg p-2 bg-transparent', //
          // [UI.Months]: 'border-2 border-fuchsia-500 rounded-lg p-2 bg-transparent', //
          // [UI.Nav]: 'border-2 border-rose-500 rounded-lg p-2 bg-transparent',
          // [UI.NextMonthButton]: 'border-2 border-green-300 rounded-lg p-2 bg-transparent',
          // [UI.PreviousMonthButton]: 'border-2 border-blue-300 rounded-lg p-2 bg-transparent',
          // [UI.Week]: 'border-2 border-yellow-300 rounded-lg p-2 bg-transparent', //
          // [UI.Weeks]: 'border-2 border-purple-300 rounded-lg p-2 bg-transparent', //
          // [UI.Weekday]: 'border-2 border-orange-300 rounded-lg p-2 bg-transparent', //
          // [UI.Weekdays]: 'border-2 border-teal-300 rounded-lg p-2 bg-transparent', //
          // [UI.WeekNumber]: 'border-2 border-gray-300 rounded-lg p-2 bg-transparent',
          // [UI.WeekNumberHeader]: 'border-2 border-pink-300 rounded-lg p-2 bg-transparent',
          // [UI.YearsDropdown]: 'border-2 border-lime-300 rounded-lg p-2 bg-transparent',
        }}
        components={{
          Day: CustomDayCell,
          Weekday: CustomWeekday,
          MonthGrid: CustomMonthGrid,
        }}
      />;
    })}
  </div>;
}