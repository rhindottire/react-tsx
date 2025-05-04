"use client"

import { useState, useMemo } from "react"

// Fungsi untuk menghitung bilangan fibonacci (operasi yang berat)
function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

export default function UseMemoComponent({ count }: { count: number }) {
  const [fibInput, setFibInput] = useState(30)
  const [localCount, setLocalCount] = useState(0)

  // Menggunakan useMemo untuk meng-cache hasil perhitungan fibonacci
  const memoizedFibResult = useMemo(() => {
    console.log("Calculating memoized fibonacci...")
    const startTime = performance.now()
    const result = fibonacci(fibInput)
    const endTime = performance.now()
    return {
      result,
      time: endTime - startTime,
    }
  }, [fibInput]) // Hanya dihitung ulang jika fibInput berubah

  // Tanpa useMemo, akan dihitung ulang setiap render
  console.log("Calculating non-memoized fibonacci...")
  const startTime = performance.now()
  const nonMemoizedFibResult = fibonacci(fibInput)
  const nonMemoizedTime = performance.now() - startTime

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p className="text-sm">
          <strong>Apa itu useMemo?</strong> useMemo adalah hook untuk meng-cache hasil perhitungan yang mahal. Nilai
          yang di-cache hanya akan dihitung ulang jika dependencies-nya berubah.
        </p>
        <p className="text-sm mt-2">
          <strong>Kapan menggunakannya?</strong> Gunakan useMemo ketika Anda memiliki perhitungan yang mahal dan ingin
          menghindari perhitungan ulang yang tidak perlu pada setiap render.
        </p>
        <p className="text-sm mt-2">
          <strong>Perhatikan:</strong> Contoh ini menghitung bilangan Fibonacci, yang menjadi sangat berat untuk nilai
          input yang besar. Perhatikan perbedaan waktu eksekusi antara versi yang di-memoize dan yang tidak.
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex space-x-4">
          <div className="flex-grow">
            <label htmlFor="fibInput" className="block text-sm font-medium">
              Input Fibonacci (1-40):
            </label>
            <input
              id="fibInput"
              type="number"
              min="1"
              max="40"
              value={fibInput}
              onChange={(e) => setFibInput(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={() => setLocalCount(localCount + 1)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 self-end"
          >
            Counter Lokal: {localCount}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold mb-2">Dengan useMemo</h3>
            <p>
              Fibonacci({fibInput}) = {memoizedFibResult.result}
            </p>
            <p className="text-xs text-gray-500">Waktu kalkulasi: {memoizedFibResult.time.toFixed(2)} ms</p>
            <p className="text-xs text-gray-500">
              Hanya dihitung ulang ketika input berubah, bukan ketika counter berubah.
            </p>
          </div>

          <div className="p-4 bg-red-100 rounded-lg">
            <h3 className="font-semibold mb-2">Tanpa useMemo</h3>
            <p>
              Fibonacci({fibInput}) = {nonMemoizedFibResult}
            </p>
            <p className="text-xs text-gray-500">Waktu kalkulasi: {nonMemoizedTime.toFixed(2)} ms</p>
            <p className="text-xs text-gray-500">Dihitung ulang setiap kali komponen di-render ulang.</p>
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
            <strong>Render Count:</strong> Setiap kali Anda mengklik tombol counter, komponen ini di-render ulang.
            Perhatikan bahwa perhitungan yang di-memoize tidak dijalankan ulang kecuali input Fibonacci berubah.
          </p>
        </div>
      </div>
    </div>
  )
}