import React from 'react'
import { useRouter } from 'next/router'
import BackButton from '../Reusable/backButton'
import LogoutButton from '../Reusable/LogoutButton'
import UpdateButton from './updateButton'
import SeeDetails from './seeDetails'
function StudentNav() {
  const router = useRouter()
  const currentPath = router.pathname

  return (
    <div className='bg-main text-white flex justify-between items-center px-4 py-2'>
      <BackButton />
      <div className='flex flex-row justify-between items-center'>
        {
          currentPath === '/allDetails' ? (
            <UpdateButton />

          ) : (
              <SeeDetails />
          )
        }
        <LogoutButton />
      </div>
    </div>
  )
}

export default StudentNav
