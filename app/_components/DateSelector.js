"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  console.log("Logging Range");
  console.log(range.from);
  console.log(range.to);

  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regular_price, discount } = cabin;

  const num_night = differenceInDays(displayRange.to, displayRange.from);
  const cabin_price = num_night * (regular_price - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={(range) => {
          setRange(range);
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currentDate) =>
          isPast(currentDate) ||
          bookedDates.some((date) => isSameDay(date, currentDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {num_night ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{num_night}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabin_price}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
