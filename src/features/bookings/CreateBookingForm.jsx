import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";

import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";
import { useCountries } from "./useCountries";
import { useCreateBooking } from "./useCreateBooking";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import Textarea from "../../ui/Textarea";
import DatePickingForm from "./DatePickingForm";
import { differenceInDays } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";

function CreateBookingForm({ onCloseModal }) {
  const { isPending: isPendingCountries, countries } = useCountries();
  const { isPending: isPendingCabins, cabins } = useCabins();

  const { isPending: isPendingSettings, settings } = useSettings();

  const { createBooking, isCreating } = useCreateBooking();

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    reset,
    formState,
    getValues,
    control,
    resetField,
  } = useForm();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isPending = isPendingCountries || isPendingCabins || isPendingSettings;

  const { errors } = formState;

  if (isPending || !cabins || !countries || !settings) return <Spinner />;

  function onSubmit() {
    const values = getValues();

    const [nationality, countryCode] = values.nationality.split("%");

    const cabinId = values.cabinId;

    const chosenCabin = cabins?.find((cabin) => cabin.id === Number(cabinId));

    const numNights = differenceInDays(new Date(endDate), new Date(startDate));

    const cabinPrice =
      (chosenCabin?.regularPrice - chosenCabin?.discount) * numNights;

    const bookingData = {
      ...values,
      nationality: nationality,
      countryFlag: `https://flagcdn.com/${countryCode}.svg`,
      cabinPrice: String(cabinPrice),
      numNights: String(numNights),
      extrasPrice: "0",
    };

    createBooking(bookingData, {
      onSuccess: () => {
        reset();
        setStartDate(null);
        setEndDate(null);
        onCloseModal();
        queryClient.invalidateQueries(["bookings"]);
      },
    });
  }

  const countryOptions = Object.keys(countries).map((key) => {
    return { value: `${countries[key]}%${key}`, label: countries[key] };
  });

  const cabinOptions = cabins.map((cabin) => {
    return { value: cabin.id, label: `Cabin ${cabin.name}` };
  });

  return (
    <Form
      noValidate
      id="booking-form"
      type="regular"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Heading as="h5">Guest info</Heading>
        <FormRow label="Full name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register("fullName", { required: "This field is required" })}
          />
        </FormRow>

        <FormRow label="Email address" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </FormRow>

        <Controller
          control={control}
          rules={("nationality", { required: "Please select a country" })}
          name="nationality"
          render={({ field: { onChange, value, ref } }) => (
            <FormRow label="Nationality" error={errors?.nationality?.message}>
              <Select
                onChange={onChange}
                value={value}
                ref={ref}
                field="a country"
                options={countryOptions}
                id="nationality"
              />
            </FormRow>
          )}
        />

        <FormRow label="National ID" error={errors?.nationalID?.message}>
          <Input
            type="text"
            id="nationalID"
            {...register("nationalID", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Note">
          <Textarea id="observations" {...register("observations")}></Textarea>
        </FormRow>
      </div>

      <DatePickingForm
        cabins={cabins}
        control={control}
        errors={errors}
        cabinOptions={cabinOptions}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        resetField={resetField}
      />

      <FormRow>
        <Button
          disabled={isCreating}
          variation="secondary"
          type="button"
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          {isCreating ? <SpinnerMini /> : "Add"}{" "}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
