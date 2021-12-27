import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      <h1>First Post</h1>
      <button onClick={() => setIsClicked(true)}>Click</button>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}

export default FirstPost
