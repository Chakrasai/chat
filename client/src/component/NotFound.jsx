import React from 'react'

function NotFound() {
  return (
    <div>
      <section class="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div class="text-center">
        <h1 class="text-8xl font-extrabold text-primary-600 dark:text-primary-500">404</h1>
        <p class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Oops! Page Not Found</p>
        <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. Try exploring our homepage.
        </p>
        <a href="/Choosechat"
            class="mt-6 inline-block px-6 py-3 text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            Back to Homepage
        </a>
    </div>
</section>

    </div>
  )
}

export default NotFound
