"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useHandleFindAmountQuery } from "@/redux/features/amount/amountApi";
import { useHandleFindDonationQuery } from "@/redux/features/donation/donationApi";
import dotDot from '@/../public/asset/dotDot.png'
import React from "react";



const Home = () => {

  const { data: amountData, isLoading: isAmountLoading } = useHandleFindAmountQuery({});
  const { data: donationData, isLoading: isDonationLoading } = useHandleFindDonationQuery({});

  // Calculate total donations
  const totalDonations = donationData?.payload?.donation?.reduce((sum: any, donation: any) => {
    if (donation.oneTimeAmount) {
      return sum + donation.oneTimeAmount;
    } else if (donation.monthlyAmount) {
      return sum + donation.monthlyAmount.amount;
    }
    return sum;
  }, 0) || 0;

  // Get target amount
  const targetAmount = amountData?.payload?.donation?.[0]?.setAmount || 0;

  // Calculate remaining amount
  const remainingAmount = Math.max(0, targetAmount - totalDonations);

  // Calculate progress percentage
  const progressPercentage = targetAmount > 0
    ? Math.min(100, (totalDonations / targetAmount) * 100)
    : 0;

  if (isAmountLoading || isDonationLoading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }


  return (
    <div className="px-[5%] bg-softGreen py-16 h-screen min-h-screen" style={{
      backgroundImage: "url('/asset/mosque.png')",
      backgroundSize: "cover",
      backgroundPosition: '',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className='font-nunito max-w-screen-xl mx-auto ' >
        <div className="flex flex-col gap-4 w-3/5 border">
          <h1 className='text-5xl font-medium text-center text-white'>Help Build A Better Future
            Through Your Generous Donation</h1>
          <div className="flex items-center gap-6 mt-4 ">
            <div className="flex flex-col items-center justify-center gap-2 py-4 px-5 rounded-2xl  bg-white">
              <h3 className="text-lg font-normal">Total Project Cost</h3>
              <p className="text-2xl font-bold text-softGreen">${targetAmount.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-4 px-5 rounded-2xl  bg-white">
              <h3 className="text-lg font-normal">Total Amount Pa Sed</h3>
              <p className="text-2xl font-bold text-softGreen">${totalDonations.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 py-4 px-5 rounded-2xl  bg-white">
              <h3 className="text-lg font-normal">Remaining Amount</h3>
              <p className="text-2xl font-bold text-softGreen">${remainingAmount.toLocaleString()}</p>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-2 w-full">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-softGreen">$ 245,000 <span className="text-base text-zinc-400 font-normal">Ramming</span> </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-4 items-center justify-between">
                    <Progress value={progressPercentage} className="h-3 bg-zinc-300" />
                    <h2>55%</h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

{/* <h1 className="text-8xl flex justify-center">DIC PROJECT</h1>
      <Link className="flex justify-center mt-10" href="dashboard">
        <Button>Go Dashboard</Button>
      </Link> */}