import { Controller, useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import SpinnerMini from "../../ui/SpinnerMini";

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset, control } =
    useForm();
  const { errors } = formState;
  const { signup, isPending } = useSignup();

  const roleOptions = [
    { label: "Moderator", value: "mod" },
    { label: "Admin", value: "admin" },
  ];

  function onSubmit({ fullName, email, password, role }) {
    signup(
      { fullName, email, password, role },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isPending}
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

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isPending}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isPending}
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password needs to match",
          })}
        />
      </FormRow>

      <Controller
        control={control}
        rules={("role", { required: "Please select a role" })}
        name="role"
        render={({ field: { onChange, value, ref } }) => (
          <FormRow label="Role" error={errors?.role?.message}>
            <Select
              onChange={onChange}
              value={value}
              ref={ref}
              field="a role"
              options={roleOptions}
              id="role"
            />
          </FormRow>
        )}
      />

      <FormRow>
        <Button
          disabled={isPending}
          variation="secondary"
          type="reset"
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
