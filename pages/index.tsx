import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '@components/layout'
import utilStyle from '@styles/utils.module.scss'

const Home: NextPage = function() {
  return (
    <Layout isHome>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Link href="/posts/first-post">
        <a className="d-block text-center mb-3">go to first-post</a>
      </Link>

      <section className={utilStyle.headingMd}>
        <p>{'自我介紹...(略'}</p>
        <p>
          {"(This is a sample website - you'll be building a site like this on "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
          {'.)'}
        </p>
      </section>
    </Layout>
  )
}

export default Home
