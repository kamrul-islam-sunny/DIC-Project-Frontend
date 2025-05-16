"use client";
import { InputField } from "@/components/layout/dashboard/Input/InputState";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { Button } from "@/components/ui/button";
import { useHandleAddAmountMutation } from "@/redux/features/amount/amountApi";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  setAmount: number;
}
const SetAmount = () => {
  const methods = useForm<IFormInput>();
  const [handleAddAmount, { isLoading }] = useHandleAddAmountMutation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  
    try {
    
      console.log(data.setAmount);
      await handleAddAmount(data?.setAmount).unwrap()
      toast.success("Target Amount Set Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Heading
          title="Set Your Target Amount"
          subTitle="Fill in the details below to add a new amount."
        />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%] space-y-10"
          >
            <InputField
              name="setAmount"
              label="Set Amount"
              type="number"
              autoComplete="setAmount"
              placeholder="Enter target amount"
              validationRules={{
                required: "Amount Name is required",
              }}
            />
            <Button
              type="submit"
              className={`rounded-none cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Please Wait..." : "Add Amount"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default SetAmount;
