import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

/** YAML front matter from md file */
type PostMatter = {
  title: string
  date: string
}

type PostData = PostMatter & { id: string }

export type AllPostData = Array<PostData>

export const getSortedPostsData = function () {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from fileName
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file
    const fullPath = path.join(postsDirectory, fileName)
    const md = fs.readFileSync(fullPath, 'utf8')

    // Parse metadata section
    const matterResult = matter(md)
    const matterData = <PostMatter>matterResult.data

    return { id, ...matterData }
  })

  // Sort by date DESC
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1
    if (a > b) return -1
    return 0
  })
}
