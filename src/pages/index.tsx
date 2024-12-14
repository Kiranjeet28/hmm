"use client"
import Banner from '@/components/main/banner'
import Footer from '@/components/main/footer'
import Header from '@/components/main/page'
import ReviewsDisplay from '@/components/Reusable/Review/DisplayR'
import ReviewForm from '@/components/Reusable/Review/InputR'
import React from 'react'

function index() {
  return (
    <div className='bg-white'>
      <Header />
      <Banner />
      <ReviewForm />
      <ReviewsDisplay/>
      <Footer/>
    </div>
  )
}

export default index