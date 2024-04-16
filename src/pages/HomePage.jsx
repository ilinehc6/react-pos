import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

const HomePage = () => {
  return (
    <MainLayout>
      <div className='bg-light p-5 mt-4 rounded-3'>
          <h1>Welcome to the sameple POS for small business</h1>
          <p>kdhsf dsfkhsdjfkh sdfhsjkfh sdfhjsdj dhfj dhfjs sfhjshsfdskheuyrue ewrwe erwe wer werw  sfd sdfs sf ssf</p>
          <p>If you have issue, call 444-4444-4444</p>
          <Link to='/pos' className='btn btn primary'>Click here to sell product</Link>
      </div>
    </MainLayout>
  )
}

export default HomePage