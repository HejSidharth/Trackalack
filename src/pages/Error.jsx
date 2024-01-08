import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <>
    <Navbar />
  <body class="flex h-screen">
    <div class="max-w-[50rem] flex flex-col mx-auto w-full h-full">
      <header class="mb-auto flex justify-center z-50 w-full py-4">
        <nav class="px-4 sm:px-6 lg:px-8" aria-label="Global">
          <a class="flex-none text-xl font-semibold sm:text-3xl" href="#" aria-label="Brand"></a>
        </nav>
      </header>

      <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 class="block text-7xl font-bold">404</h1>
        <h1 class="block text-2xl font-bold "></h1>
        <p class="mt-3">Oops, something went wrong.</p>
        <p class="">Sorry, we couldn't find your page.</p>
        <div class="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <a class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1" href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html" target="_blank">
            Get the source code
          </a>
          <Link class="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none btn btn-ghost" to="/">
            <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Go Back
          </Link>
        </div>
      </div>

      <footer class="mt-auto text-center py-5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p class="text-sm text-gray-500">© All Rights Reserved. 2022.</p>
        </div>
      </footer>
    </div>
  </body>
    </>
  )
}
