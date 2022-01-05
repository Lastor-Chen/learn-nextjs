import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { GetStaticPathsResult } from 'next'

const postsDir = path.join(process.cwd(), 'posts')

/** Define Markdown metadata via YAML front matter */
export interface PostMeta {
  title?: string
  /** ISO format */
  date?: string
}

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
      ...<PostMeta>matterResult.data,
    }
  })

  // Sort by date DESC
  return allPostsData.sort((a, b) => {
    const dateA = a.date || '0'
    const dateB = b.date || '0'

    if (dateA < dateB) return 1
    if (dateA > dateB) return -1
    return 0
  })
}

function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir)

  // fallback true 測試效果用
  const testFileName = 'fallback-test.md'
  if (fileNames.includes(testFileName)) {
    const idx = fileNames.indexOf(testFileName)
    fileNames.splice(idx, 1)
  }

  // 避免在 getStaticPaths 重作迴圈, 在這直接配合 GetStaticPaths 的規範
  // 將其包裝在 params 底下
  type NextStaticPath = GetStaticPathsResult<any>['paths'][0]
  return fileNames.map((name): NextStaticPath => ({
    params: {
      id: name.replace(/\.md$/, ''),
    },
  }))
}

async function getPostData(id: string) {
  // Read markdown file
  const fullPath = path.join(postsDir, `${id}.md`)

  try {
    const md = fs.readFileSync(fullPath, 'utf8')

    // Parse metadata section
    const matterResult = matter(md)

    return {
      id,
      content: matterResult.content,
      ...<PostMeta>matterResult.data,
    }
  } catch (e) {
    return {
      id,
      content: '',
    }
  }
}

export { getSortedPostsData, getAllPostIds, getPostData }
