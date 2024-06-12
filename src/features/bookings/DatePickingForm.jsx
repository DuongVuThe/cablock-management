import { useQueryClient } from "@tanstack/react-query";
import { addDays, isPast, subDays } from "date-fns";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import { Controller, useWatch } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import { useSettings } from "../settings/useSettings";
import { useBookedDate } from "./useBookedDate";

const DatePickerWrapperStyles = createGlobalStyle`
      .react-datepicker {
      border: 1px solid var(--color-grey-300);
     background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
  }

    .input-date-picker {
width: 100%;
border: 1px solid var(--color-grey-300);
     background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
    }
    
`;

function DatePickingForm({
  cabins,
  control,
  errors,
  cabinOptions,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  resetField,
}) {
  const queryClient = useQueryClient();

  const { isPending: isPendingSettings, settings } = useSettings();
  const { isPending: isPendingDates, bookedDates } = useBookedDate();
  const [searchParams, setSearchParams] = useSearchParams();

  const isPending = isPendingDates || isPendingSettings;

  const cabinId = useWatch({ name: "cabinId", control, defaultValue: null });

  const chosenCabin = cabins?.find((cabin) => cabin.id === Number(cabinId));

  const numGuestOptions = Array.from(
    { length: chosenCabin?.maxCapacity },
    (_, i) => {
      return { label: `${i + 1}`, value: i + 1 };
    }
  );

  useEffect(
    function () {
      queryClient.invalidateQueries({ queryKey: ["booked-date"] });

      if (!cabinId) {
        searchParams.delete("cabinId");
        setSearchParams(searchParams);
      }

      if (cabinId) {
        searchParams.set("cabinId", cabinId);
        setSearchParams(searchParams);
      }

      setStartDate(null);
      setEndDate(null);
      resetField("startDate");
      resetField("endDate");
    },
    [
      cabinId,
      searchParams,
      setSearchParams,
      resetField,
      queryClient,
      setStartDate,
      setEndDate,
    ]
  );

  if (isPending || !settings) return <Spinner />;

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div>
      <Heading as="h5">Booking details</Heading>

      <Controller
        control={control}
        rules={("cabinId", { required: "Please select a cabin" })}
        name="cabinId"
        render={({ field: { onChange, value, ref } }) => (
          <FormRow label="Location" error={errors?.cabinId?.message}>
            <Select
              onChange={onChange}
              value={value}
              ref={ref}
              field="a cabin"
              options={cabinOptions}
              id="cabinId"
            />
          </FormRow>
        )}
      />

      <Controller
        control={control}
        rules={
          ("numGuests", { required: "Please select the number of guests" })
        }
        name="numGuests"
        render={({ field: { onChange, value, ref } }) => (
          <FormRow label="Number of guests" error={errors?.numGuests?.message}>
            <Select
              onChange={onChange}
              value={value}
              ref={ref}
              field="the number of guests"
              options={numGuestOptions}
              id="numGuests"
              disabled={!cabinId}
            />
          </FormRow>
        )}
      />

      <DatePickerWrapperStyles />
      <Controller
        control={control}
        rules={("startDate", { required: "Please select a check-in date" })}
        name="startDate"
        render={({ field: { onChange, value, ref } }) => (
          <FormRow label="Check-in date" error={errors?.startDate?.message}>
            <DatePicker
              ref={ref}
              wrapperClassName="wrapper-datepicker"
              className="input-date-picker"
              placeholderText="Choose a check-in date"
              disabled={!cabinId}
              selected={value}
              selectsStart
              minDate={endDate && subDays(endDate, Number(maxBookingLength))}
              maxDate={endDate && subDays(endDate, Number(minBookingLength))}
              startDate={startDate}
              endDate={endDate}
              onChange={(date) => {
                onChange(date);
                setStartDate(date);
              }}
              calendarClassName="my-date-picker"
              id="startDate"
              excludeDates={bookedDates}
              filterDate={(date) => !isPast(date)}
            />
          </FormRow>
        )}
      />

      <Controller
        control={control}
        rules={("endDate", { required: "Please select a check-out date" })}
        name="endDate"
        render={({ field: { onChange, value, ref } }) => (
          <FormRow label="Check-out date" error={errors?.endDate?.message}>
            <DatePicker
              ref={ref}
              wrapperClassName="wrapper-datepicker"
              className="input-date-picker"
              placeholderText="Choose a check-out date"
              disabled={!cabinId}
              selected={value}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={addDays(startDate, Number(minBookingLength))}
              maxDate={addDays(startDate, Number(maxBookingLength))}
              onChange={(date) => {
                onChange(date);
                setEndDate(date);
              }}
              calendarClassName="my-date-picker"
              id="endDate"
              excludeDates={bookedDates}
              filterDate={(date) => !isPast(date)}
            />
          </FormRow>
        )}
      />
    </div>
  );
}

export default DatePickingForm;
