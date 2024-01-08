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
        </div>

        <div class="mt-3 flex">
          <div class="flex">
            <input id="remember-me" name="remember-me" type="checkbox" class="shrink-0 mt-1.5 rounded pointer-events-none"/>
          </div>
          <div class="ms-3">
            <label for="remember-me" class="text-sm ">By submitting this form I have read and acknowledged the <a class="decoration-2 hover:underline font-medium" href="#">Privact policy</a></label>
          </div>
        </div>

        <div class="mt-6 grid">
          <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 btn">Send inquiry</button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
    </>
  )
}
