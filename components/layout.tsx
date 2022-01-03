import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import style from './layout.module.scss'
import utilStyle from '@styles/utils.module.scss'
import { If, Then, Else } from 'react-if'

interface LayoutProps {
  isHome?: boolean
}

const name = 'Name'
export const siteTitle = 'Next.js Sample Website'

const Layout: NextPage<LayoutProps> = function ({ children, isHome }) {
  return (
    <div className={`${style.layout}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header className={style.header}>
        <If condition={isHome}>
          <Then>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyle.borderCircle}
              placeholder="blur"
              blurDataURL="https://via.placeholder.com/10"
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
          </Then>
          <Else>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyle.borderCircle}
                  placeholder="blur"
                  blurDataURL="https://via.placeholder.com/10"
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyle.headingLg}>
              <Link href="/">
                <a className={utilStyle.colorInherit}>{name}</a>
              </Link>
            </h2>
          </Else>
        </If>

        <hr className="w-100" />
        <main>{children}</main>

        <If condition={!isHome}>
          <Then>
            <div className={style.backToHome}>
              <Link href="/">
                <a>← Back to home</a>
              </Link>
            </div>
          </Then>
        </If>
      </header>
    </div>
  )
}

export default Layout
