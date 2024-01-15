import Navbar from '../components/Navbar'
import React from 'react'

export default function Privacy() {
  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center h-screen'>
        <div className='max-w-lg'>
        Our website prioritizes user privacy and security, especially when it comes to handling personal schedules and appointments. While we integrate with the Google Calendar API, it's important to clarify that our usage is strictly limited to enabling users to create calendar events. We do not access, store, or use any personal data from users' Google Calendar accounts. This approach ensures that users can enjoy the convenience of seamless calendar event creation directly through our platform, without any concerns about their personal information being used or compromised. Our commitment to privacy means you can manage your schedule with confidence, knowing that your data remains private and secure.
        </div>
    </div>
    </>
  )
}
