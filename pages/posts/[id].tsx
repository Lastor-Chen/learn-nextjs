import type { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult, GetStaticPathsResult } from 'next'
import { useRouter } from 'next/router'
import { useState, PropsWithChildren, MouseEventHandler } from 'react'
import Head from 'next/head'
import Layout from '@components/layout'
import { getAllPostIds, getPostData } from '@lib/posts'
import type { PostMeta } from '@lib/posts'
import Markdown from 'markdown-to-jsx'
import type { ParsedUrlQuery } from 'querystring'
import DateFormatter from '@components/date-formatter'
import utilStyle from '@styles/utils.module.scss'

// Main Page Component
// =====================
interface PostStaticProps {
  postData: PostMeta & {
    id: string
    content: string
  }
}

let Post: NextPage<PostStaticProps>
export default Post = function ({ postData }) {
  const router = useRouter()

  // 即使 fallback, useState 也需優先定義
  const [isClicked, setIsClicked] = useState(false)
  console.log('isClicked:', isClicked)

  const clickStateBtn = () => setIsClicked(!isClicked)

  // 當 getStaticPaths 的 fallback 設定為 true,
  // 請求未被靜態生成的檔案時, 可先回傳 fallback 頁面
  // 等 Server 即時生成後, 再換成主內容
  if (router.isFallback) {
    return (
      <Layout>
        <StateBtn onClick={clickStateBtn} />
        <article>
          <h1 className={utilStyle.headingX1}>Loading</h1>
        </article>
      </Layout>
    )
  }

  const title = postData.title ?? 'Not Found'
  return (
    <Layout>
      <Head>
        <title>Post - {title}</title>
      </Head>

      <StateBtn onClick={clickStateBtn} />

      <article>
        <h1 className={utilStyle.headingX1}>{title}</h1>
        <div className={`mb-3 ${utilStyle.lightText}`}>
          {!postData.date ? null : (
            <DateFormatter dateString={postData.date} />
          )}
        </div>
        <Markdown>{postData.content!}</Markdown>
      </article>
    </Layout>
  )
}

interface StateBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}

function StateBtn(props: PropsWithChildren<StateBtnProps>) {
  return (
    <div className="mb-3 text-center">
      <button className="btn btn-primary" onClick={props.onClick}>
        Click
      </button>
    </div>
  )
}

// Dynamic Routes SSG
// =====================
interface StaticPathParam extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths: GetStaticPaths = async function (): Promise<GetStaticPathsResult<StaticPathParam>> {
  // TS 需事先整理好 type 格式
  // 使其符合 GetStaticPathsResult['paths']
  const paths = getAllPostIds()

  return {
    paths: paths,
    fallback: true,
  }
}

// Next 的 GetStaticProps 的 props 有問題, 要用 GetStaticPropsResult 才能限制回傳 props
export const getStaticProps: GetStaticProps<{}, StaticPathParam> = async function (context) {
  const postData = await getPostData(context.params!.id)

  // 此 fn 的 type 定義太長了, 回傳值拆出來定義
  const result: GetStaticPropsResult<PostStaticProps> = {
    props: { postData },
  }
  return result
}
