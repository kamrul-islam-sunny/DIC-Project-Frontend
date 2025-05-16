"use client";
import { InputField } from "@/components/layout/dashboard/Input/InputState";
import Heading from "@/components/layout/dashboard/shared/Heading";
import { Button } from "@/components/ui/button";
import { useHandleAddDonationMutation } from "@/redux/features/donation/donationApi";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  donationType: "oneTime" | "monthly";
  oneTimeAmount?: number;
  monthlyAmount?: {
    amount?: number;
    months?: number;
  };
}

const AddDonation = () => {
  const methods = useForm<IFormInput>({
    defaultValues: {
      donationType: "oneTime",
    },
  });
  const [activeTab, setActiveTab] = useState<"oneTime" | "monthly">("oneTime");
  const [result, setResult] = useState<number | undefined>(0);
  const [handleAddDonation, { isLoading }] = useHandleAddDonationMutation();

  // Watch changes in monthlyAmount fields
  const monthlyAmount = methods.watch("monthlyAmount.amount");
  const monthlyMonths = methods.watch("monthlyAmount.months");

  // Calculate result whenever monthly inputs change
  useEffect(() => {
    if (activeTab === "monthly") {
      const amount = Number(monthlyAmount) || 0;
      const months = Number(monthlyMonths) || 1; // Prevent division by zero
      setResult(amount / months);
    } else {
      setResult(undefined);
    }
  }, [monthlyAmount, monthlyMonths, activeTab]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      donationType: data.donationType,
      oneTimeAmount:
        data.donationType === "oneTime"
          ? Number(data.oneTimeAmount)
          : undefined,
      monthlyAmount:
        data.donationType === "monthly"
          ? {
              amount: Number(data.monthlyAmount?.amount),
              months: Number(data.monthlyAmount?.months),
            }
          : undefined,
    };
    console.log(payload);
    try {
      await handleAddDonation(payload).unwrap();
      toast.success("Donation Submitted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (type: "oneTime" | "monthly") => {
    setActiveTab(type);
    methods.setValue("donationType", type);
    if (type === "oneTime") {
      methods.setValue("monthlyAmount", undefined);
    } else {
      methods.setValue("oneTimeAmount", undefined);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Heading
        title="Enter Target Amount"
        subTitle="Fill in the details below to add a new amount."
      />

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="pt-5 space-y-6"
        >
          {/* Name, Email, Phone fields remain the same */}
          <InputField
            name="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            validationRules={{
              required: "Name is required",
            }}
          />
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            validationRules={{
              required: "Email is required",
            }}
          />
          <InputField
            name="phone"
            label="Phone"
            type="text"
            placeholder="Enter your phone number"
            validationRules={{
              required: "Phone number is required",
            }}
          />

          <div className="space-y-4">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium text-center transition-colors ${
                  activeTab === "oneTime"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("oneTime")}
              >
                One-Time Donation
              </button>
              <button
                type="button"
                className={`flex-1 py-3 px-4 font-medium text-center transition-colors ${
                  activeTab === "monthly"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange("monthly")}
              >
                Monthly Donation
              </button>
            </div>

            {activeTab === "oneTime" ? (
              <div className="p-4 border rounded-lg bg-gray-50">
                <InputField
                  name="oneTimeAmount"
                  label="One Time Amount"
                  type="number"
                  placeholder="Enter amount (e.g., 100)"
                  validationRules={{
                    required: "Amount is required",
                    min: {
                      value: 1,
                      message: "Amount must be greater than 0",
                    },
                  }}
                />
              </div>
            ) : (
              <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    name="monthlyAmount.amount"
                    label="Monthly Amount"
                    type="number"
                    placeholder="Enter monthly amount"
                    validationRules={{
                      required: "Monthly amount is required",
                      min: {
                        value: 1,
                        message: "Amount must be greater than 0",
                      },
                    }}
                  />
                  <InputField
                    name="monthlyAmount.months"
                    label="Number of Months"
                    type="number"
                    placeholder="Enter months (e.g., 12)"
                    validationRules={{
                      required: "Number of months is required",
                      min: {
                        value: 1,
                        message: "Must be at least 1 month",
                      },
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Per Month Amount: {result?.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className={`w-full py-6 rounded-lg text-lg font-semibold transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit Donation"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddDonation;