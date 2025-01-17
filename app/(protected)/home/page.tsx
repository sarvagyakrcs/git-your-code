import { auth } from '@/auth'
import UserButton from '@/components/auth/user-button/user-button-client'
import SomethingWentWrongPage from '@/components/pages/something-went-wrong-page';
import React from 'react'

const HomePage = async () => {
    const session = await auth();
    if(!session){
        return <SomethingWentWrongPage />
    }
    return (
        <div>
            <div className="">Note: This is an protected route</div>
            <UserButton session={session} />
        </div>
    )
}

export default HomePage