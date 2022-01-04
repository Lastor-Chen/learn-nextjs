import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult, GetStaticPathsResult, GetStaticPropsContext } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Layout from '@components/layout'
import { getAllPostIds, getPostData } from '@lib/posts'
import type { PostId, PostData } from '@lib/posts'
import Markdown from 'markdown-to-jsx'

interface PostStaticProps {
  postData: PostData
}

// Main Page Component
// =====================
let Post: NextPage<PostStaticProps>
export default Post = function ({ postData }) {
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

      <h2 className='mb-1'>{postData.title}</h2>
      <div className='mb-1'>{postData.id}</div>
      <div className='mb-3'>{postData.date}</div>
      <Markdown>{postData.content}</Markdown>
    </Layout>
  )
}

// Dynamic Routes SSG
// =====================
export const getStaticPaths: GetStaticPaths = async function (): Promise<GetStaticPathsResult<PostId>> {
  // TS 需事先整理好 type 格式
  // 使其符合 GetStaticPathsResult['paths']
  const paths = getAllPostIds()

  return {
    paths: paths,
    fallback: false,
  }
}

// Next 的 GetStaticProps 的 props 有問題, 要用 GetStaticPropsResult 才能限制回傳 props
export const getStaticProps: GetStaticProps<{}, PostId> = async function (context) {
  const postData = await getPostData(context.params!.id)

  // 此 fn 的 type 定義太長了, 回傳值拆出來定義
  const result: GetStaticPropsResult<PostStaticProps> = {
    props: { postData },
  }
  return result
}
