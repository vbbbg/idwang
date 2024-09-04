import React from 'react'
import Link from 'next/link'

const MacTerminal = ({ posts, children, showBackButton = false }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
      <div className="flex items-center bg-gray-700 px-4 py-2">
        <div className="flex space-x-2">
          {showBackButton ? (
            <Link
              href="/"
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            />
          ) : (
            <div className="w-3 h-3 rounded-full bg-red-500" />
          )}
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 h-96 overflow-y-auto">
        {posts ? (
          <>
            <p>$ ls -la</p>
            {posts.map((post, index) => (
              <p key={index}>
                -r--r--r-- 1 user group {post.date}{' '}
                <Link
                  href={`/posts/${post.id}`}
                  className="hover:underline cursor-pointer"
                >
                  {post.title}
                </Link>
              </p>
            ))}
          </>
        ) : (
          children
        )}
        <p>$ <span className="blinking-cursor">_</span></p>
      </div>
    </div>
  )
}

export default MacTerminal
