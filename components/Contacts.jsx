'use client';
import React, { useEffect } from 'react'
import { Input } from './ui/input'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Loader from '@components/Loader'
import { RadioButtonUnchecked } from '@mui/icons-material'
import Image from 'next/image'
import { Button } from './ui/button'

const Contacts = () => {
const [loading, setLoading] = useState(true)
const [contacts, setContacts] = useState([])
const {data : session} = useSession()
const currentUser = session?.user

const getContacts = async () => {
    try {
        const res = await fetch('/api/users')
        const data = await res.json()
        setContacts(data.filter((contact) => contact._id !== currentUser._id));
        setLoading(false)
    } catch (err) {
        console.log(err)
        
    }
}

useEffect(() => {
    if (currentUser)
    getContacts();
}, [currentUser])

  return loading ? <Loader /> :  (
    <div>
       <Input placeholder = "Search Contact..."/>
       <div>
        <div>
            <p>Select or Deselect</p>
            {contacts.map((user,index) => (
                <div key={index}>
                    <RadioButtonUnchecked />
                    <Image src={user.profileImage || "/assests/person.jpg"} alt="profile" width={50} height={50} />
                    <p>{user.username}</p>
                </div>
            ))}
        </div>
        <div>
            <Button>START A NEW CHAT</Button>
        </div>
       </div>
    </div>
  )
}

export default Contacts