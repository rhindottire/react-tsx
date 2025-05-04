"use client"

import type React from "react"

import { useState, useCallback, memo, useEffect, useRef } from "react"

// Komponen anak yang di-memoize
const MemoizedButton = memo(function MemoizedButton({
  onClick,
  label,
  color,
}: {
  onClick: () => void
  label: string
  color: string
}) {
  // Menghitung jumlah render
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
  })

  console.log(`${label} button rendered`)

  return (
    <button onClick={onClick} className={`px-4 py-2 ${color} text-white rounded hover:opacity-90 w-full`}>
      {label}
      <span className="block text-xs mt-1">Render count: {renderCount.current}</span>
    </button>
  )
})

// Komponen untuk menunjukkan penggunaan useCallback dengan useEffect
const DataFetcher = memo(function DataFetcher({
  fetchData,
  dependency,
}: {
  fetchData: () => void
  dependency: string
}) {
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current += 1
  })

  // useEffect yang bergantung pada fungsi fetchData
  useEffect(() => {
    console.log("DataFetcher: Memanggil fetchData karena fungsi berubah")
    fetchData()
  }, [fetchData])

  return (
    <div className="p-3 bg-slate-100 rounded-lg">
      <p>Data Fetcher Component (dependency: {dependency})</p>
      <p className="text-xs mt-1">Render count: {renderCount.current}</p>
      <p className="text-xs mt-1">
        useEffect dijalankan setiap kali fetchData berubah. Dengan useCallback, fetchData tidak berubah kecuali
        dependencies berubah.
      </p>
    </div>
  )
})

