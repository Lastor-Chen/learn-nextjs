import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

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
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
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
    </>
  )
}

export default FirstPost
