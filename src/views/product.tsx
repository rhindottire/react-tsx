"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { cn } from "../lib/utils"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star, Truck } from "lucide-react"
import { Product } from "@/services/product.service"

// Mock product service using axios
const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return response.data
  } catch (error) {
    console.error("Error fetching product:", error)
    // Fallback data in case the API fails
    return {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday essentials in the main compartment, and your water bottle in the side pocket. The padded back and adjustable shoulder straps make it comfortable to carry for extended periods.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    }
  }
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  // Mock additional images for gallery
  const productImages = product
    ? [
        product.image,
        "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      ]
    : []

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const numericId = Number(id)
        if (!isNaN(numericId)) {
          setLoading(true)
          try {
            const data = await getProduct(numericId)
            setProduct(data)
          } catch (error) {
            console.error("Error fetching product:", error)
          } finally {
            // Simulate network delay for animation demo
            setTimeout(() => setLoading(false), 800)
          }
        }
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    setAddedToCart(true)
    // Reset after animation completes
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  if (loading) {
    return <ProductSkeleton />
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <p className="mt-2 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
          <a
            href="/"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6 animate-fadeIn">
        <span className="inline-flex items-center rounded-md border border-gray-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:border-gray-800 dark:focus:ring-gray-300 mb-2">
          {product.category}
        </span>
        <nav className="flex text-sm text-gray-500">
          <a href="/" className="hover:text-gray-900 transition-colors">
            Home
          </a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-gray-900 transition-colors">
            Products
          </a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4 animate-fadeInLeft">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <div key={currentImageIndex} className="relative w-full h-full animate-fadeIn">
              <img
                src={productImages[currentImageIndex] || ""}
                alt={product.title}
                className="object-contain p-4 w-full h-full"
              />
            </div>

            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={cn(
                  "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all",
                  currentImageIndex === index ? "border-gray-900 ring-2 ring-gray-900/20" : "border-gray-200",
                )}
              >
                <img src={img || ""} alt={`Product thumbnail ${index + 1}`} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2 animate-fadeInUp">
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

            <div className="flex items-center space-x-4 animate-fadeInUp delay-[100ms]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating.rate) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">SKU: PRD-{product.id.toString().padStart(5, "0")}</span>
            </div>
          </div>

          <div className="animate-fadeInUp delay-[200ms]">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white">
                Save 20%
              </span>
            </div>
          </div>

          <div className="animate-fadeInUp delay-[300ms]">
            <hr className="my-4" />
            <div className="py-4">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-500">{product.description}</p>
            </div>
            <hr className="my-4" />
          </div>

          <div className="space-y-4 animate-fadeInUp delay-[400ms]">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Free shipping on orders over $50</span>
            </div>

            <div className="flex space-x-4 items-center">
              <div className="flex border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-1 flex items-center justify-center min-w-[40px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border-l hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">In stock</span> - ready to ship
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative hover:scale-102 active:scale-98 transition-transform">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </button>

                {addedToCart && (
                  <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs animate-scaleIn">
                    ✓
                  </div>
                )}
              </div>

              <div className="hover:scale-102 active:scale-98 transition-transform">
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 animate-fadeInUp delay-[600ms]">
        <div className="border-b">
          <div className="flex -mb-px">
            <button
              onClick={() => setActiveTab("details")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "details"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "reviews"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeTab === "shipping"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
              )}
            >
              Shipping & Returns
            </button>
          </div>
        </div>

        {activeTab === "details" && (
          <div className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>Durable polyester construction</li>
                <li>Padded laptop sleeve fits up to 15" laptops</li>
                <li>Multiple compartments for organization</li>
                <li>Adjustable shoulder straps</li>
                <li>Water-resistant exterior</li>
                <li>Side water bottle pocket</li>
              </ul>

              <h3 className="text-lg font-medium mt-6">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Material</span>
                    <span>Polyester</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Dimensions</span>
                    <span>18" x 12" x 6"</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Weight</span>
                    <span>1.2 lbs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Capacity</span>
                    <span>20L</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Warranty</span>
                    <span>1 Year</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">Origin</span>
                    <span>Imported</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <button className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="border-b pb-6 last:border-0 animate-fadeInUp"
                    // style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">John D.</span>
                          <span className="text-xs text-gray-500">Verified Purchase</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={cn("w-4 h-4", j < 4 - i ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500">
                            {new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium mt-2">
                      {
                        [
                          "Great backpack for everyday use",
                          "Comfortable but could be better",
                          "Decent quality for the price",
                        ][i]
                      }
                    </h4>
                    <p className="mt-2 text-gray-500">
                      {
                        [
                          "I've been using this backpack for a few months now and it's perfect for my daily commute. The laptop sleeve keeps my computer secure and there's plenty of room for all my other essentials.",
                          "The backpack is comfortable to wear for short periods, but I find the straps dig in a bit during longer hikes. The quality is good though and it seems durable.",
                          "For the price, this is a decent backpack. It's not the most durable I've owned but it works well for light use and casual outings.",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Shipping Information</h3>
              <p className="text-gray-500">
                We offer free standard shipping on all orders over $50. Orders typically ship within 1-2 business days
                and arrive within 3-5 business days.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Standard Shipping</span>
                  <span>3-5 business days</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Express Shipping</span>
                  <span>1-2 business days</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">International Shipping</span>
                  <span>7-14 business days</span>
                </div>
              </div>

              <h3 className="text-lg font-medium mt-6">Return Policy</h3>
              <p className="text-gray-500">
                We accept returns within 30 days of delivery for a full refund. Items must be unused and in their
                original packaging.
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Return Window</span>
                  <span>30 days from delivery</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Refund Method</span>
                  <span>Original payment method</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Processing Time</span>
                  <span>5-7 business days</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 animate-fadeInUp delay-[800ms]">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="group border rounded-lg overflow-hidden hover:translate-y-[-5px] transition-transform"
            >
              <div className="aspect-square relative bg-gray-100">
                <img
                  src={`https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg`}
                  alt="Related product"
                  className="object-cover p-4 w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-1">Similar Backpack {i + 1}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">${(99.95 + i * 10).toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs ml-1">4.{i}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Loading skeleton
const ProductSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-6">
        <div className="h-5 w-20 mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-60 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 rounded-md bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>

          <div>
            <div className="h-px w-full my-4 bg-gray-200"></div>
            <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-px w-full my-4 bg-gray-200"></div>
          </div>

          <div className="space-y-4">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>

            <div className="flex space-x-4">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="h-12 w-full sm:w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-full sm:w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="h-10 w-full mb-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full mb-2 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

export default ProductPage