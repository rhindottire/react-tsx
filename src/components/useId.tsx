"use client"

import type React from "react"

import { useId, useState } from "react"

export default function UseIdComponent() {
  // Menggunakan useId untuk menghasilkan ID unik
  const emailId = useId()
  const passwordId = useId()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Reset form setelah 3 detik
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm">
          <strong>Apa itu useId?</strong> useId adalah hook untuk menghasilkan ID unik yang stabil di sisi server dan
          klien. Ini sangat berguna untuk menghubungkan elemen HTML (seperti label dan input) untuk aksesibilitas.
        </p>
        <p className="text-sm mt-2">
          <strong>Kapan menggunakannya?</strong> Gunakan useId ketika Anda memerlukan ID unik yang konsisten antara
          server dan klien rendering, terutama untuk keperluan aksesibilitas.
        </p>
        <p className="text-sm mt-2">
          <strong>Perhatikan:</strong> Setiap kali komponen ini di-render ulang, ID yang dihasilkan tetap sama. Ini
          berbeda dengan menggunakan ID acak biasa yang akan berubah setiap render.
        </p>
      </div>

      <div className="border p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Form dengan useId</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor={emailId} className="block text-sm font-medium">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">ID yang dihasilkan: {emailId}</p>
          </div>

          <div>
            <label htmlFor={passwordId} className="block text-sm font-medium">
              Password
            </label>
            <input
              id={passwordId}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">ID yang dihasilkan: {passwordId}</p>
          </div>

          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </form>

        {submitted && <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">Form berhasil disubmit!</div>}
      </div>
    </div>
  )
}