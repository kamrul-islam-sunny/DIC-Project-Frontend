"use client";
import { useHandleFindAmountQuery } from "@/redux/features/amount/amountApi";
import { useHandleFindDonationQuery } from "@/redux/features/donation/donationApi";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { data: amountData, isLoading: isAmountLoading } = useHandleFindAmountQuery({});
  const { data: donationData, isLoading: isDonationLoading } = useHandleFindDonationQuery({});

  // Calculate total donations
  const totalDonations = donationData?.payload?.donation?.reduce((sum:any, donation:any) => {
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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Fundraising Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Target Amount Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Target Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${targetAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Your fundraising goal</p>
          </CardContent>
        </Card>

        {/* Total Donations Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">${totalDonations.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Amount raised so far</p>
          </CardContent>
        </Card>

        {/* Remaining Amount Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Remaining Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">${remainingAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Amount still needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fundraising Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">
                {progressPercentage.toFixed(1)}% Complete
              </span>
              <span className="text-sm text-muted-foreground">
                ${totalDonations.toLocaleString()} of ${targetAmount.toLocaleString()}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations (optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donationData?.payload?.donation?.slice(0, 5).map((donation:any) => (
              <div key={donation._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{donation.name}</p>
                  <p className="text-sm text-muted-foreground">{donation.email}</p>
                </div>
                <p className="font-bold">
                  ${donation.oneTimeAmount 
                    ? donation.oneTimeAmount.toLocaleString() 
                    : donation.monthlyAmount?.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;