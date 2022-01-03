import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { ParsedUrlQuery } from 'querystring'

const postsDir = path.join(process.cwd(), 'posts')

/** YAML front matter from md file */
type PostMatter = {
  title: string
  date: string
}

export type PostData = PostMatter & { id: string }
export type AllPostsData = Array<PostData>

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from fileName
    const id = fileName.replace(/\.md$/, '')
    return getPostData(id)
  })

  // Sort by date DESC
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
}

export interface PostId extends ParsedUrlQuery { id: string }
interface GetAllPostIdsResult { params: PostId }

function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir)

  // 避免在 getStaticPaths 重作迴圈, 在這直接配合 GetStaticPaths 的規範
  // 將其包裝在 params 底下
  return fileNames.map((name): GetAllPostIdsResult => ({
    params: {
      id: name.replace(/\.md$/, ''),
    },
  }))
}

getAllPostIds()[0]

function getPostData(id: string): PostData {
  // Read markdown file
  const fullPath = path.join(postsDir, `${id}.md`)
  const md = fs.readFileSync(fullPath, 'utf8')

  // Parse metadata section
  const matterData = <PostMatter>matter(md).data

  return { id, ...matterData }
}

export { getSortedPostsData, getAllPostIds, getPostData }
