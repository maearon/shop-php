"use client"

import { useAppSelector } from "@/store/hooks"
import { selectUser } from "@/store/sessionSlice"
import Link from "next/link"

export default function MyAccountPage() {
  const userData = useAppSelector(selectUser)

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">MY DETAILS</h1>
        <p className="text-gray-600 mb-6">Feel free to edit any of your details below so your account is up to date.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4">DETAILS</h3>
            <div className="space-y-2">
              <p className="font-medium">{userData.value.name || "MANH NGUYEN"}</p>
              <p className="text-gray-600">2000-13-02</p>
              <p className="text-gray-600">GENDER</p>
              <Link href="/my-account/profile" className="text-black underline font-medium">
                EDIT
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">LOGIN DETAILS</h3>
            <div className="space-y-2">
              <p className="text-gray-600">EMAIL</p>
              <p className="font-medium">{userData.value.email}</p>
              <Link href="/my-account/profile" className="text-black underline font-medium">
                EDIT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/my-account/order-history"
          className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-bold mb-2">Order History</h3>
            <p className="text-sm text-gray-600">View your past orders and track current ones</p>
          </div>
        </Link>

        <Link href="/my-account/addresses" className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-bold mb-2">Address Book</h3>
            <p className="text-sm text-gray-600">Manage your shipping and billing addresses</p>
          </div>
        </Link>

        <Link href="/wishlist" className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="text-center">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="font-bold mb-2">Wishlist</h3>
            <p className="text-sm text-gray-600">View your saved items</p>
          </div>
        </Link>
      </div>

      {/* adiClub Status */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">adiClub Level 1</h3>
            <p className="opacity-90">You have 0 points to spend</p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">🏆</div>
            <Link href="/my-account/adiclub" className="bg-white text-blue-600 px-4 py-2 rounded font-medium">
              View Benefits
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
