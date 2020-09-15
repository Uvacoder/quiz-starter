import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Quiz Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/demo">
          <a className="card">
            <h3>Quiz Demo</h3>
          </a>
        </Link>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 5rem;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
