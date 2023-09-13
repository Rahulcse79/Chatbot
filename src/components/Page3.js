import React from 'react'


export default function Page3() {

  const name = localStorage.getItem('userName');
  const age = localStorage.getItem('userAge');
  const clear = localStorage.clear();;
  return (
    <div>
      <>
      <p className='lastCall'> Your name {name} aged {age} has been added to student system. You may now exit.</p>
      {clear}
      </>
    </div>
  )
}
