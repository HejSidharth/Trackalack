import React from 'react'
import Navbar from '../components/Navbar'

export default function AddApplication() {
  return (
    <>
    <div className=''>
    <Navbar />
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="max-w-xl mx-auto">
    <div class="text-center">
      <h1 class="text-3xl font-bold sm:text-4xl">
        Add Application
      </h1>
      <p class="mt-1 text-gray-600 dark:text-gray-400">
        Tell us your story and we’ll be in touch.
      </p>
    </div>

    <div class="mt-12">
      <form>
        <div class="grid gap-4 lg:gap-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label for="hs-firstname-hire-us-2" class="block mb-2 text-sm font-medium">Role</label>
              <input type="text" name="hs-firstname-hire-us-2" id="hs-firstname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"/>
            </div>

            <div>
              <label for="hs-lastname-hire-us-2" class="block mb-2 text-sm font-medium">Company</label>
              <input type="text" name="hs-lastname-hire-us-2" id="hs-lastname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"/>
            </div>
          </div>

          <div>
            <label for="hs-work-email-hire-us-2" class="block mb-2 text-sm font-medium">URL</label>
            <input type="email" name="hs-work-email-hire-us-2" id="hs-work-email-hire-us-2" autocomplete="email" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"/>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <label for="hs-company-hire-us-2" class="block mb-2 text-sm">Location</label>
              <input type="text" name="hs-company-hire-us-2" id="hs-company-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"/>
            </div>

            <div>
              <label for="hs-company-website-hire-us-2" class="block mb-2 text-sm font-medium">Deadline</label>
              <input type="date" name="hs-company-website-hire-us-2" id="hs-company-website-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"/>
            </div>
          </div>

          <div>
            <label for="hs-about-hire-us-2" class="block mb-2 text-sm font-medium">Details</label>
            <textarea id="hs-about-hire-us-2" name="hs-about-hire-us-2" rows="4" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border"></textarea>
          </div>
        </div>

        <div class="mt-3 flex">
          <div class="flex">
            <input id="remember-me" name="remember-me" type="checkbox" class="shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"/>
          </div>
          <div class="ms-3">
            <label for="remember-me" class="text-sm text-gray-600 dark:text-gray-400">By submitting this form I have read and acknowledged the <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">Privact policy</a></label>
          </div>
        </div>

        <div class="mt-6 grid">
          <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Send inquiry</button>
        </div>

        <div class="mt-3 text-center">
          <p class="text-sm text-gray-500">
            We'll get back to you in 1-2 business days.
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
    </>
  )
}
