"use client"
// import { useGetCurrentUserQuery } from '@/redux/features/auth/AuthApi'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
// import Logout from './Logout'
import logo from '@/../public/asset/images.jpeg.jpg'

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)
    // const { data } = useGetCurrentUserQuery()
    // const userInfo = data?.payload || []
    // console.log(data?.payload)

    // const activeLink = () => {

        
    // }


    return (
        <header className="bg-white text-slate-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between">
                {/* Logo */}
                <div  className="flex items-center justify-center gap-4">
                <Image src={logo} alt='' height={100} width={100} className='size-14'/>
                {/* <h1 className="text-2xl font-bold tracking-wide ">DIC</h1> */}
                </div>

                {/* Desktop Links */}
                <nav className="hidden lg:flex space-x-8 text-md font-normal">
                    <Link href="/" className="hover:text-amber-300 transition">Home</Link>
                    <Link href="/dashboard" className="hover:text-amber-300 transition">Dashboard</Link>
                    {/* <Link href="/services" className="hover:text-amber-300 transition">Services</Link>
                    <Link href="/contact" className="hover:text-amber-300 transition">Contact</Link>
                    <Link href="/blog" className="hover:text-amber-300 transition">Blog</Link> */}
                    {/* <Link href="/profile" className="text-rose-500 hover:text-amber-300 transition">{userInfo?.name}</Link>
                    {
                        userInfo?.email ?
                            <Logout />
                            : <Link href="/login" className="text-rose-500 hover:text-amber-300 transition">Login</Link>
                    } */}
                </nav>

                {/* Mobile Icon */}
                <div className="lg:hidden">
                    {isOpen ? (
                        <X onClick={() => setIsOpen(false)} className="w-7 h-7 cursor-pointer" />
                    ) : (
                        <Menu onClick={() => setIsOpen(true)} className="w-7 h-7 cursor-pointer" />
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden bg-white text-black px-5 pt-4 pb-6 space-y-3 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
                    }`}
            >
                <Link href="/" onClick={() => setIsOpen(false)} className="block font-medium">Home</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="block font-medium">About</Link>
                {/* <Link href="/services" onClick={() => setIsOpen(false)} className="block font-medium">Services</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block font-medium">Contact</Link>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="block font-medium">Blog</Link> */}
                {/* <Link href="/profile" className="text-rose-500 transition">{userInfo?.name}</Link> */}
            </div>
        </header>
    )
}
