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

export interface PostData extends PostMatter {
  id: string
  content: string
}
// export type PostData = PostMatter & { id: string }
export type AllPostsData = Array<PostData>

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from fileName
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file
    const fullPath = path.join(postsDir, `${id}.md`)
    const md = fs.readFileSync(fullPath, 'utf8')

    // Parse metadata section
    const matterResult = matter(md)

    return {
      id,
      ...<PostMatter>matterResult.data,
    }
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

async function getPostData(id: string): Promise<PostData> {
  // Read markdown file
  const fullPath = path.join(postsDir, `${id}.md`)
  const md = fs.readFileSync(fullPath, 'utf8')

  // Parse metadata section
  const matterResult = matter(md)

  return {
    id,
    content: matterResult.content,
    ...<PostMatter>matterResult.data,
  }
}

export { getSortedPostsData, getAllPostIds, getPostData }
