"use client"
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useEffect, useState } from 'react'
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const {  upcomingCalls, isLoading } =
    useGetCalls();
    const [nextCall,setNextCall]=useState();
      useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      const earliestUpcomingCall = upcomingCalls.reduce((earliest, current) => {
        return new Date(current.state.startsAt) < new Date(earliest.state.startsAt) ? current : earliest;
      }, upcomingCalls[0]);
      setNextCall(earliestUpcomingCall);
    }
  }, [upcomingCalls]);
  const now=new Date();
  const time=now.toLocaleTimeString('india',{hour:'2-digit',minute:'2-digit'});
  const date=(new Intl.DateTimeFormat('india',{dateStyle:'full'})).format(now);

    const getNextCallDateTime = (startsAt) => {
    const startDate = new Date(startsAt);
    const callTime = startDate.toLocaleTimeString('india', { hour: '2-digit', minute: '2-digit' });
    const callDate = new Intl.DateTimeFormat('india', { dateStyle: 'full' }).format(startDate);
    return `${callDate} at ${callTime}`;
  };
  return (
    <section className="flex size-full flex-col gap-10 text-white">
     <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
      <div className='flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11'>
        <h2 className='glassmorphism  rounded py-2 text-center text-base font-normal'> {nextCall ? `Upcoming meeting on ${getNextCallDateTime(nextCall.state.startsAt)}` : "No Upcoming meetings"}</h2>
        <div className='flex flex-col gap-2'>
      <h1 className='text-4xl font-extrabold lg:text-7xl'>
        {time}
      </h1>
      <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
     </div>
     
      </div>
    
     </div>

     <MeetingTypeList/>
    </section>
  )
}

export default Home