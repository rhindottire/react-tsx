"use client"

import { memo, useState } from "react"

// Komponen anak yang akan di-memoize
const ExpensiveChildComponent = memo(function ExpensiveChildComponent({ name }: { name: string }) {
  console.log("ExpensiveChildComponent rendered")

  // Simulasi operasi yang berat
  const startTime = performance.now()
  while (performance.now() - startTime < 10) {
    // Artificial delay (10ms)
  }

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <p>Komponen Anak (Memoized): Hello, {name}!</p>
      <p className="text-xs text-gray-500">Render pada: {new Date().toLocaleTimeString()}</p>
    </div>
  )
})

// Komponen anak yang tidak di-memoize untuk perbandingan
function RegularChildComponent({ name }: { name: string }) {
  console.log("RegularChildComponent rendered")

  // Simulasi operasi yang berat
  const startTime = performance.now()
  while (performance.now() - startTime < 10) {
    // Artificial delay (10ms)
  }

  return (
    <div className="p-4 bg-red-100 rounded-lg">
      <p>Komponen Anak (Regular): Hello, {name}!</p>
      <p className="text-xs text-gray-500">Render pada: {new Date().toLocaleTimeString()}</p>
    </div>
  )
}

export default function MemoComponent({ count }: { count: number }) {
  const [name, setName] = useState("Pengunjung")
  const [localCount, setLocalCount] = useState(0)

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm">
          <strong>Apa itu memo?</strong> memo adalah higher-order component yang meng-cache hasil render dari komponen.
          Komponen yang di-wrap dengan memo hanya akan di-render ulang jika props-nya berubah. [^1]
        </p>
        <p className="text-sm mt-2">
          <strong>Kapan menggunakannya?</strong> Gunakan memo ketika komponen sering di-render ulang dengan props yang
          sama, terutama jika komponen tersebut melakukan operasi yang berat. [^1]
        </p>
        <p className="text-sm mt-2">
          <strong>Perhatikan:</strong> Counter global di atas dan counter lokal di bawah akan memicu re-render pada
          komponen induk, tetapi hanya komponen anak yang tidak di-memoize yang akan di-render ulang jika props-nya
          tidak berubah. [^1]
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="px-3 py-2 border border-gray-300 rounded-md flex-grow"
          />
          <button
            onClick={() => setLocalCount(localCount + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Counter Lokal: {localCount}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Dengan memo</h3>
            <ExpensiveChildComponent name={name} />
            <p className="text-xs text-gray-500 mt-1">
              Komponen ini hanya di-render ulang ketika prop name berubah, bukan ketika counter berubah. [^1]
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tanpa memo</h3>
            <RegularChildComponent name={name} />
            <p className="text-xs text-gray-500 mt-1">
              Komponen ini di-render ulang setiap kali parent di-render ulang, termasuk ketika counter berubah.
            </p>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="text-sm">
            <strong>Global Counter:</strong> {count} (dari parent component)
          </p>
          <p className="text-sm">
            <strong>Local Counter:</strong> {localCount}
          </p>
          <p className="text-sm">
            <strong>Name:</strong> {name}
          </p>
        </div>
      </div>
    </div>
  )
}