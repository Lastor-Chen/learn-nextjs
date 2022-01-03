import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult, GetStaticPathsResult } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '@components/layout'
import { getAllPostIds, getPostData } from '@lib/posts'
import type { PostId, PostData } from '@lib/posts'

const getStaticPaths: GetStaticPaths = async function (): Promise<GetStaticPathsResult<PostId>> {
  // TS 需事先整理好 type 格式
  // 使其符合 GetStaticPathsResult['paths']
  const paths = getAllPostIds()

  return {
    paths: paths,
    fallback: false,
  }
}

type PostStaticProps = {
  postData: PostData
}

// Next 的 GetStaticProps 的 props 有問題, 要用 GetStaticPropsResult 才能限制回傳 props
const getStaticProps: GetStaticProps<{}, PostId> = function (context): GetStaticPropsResult<PostStaticProps> {
  const id = context.params!.id
  const postData = getPostData(id)

  return {
    props: {
      postData,
    },
  }
}

const Post: NextPage<PostStaticProps> = function ({ postData }) {
  const [isClicked, setIsClicked] = useState(false)
  console.log('isClicked:', isClicked)

  return (
    <Layout>
      <Head>
        <title>Post: {postData.id}</title>
      </Head>
      <div className="mb-3 text-center">
        <button className="btn btn-primary" onClick={() => setIsClicked(!isClicked)}>
          Click
        </button>
      </div>

      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
}

export default Post
export { getStaticPaths, getStaticProps }
