import type { NextPage, GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '@components/layout'
import utilStyle from '@styles/utils.module.scss'
import { getSortedPostsData } from '@lib/posts'
import type { PostMeta } from '@lib/posts'

interface HomeStaticProps {
  allPostsData: (PostMeta & {
    id: string
  })[]
}

// Next 的 GetStaticProps 的 props 有問題, 要用 GetStaticPropsResult 才能限制回傳 props
export const getStaticProps: GetStaticProps = function (): GetStaticPropsResult<HomeStaticProps> {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData,
    },
  }
}

const Home: NextPage<HomeStaticProps> = function(props) {
  const { allPostsData } = props

  return (
    <Layout isHome>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyle.headingMd} ${utilStyle.bottomBorder}`}>
        <p>{'自我介紹...(略'}</p>
        <p>
          {"(This is a sample website - you'll be building a site like this on "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
          {'.)'}
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2 className={utilStyle.headingLg}>Blog</h2>
        <ul className={utilStyle.list}>
          {allPostsData.map((post) => (
            <li className={utilStyle.listItem} key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a href="">{post.title}</a>
              </Link>
              <br />
              {post.id}
              <br />
              {post.date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export default Home
