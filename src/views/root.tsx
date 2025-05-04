"use client"

import { useState } from "react"
import UseIdComponent from "../components/useId"
import MemoComponent from "../components/memo"
import UseMemoComponent from "../components/useMemo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import UseCallbackComponent from "../components/useCallback"

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">React Hooks Demo: useId, memo, useMemo, dan useCallback</h1>

        <div className="mb-8 p-4 bg-slate-100 rounded-lg">
          <p className="mb-2">
            Counter global: <span className="font-bold">{count}</span>
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Increment Counter
          </button>
          <p className="mt-4 text-sm text-slate-600">
            Counter ini akan memicu re-render pada semua komponen, kecuali yang dimemoized
          </p>
        </div>

        <Tabs defaultValue="useId" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="useId">useId</TabsTrigger>
            <TabsTrigger value="memo">memo</TabsTrigger>
            <TabsTrigger value="useMemo">useMemo</TabsTrigger>
            <TabsTrigger value="useCallback">useCallback</TabsTrigger>
          </TabsList>

          <TabsContent value="useId" className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">useId Hook</h2>
            <p className="mb-4">
              useId digunakan untuk menghasilkan ID unik yang stabil untuk elemen HTML, terutama untuk aksesibilitas.
            </p>
            <UseIdComponent />
          </TabsContent>

          <TabsContent value="memo" className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">memo HOC</h2>
            <p className="mb-4">
              memo digunakan untuk meng-cache komponen React dan mencegah render ulang yang tidak perlu.
            </p>
            <MemoComponent count={count} />
          </TabsContent>

          <TabsContent value="useMemo" className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">useMemo Hook</h2>
            <p className="mb-4">useMemo digunakan untuk meng-cache hasil perhitungan yang mahal.</p>
            <UseMemoComponent count={count} />
          </TabsContent>

          <TabsContent value="useCallback" className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">useCallback Hook</h2>
            <p className="mb-4">
              useCallback digunakan untuk meng-cache fungsi callback agar tidak dibuat ulang pada setiap render.
            </p>
            <UseCallbackComponent count={count} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
