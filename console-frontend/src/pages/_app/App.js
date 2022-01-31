/* This example requires Tailwind CSS v2.0+ */
// import { Fragment } from 'react'
import { Outlet, NavLink, useLocation } from "react-router-dom"

import { Disclosure } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import _ from 'lodash'

const navigation = [
  { name: 'List Campaigns', href: '/list-campaigns', current: true },
  { name: 'Add a new Campaign', href: '/add-campaign', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function useCurrentRoute() {
  const location = useLocation();
  const currentRoute = _.find(navigation, (r) => r.href === location.pathname) ?? { name: '' }

  return currentRoute
}

export default function App(props) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full bg-gray-800">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                            alt="Workflow"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <NavLink
                                key={item.name}
                                to={item.href}
                                className={({isActive}) => 
                                  classNames(
                                    (isActive 
                                      ? 'bg-gray-900 text-white' 
                                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    ), 
                                    'px-3 py-2 rounded-md text-sm font-medium'
                                  )
                                }
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="px-2 py-3 space-y-1 sm:px-3">
                    {navigation.map((item, i) => (
                      <Disclosure.Button as="div" key={i}>
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({isActive}) => 
                          classNames(
                            (isActive 
                              ? 'bg-gray-900 text-white' 
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            ), 
                            'block px-3 py-2 rounded-md text-base font-medium'
                          )
                        }
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-white">{useCurrentRoute().name}</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <Outlet {...props} />
            </div>
          </div>
        </main>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  )
}