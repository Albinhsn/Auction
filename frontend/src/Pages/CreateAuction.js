import {React, useEffect} from 'react'

import CreateAuctionForm from '../Components/Forms/CreateAuctionForm';
import { useNavigate } from 'react-router';
  

export default function CreateAuction({token}) {
  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])
  return (
        <CreateAuctionForm token={token}/>
  )
}
