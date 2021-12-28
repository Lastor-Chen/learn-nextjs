import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@components/layout'

console.log('firstPost init')

const FirstPost: NextPage = function() {
  const [isClicked, setIsClicked] = useState(false)
  console.log('\ninvoke FirstPost')
  console.log('isClicked:', isClicked)

  useEffect(() => {
    console.log('side effect')
    console.log('isClicked:', isClicked)
  })

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <div className="mb-3 text-center">
        <button className='btn btn-primary' onClick={() => setIsClicked(!isClicked)}>Click</button>
      </div>

    </Layout>
  )
}

export default FirstPost
