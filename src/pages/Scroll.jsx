import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

export default function Scroll() {
  return (
    <>
    <Navbar />
    <div className=''>
    <div className='h-16 flex items-center pl-12'>
    </div>
    <Sidebar />
    <div class="p-4 sm:ml-64 border">
    <div>
        <h1 className='text-3xl font-bold'>
            Add an Internship
        </h1>
        <p className='text-sm text-gray-300'>Enter all the relavent fields</p>
        <div className='mt-4 bg-base-200 rounded-lg border border-neutral p-6'>
        <h1 className='text-2xl font-bold'>
            Company Information
        </h1>
        <p className='text-sm text-gray-300'>Please enter relevant information about the company</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
            <div>
              <label for="hs-firstname-hire-us-2" class="block mb-2 text-sm font-medium">Role</label>
              <input type="text" name="hs-firstname-hire-us-2" id="hs-firstname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
            </div>

            <div>
              <label for="hs-lastname-hire-us-2" class="block mb-2 text-sm font-medium">Company</label>
              <input type="text" name="hs-lastname-hire-us-2" id="hs-lastname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
            </div>
          </div>
          <div className='mt-3'>
            <label for="hs-work-email-hire-us-2" class="block mb-2 text-sm font-medium">URL</label>
            <input type="email" name="hs-work-email-hire-us-2" id="hs-work-email-hire-us-2" autocomplete="email" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
          </div>
        </div>
        <div className='mt-10 bg-base-200 rounded-lg border border-neutral p-6'>
        <h1 className='text-2xl font-bold'>
            Company Information
        </h1>
        <p className='text-sm text-gray-300'>Please enter relevant information about the company</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-6">
            <div>
              <label for="hs-firstname-hire-us-2" class="block mb-2 text-sm font-medium">Role</label>
              <input type="text" name="hs-firstname-hire-us-2" id="hs-firstname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
            </div>

            <div>
              <label for="hs-lastname-hire-us-2" class="block mb-2 text-sm font-medium">Company</label>
              <input type="text" name="hs-lastname-hire-us-2" id="hs-lastname-hire-us-2" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
            </div>
          </div>
          <div>
            <label for="hs-work-email-hire-us-2" class="block mb-2 text-sm font-medium">URL</label>
            <input type="email" name="hs-work-email-hire-us-2" id="hs-work-email-hire-us-2" autocomplete="email" class="py-3 px-4 block w-full rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-neutral outline-none"/>
          </div>
        </div>
    </div>
    </div>
    </div>
    </>

)
}
