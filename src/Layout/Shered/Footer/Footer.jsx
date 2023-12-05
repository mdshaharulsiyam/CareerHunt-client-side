import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="bg-blue-700 bg-opacity-10">
            <div class="container py-10 px-4 sm:px-6 lg:px-8 mx-auto ">
                {/* <!-- Grid --> */}
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
                    <div class="col-span-full hidden lg:col-span-1 lg:block">
                        <a class="flex-none text-2xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#" aria-label="Brand">CareerHunt</a>
                        <p class="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400">CareerHunt: Elevate Your Skills, Ignite Your Career. Learn online, lead offline.</p>
                    </div>
                    {/* <!-- End Col --> */}

                    <div>
                        <h4 class="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">Support</h4>

                        <div class="mt-3 grid space-y-3 text-sm">
                            <p class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">111 Bijoy sarani, Dhaka, <br />  DH 1515, Bangladesh.</p>
                            <p> <a href="mailto:shaharulsiyam0273@gmail.com" class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 hover:underline">shaharulsiyam0273@gmail.com</a></p>
                            <p> <a href="tel:+8801566026301" class="inline-flex gap-x-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 hover:underline">+8801566026301</a></p>

                        </div>
                    </div>
                    {/* <!-- End Col --> */}

                    <div>
                        <h4 class="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">Account</h4>

                        <div class="mt-3 grid space-y-3 text-sm">
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Login / Register</Link>
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Cart</Link>
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Orders</Link>

                        </div>
                    </div>
                    {/* <!-- End Col --> */}

                    <div>
                        <h4 class="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">Quick Link</h4>
                        <div class="mt-3 grid space-y-3 text-sm">
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Privacy Policy</Link>
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Terms Of Use</Link>
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">FAQ</Link>
                            <Link class="inline-flex gap-x-2 hover:underline text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Contact</Link>

                        </div>
                    </div>
                    {/* <!-- End Col --> */}

                    <div>
                        <h4 class="text-xs font-semibold text-gray-900 uppercase dark:text-gray-100">Social link</h4>
                        <div class=" flex justify-start items-center gap-2 pt-6 text-4xl">
                            <FaFacebook className="cursor-pointer hover:scale-110 transition-all" />
                            <FaTwitter className="cursor-pointer hover:scale-110 transition-all" />
                            <FaYoutube className="cursor-pointer hover:scale-110 transition-all" />
                            <FaInstagram className="cursor-pointer hover:scale-110 transition-all" />
                        </div>
                    </div>
                    {/* <!-- End Col --> */}
                </div>
                {/* <!-- End Grid --> */}

                <div class="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
                    <p>© Copyright 2023. All right reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
