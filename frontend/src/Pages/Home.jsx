import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import RewearNavbar from '../Components/Navbar';
import RewearFooter from '../Components/Footer';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedItems, setLikedItems] = useState(new Set());

  // Hero slider images
  const heroImages = [
    {
      id: 1,
      title: "Vintage Designer Collection",
      subtitle: "Curated pre-loved luxury pieces",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
      buttonText: "Shop Vintage"
    },
    {
      id: 2,
      title: "Sustainable Fashion",
      subtitle: "Give your wardrobe a second life",
      image: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=1200&h=600&fit=crop",
      buttonText: "Explore Now"
    },
    {
      id: 3,
      title: "Designer Dresses",
      subtitle: "From casual to formal occasions",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=600&fit=crop",
      buttonText: "Shop Dresses"
    }
  ];

  // Categories
  const categories = [
    { name: "Women", image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=500&fit=crop", items: "2.4k items" },
    { name: "Men", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop", items: "1.8k items" },
    { name: "Kids", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop", items: "850 items" }
  ];

  // Product listings
  const products = [
    {
      id: 1,
      name: "Vintage Chanel Blazer",
      brand: "Chanel",
      price: 450,
      originalPrice: 850,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
      rating: 4.8,
      reviews: 23,
      condition: "Excellent",
      size: "M"
    },
    {
      id: 2,
      name: "Designer Silk Dress",
      brand: "Diane von Furstenberg",
      price: 180,
      originalPrice: 320,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      rating: 4.9,
      reviews: 45,
      condition: "Very Good",
      size: "S"
    },
    {
      id: 3,
      name: "Luxury Cashmere Coat",
      brand: "Max Mara",
      price: 320,
      originalPrice: 650,
      image: "https://images.unsplash.com/photo-1548883354-9e3e0e5c9c7b?w=300&h=400&fit=crop",
      rating: 4.7,
      reviews: 18,
      condition: "Excellent",
      size: "L"
    },
    {
      id: 4,
      name: "Classic Denim Jacket",
      brand: "Levi's",
      price: 65,
      originalPrice: 120,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
      rating: 4.6,
      reviews: 67,
      condition: "Good",
      size: "M"
    },
    {
      id: 5,
      name: "Floral Midi Skirt",
      brand: "Reformation",
      price: 85,
      originalPrice: 150,
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d5e?w=300&h=400&fit=crop",
      rating: 4.8,
      reviews: 34,
      condition: "Very Good",
      size: "S"
    },
    {
      id: 6,
      name: "Wool Blend Sweater",
      brand: "COS",
      price: 95,
      originalPrice: 165,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      rating: 4.5,
      reviews: 12,
      condition: "Excellent",
      size: "M"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const toggleLike = (productId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <RewearNavbar/>

      {/* Hero Slider */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {heroImages.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl mb-8 font-light">
                  {slide.subtitle}
                </p>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-900 p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl z-10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-60 hover:bg-opacity-80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600">
            Discover curated collections of pre-loved fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white opacity-90 drop-shadow-lg">{category.items}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Items
              </h2>
              <p className="text-lg text-gray-600">
                Hand-picked pieces from our community
              </p>
            </div>
            <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-gray-900 font-medium">
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Heart
                      size={16}
                      className={likedItems.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-lg text-xs font-medium text-gray-700">
                    {product.condition}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {product.brand}
                    </span>
                    <span className="text-xs text-gray-500">Size {product.size}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Rewear?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of fashion lovers giving clothes a second life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200">
              Start Shopping
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200">
              Sell Your Clothes
            </button>
          </div>
        </div>
      </div>

      <RewearFooter/>
    </div>
  );
};

export default Home;