"use client";
import MeetingTypeList from "@/components/MeetingTypeList";
import React, { useEffect, useState } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/video-client"

const Home = () => {
  const { upcomingCalls, isLoading } = useGetCalls();
  const [nextCall, setNextCall] = useState<Call | undefined>(undefined);
  useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      const earliestUpcomingCall = upcomingCalls.reduce((earliest, current) => {
        const currentStart =
          current.state?.startsAt ?? new Date().toISOString();
        const earliestStart =
          earliest.state?.startsAt ?? new Date().toISOString();

        return new Date(currentStart) < new Date(earliestStart)
          ? current
          : earliest;
      }, upcomingCalls[0]);

      setNextCall(earliestUpcomingCall);
    }
  }, [upcomingCalls]);


  const now = new Date();
  const time = now.toLocaleTimeString("india", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("india", { dateStyle: "full" }).format(
    now
  );

  const getNextCallDateTime = (startsAt:string|undefined) => {
    if (!startsAt) return "No upcoming meetings";
    const startDate = new Date(startsAt);
    const callTime = startDate.toLocaleTimeString("india", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const callDate = new Intl.DateTimeFormat("india", {
      dateStyle: "full",
    }).format(startDate);
    return `${callDate} at ${callTime}`;
  };
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism  rounded py-2 text-center text-base font-normal">
            {" "}
            {nextCall
              ? getNextCallDateTime(
                  nextCall.state?.startsAt as string | undefined
                )
              : "No upcoming meetings"}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
