import React from 'react'
import { Button } from "../ui/button";  

function Header() {
  return (
    <div className='p-2 shadow-sm'>
      <img src= "Ghurbo_Logo_Gold.svg" alt='Ghurbo logo' width={200} height={40} />
      <div> 
        <Button>Sign In</Button>
      </div>
    </div> 
  )
}

export default Header