export default function UseCallbackComponent({ count }: { count: number }) {
  const [countA, setCountA] = useState(0)
  const [countB, setCountB] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [apiEndpoint, setApiEndpoint] = useState("users")

  // 1. Contoh dasar: useCallback tanpa dependencies
  const incrementCallbackA = useCallback(() => {
    setCountA((prev) => prev + 1)
  }, []) // Dependencies kosong, fungsi tidak pernah dibuat ulang

  // Tanpa useCallback - fungsi ini dibuat ulang pada setiap render
  const incrementNormalB = () => {
    setCountB((prev) => prev + 1)
  }

  // 2. Contoh dengan dependencies: useCallback dengan dependencies
  const fetchWithCallback = useCallback(() => {
    console.log(`Fetching data from /${apiEndpoint} API...`)
    // Simulasi fetch data
  }, [apiEndpoint]) // Hanya dibuat ulang ketika apiEndpoint berubah

  // Tanpa useCallback - fungsi ini dibuat ulang pada setiap render
  const fetchWithoutCallback = () => {
    console.log(`Fetching data from /${apiEndpoint} API...`)
    // Simulasi fetch data
  }

  // 3. Contoh dengan event handler yang kompleks
  const handleSearchWithCallback = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchTerm(value)
      console.log(`Searching for: ${value} in ${apiEndpoint}`)
      // Logika pencarian kompleks lainnya...
    },
    [apiEndpoint],
  ) // Hanya dibuat ulang ketika apiEndpoint berubah

  // Tanpa useCallback
  const handleSearchWithoutCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    console.log(`Searching for: ${value} in ${apiEndpoint}`)
    // Logika pencarian kompleks lainnya...
  }

  // Menghitung waktu pembuatan fungsi
  const creationTime = new Date().toLocaleTimeString()

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-100 rounded-lg space-y-3">
        <h3 className="font-semibold text-lg">Apa itu useCallback?</h3>
        <p>
          <code>useCallback</code> adalah React Hook yang memungkinkan Anda meng-cache definisi fungsi antara render
          ulang. Ini berarti React akan menggunakan fungsi yang sama pada render berikutnya jika dependencies tidak
          berubah, bukan membuat fungsi baru setiap kali.
        </p>

        <div className="bg-white p-3 rounded border border-yellow-200">
          <pre className="text-sm overflow-x-auto">
            {`const cachedFunction = useCallback(
  () => {
    // Fungsi Anda di sini
  },
  [dependency1, dependency2]
)`}
          </pre>
        </div>

        <h3 className="font-semibold text-lg mt-4">Kapan Menggunakan useCallback?</h3>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            <strong>Mengoptimalkan komponen anak yang di-memoize:</strong> Ketika Anda meneruskan fungsi callback ke
            komponen anak yang di-memoize dengan <code>memo</code>, useCallback mencegah render ulang yang tidak perlu.
          </li>
          <li>
            <strong>Mencegah efek samping yang tidak perlu:</strong> Ketika fungsi digunakan sebagai dependency dalam{" "}
            <code>useEffect</code>, useCallback mencegah efek dijalankan berulang kali.
          </li>
          <li>
            <strong>Event handler yang kompleks:</strong> Untuk event handler yang kompleks yang bergantung pada state
            atau props tertentu, useCallback memastikan handler hanya dibuat ulang ketika dependencies berubah.
          </li>
          <li>
            <strong>Custom hooks:</strong> Ketika mengembalikan fungsi dari custom hook, useCallback memastikan konsumen
            hook tidak di-render ulang secara tidak perlu.
          </li>
        </ol>

        <h3 className="font-semibold text-lg mt-4">Perbedaan dengan useMemo</h3>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <code>useCallback(fn, deps)</code> mengembalikan fungsi callback yang di-cache.
          </li>
          <li>
            <code>useMemo(() =&gt; fn, deps)</code> memanggil fungsi dan mengembalikan hasil yang di-cache.
          </li>
          <li>
            Secara internal, <code>useCallback(fn, deps)</code> setara dengan <code>useMemo(() =&gt; fn, deps)</code>.
          </li>
        </ul>
      </div>

      {/* Contoh 1: Dasar - Mencegah render ulang komponen anak */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-3">Contoh 1: Mengoptimalkan Komponen Anak yang Di-memoize</h3>
        <p className="mb-4">
          Contoh ini menunjukkan bagaimana useCallback mencegah render ulang komponen anak yang di-memoize dengan memo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 border rounded-lg space-y-3 bg-green-50">
            <h4 className="font-medium">Dengan useCallback</h4>
            <p>Counter A: {countA}</p>
            <MemoizedButton onClick={incrementCallbackA} label="Increment A" color="bg-green-500" />
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Fungsi dibuat pada:</strong> Hanya saat komponen pertama kali di-mount
              </p>
              <p>
                <strong>Penjelasan:</strong> Fungsi ini di-cache dengan useCallback tanpa dependencies, sehingga tidak
                pernah dibuat ulang.
              </p>
            </div>
          </div>

          <div className="p-4 border rounded-lg space-y-3 bg-red-50">
            <h4 className="font-medium">Tanpa useCallback</h4>
            <p>Counter B: {countB}</p>
            <MemoizedButton onClick={incrementNormalB} label="Increment B" color="bg-red-500" />
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Fungsi dibuat pada:</strong> {creationTime} (setiap render)
              </p>
              <p>
                <strong>Penjelasan:</strong> Fungsi ini dibuat ulang pada setiap render, sehingga memicu render ulang
                pada komponen anak meskipun di-memoize.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-lg text-sm">
          <p>
            <strong>Mengapa ini penting?</strong> Ketika parent component di-render ulang (misalnya karena state
            berubah), semua fungsi di dalamnya dibuat ulang. Jika fungsi tersebut diteruskan ke komponen anak yang
            di-memoize, komponen anak akan tetap di-render ulang karena fungsi tersebut dianggap sebagai prop baru.
            useCallback mencegah hal ini dengan meng-cache fungsi.
          </p>
        </div>
      </div>

      {/* Contoh 2: useCallback dengan useEffect */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-3">Contoh 2: Mencegah Efek Samping yang Tidak Perlu</h3>
        <p className="mb-4">
          Contoh ini menunjukkan bagaimana useCallback mencegah useEffect dijalankan berulang kali ketika fungsi
          digunakan sebagai dependency.
        </p>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setApiEndpoint("users")}
            className={`px-3 py-1 rounded ${apiEndpoint === "users" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Users API
          </button>
          <button
            onClick={() => setApiEndpoint("posts")}
            className={`px-3 py-1 rounded ${apiEndpoint === "posts" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Posts API
          </button>
          <button
            onClick={() => setApiEndpoint("comments")}
            className={`px-3 py-1 rounded ${apiEndpoint === "comments" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Comments API
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <h4 className="font-medium">Dengan useCallback</h4>
            <DataFetcher fetchData={fetchWithCallback} dependency={apiEndpoint} />
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Penjelasan:</strong> fetchData hanya dibuat ulang ketika apiEndpoint berubah, sehingga useEffect
                hanya dijalankan ketika apiEndpoint berubah.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Tanpa useCallback</h4>
            <DataFetcher fetchData={fetchWithoutCallback} dependency={apiEndpoint} />
            <div className="text-xs text-gray-600 space-y-1">
              <p>
                <strong>Penjelasan:</strong> fetchData dibuat ulang pada setiap render, sehingga useEffect dijalankan
                pada setiap render meskipun apiEndpoint tidak berubah.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-lg text-sm">
          <p>
            <strong>Mengapa ini penting?</strong> Ketika fungsi digunakan sebagai dependency dalam useEffect, useEffect
            akan dijalankan setiap kali fungsi tersebut berubah. Jika fungsi dibuat ulang pada setiap render, useEffect
            akan dijalankan pada setiap render. useCallback mencegah hal ini dengan meng-cache fungsi sehingga useEffect
            hanya dijalankan ketika dependencies yang sebenarnya berubah.
          </p>
        </div>
      </div>

      {/* Contoh 3: Event handler yang kompleks */}
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-lg mb-3">Contoh 3: Event Handler yang Kompleks</h3>
        <p className="mb-4">
          Contoh ini menunjukkan bagaimana useCallback berguna untuk event handler yang kompleks yang bergantung pada
          state atau props tertentu.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-3">
            <h4 className="font-medium">Dengan useCallback</h4>
            <div className="p-3 border rounded">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchWithCallback}
                placeholder="Search..."
                className="w-full p-2 border rounded"
              />
              <p className="text-xs mt-2">
                Handler dibuat ulang hanya ketika apiEndpoint berubah, bukan pada setiap render.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Tanpa useCallback</h4>
            <div className="p-3 border rounded">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchWithoutCallback}
                placeholder="Search..."
                className="w-full p-2 border rounded"
              />
              <p className="text-xs mt-2">Handler dibuat ulang pada setiap render, meskipun tidak perlu.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 p-3 rounded-lg text-sm">
          <p>
            <strong>Mengapa ini penting?</strong> Untuk event handler yang kompleks yang bergantung pada state atau
            props tertentu, useCallback memastikan handler hanya dibuat ulang ketika dependencies yang relevan berubah.
            Ini dapat meningkatkan performa, terutama jika handler tersebut diteruskan ke komponen anak yang di-memoize
            atau digunakan dalam useEffect.
          </p>
        </div>
      </div>

      {/* Kesimpulan dan Praktik Terbaik */}
      <div className="border rounded-lg p-4 bg-blue-50">
        <h3 className="font-semibold text-lg mb-3">Kesimpulan dan Praktik Terbaik</h3>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li>
            <strong>Jangan gunakan useCallback untuk semua fungsi:</strong> Hanya gunakan ketika ada manfaat performa
            yang jelas, seperti mencegah render ulang komponen anak yang di-memoize atau mencegah efek samping yang
            tidak perlu.
          </li>
          <li>
            <strong>Pastikan dependencies array benar:</strong> Sertakan semua nilai yang digunakan dalam fungsi yang
            berasal dari scope komponen (props, state, context, dll).
          </li>
          <li>
            <strong>Pertimbangkan alternatif:</strong> Terkadang, memindahkan fungsi ke dalam useEffect atau menggunakan
            useReducer dapat menjadi alternatif yang lebih baik daripada useCallback.
          </li>
          <li>
            <strong>Gunakan ESLint:</strong> Gunakan eslint-plugin-react-hooks untuk membantu memastikan dependencies
            array benar.
          </li>
        </ol>
      </div>

      <div className="p-4 border rounded-lg">
        <p className="text-sm">
          <strong>Global Counter:</strong> {count} (dari parent component)
        </p>
        <p className="text-sm mt-2">
          <strong>Penjelasan:</strong> Setiap kali Anda mengklik tombol "Increment Counter" di atas, parent component
          di-render ulang. Perhatikan perbedaan perilaku antara komponen yang menggunakan useCallback dan yang tidak.
        </p>
      </div>
    </div>
  )
}