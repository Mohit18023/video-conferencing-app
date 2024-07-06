"use client"
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
    const router=useRouter();
    const [MeetingState, setMeetingState] = useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>()
    const createMeeting=()=>{
    
    }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
       <HomeCard 
       img='icons/add-meeting.svg'
       title='New Meeting'
       description='Start an Instant Meeting'
       handleClick={()=>setMeetingState('isInstantMeeting')}
       
       className='bg-orange-1'
       />
       
       <HomeCard
        img='icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan Your Meeting'
        handleClick={()=>setMeetingState('isScheduleMeeting')}
        className='bg-blue-1'
       />
       <HomeCard
        img='icons/recordings.svg'
        title='View Your Recordings'
        description='Check Out Your Recordings'
        handleClick={()=>router.push('/recordings')}
        className='bg-purple-1'
       />
       <HomeCard
        img='icons/join-meeting.svg'
        title='Join Meeting'
        description='Via Invitation Link'
        handleClick={()=>setMeetingState('isJoiningMeeting')}
        className='bg-yellow-1'
       />
    <MeetingModal isOpen={MeetingState==='isInstantMeeting'} onClose={()=>setMeetingState(undefined)} title="Start An Instant Meeting" className="text-center" buttonText="Start Meeting" handleClick={createMeeting}/>
    </section>
  )
}

export default MeetingTypeList