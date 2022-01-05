import type { NextApiRequest, NextApiResponse } from 'next'
import ErrorPage from 'next/error'
import ReactDOMServer from 'react-dom/server'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return sendNextErrorPage(res, 404)
  }

  res.status(200).json({
    status: 'ok',
    result: {
      data: 'Hello',
    },
  })
}

// API helper
function sendNextErrorPage(res: NextApiResponse, status: number) {
  const errorPageTxt = ReactDOMServer.renderToStaticMarkup(<ErrorPage statusCode={status} />)
  res.status(status).send(errorPageTxt)
}
