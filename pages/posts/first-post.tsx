import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '@components/layout'

console.log('firstPost init')

const FirstPost: NextPage = function() {
  const [isClicked, setIsClicked] = useState(false)
  console.log('\ninvoke FirstPost')
  console.log(`isClicked: ${isClicked}`)

  useEffect(() => {
    console.log('side effect')
    console.log(`isClicked: ${isClicked}`)
  })

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <h1>First Post</h1>
      <div className="mb-3">
        <button onClick={() => setIsClicked(true)}>Click</button>
      </div>
      <Image
        src="/images/profile.jpg"
        width="144"
        height="144"
        alt=""
      />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  )
}

export default FirstPost
