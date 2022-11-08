import React from 'react';
import UserDashboard from '../components/UserDashboard'
import {ActualComponentProvider} from '../components/UserDashboard/context/actualComponentContext'

export default function UserProfile(){
    return(
        <div>
            <ActualComponentProvider>
                <UserDashboard/>
            </ActualComponentProvider>
        </div>
    )
}