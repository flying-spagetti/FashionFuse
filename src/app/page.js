"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';






export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1, 
        },
      },
    ],
  };

  //console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="carousel-container">
            <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
              <div className="mr-auto place-self-center lg:col-span-7">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-red-500 to-orange-500 bg-clip-text animate-gradientAnimation">
                Best Fashion Collection
                </h1>
                <p className="max-w-2xl mb-6 font-dark text-gray-900 lg:mb-8 md:text-lg lg:text-xl transition-opacity duration-1000 transistion-opacity">
                The best of deals right in front you. Delivered right at your doorstep
                  </p>

                <button
                  type="button"
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Explore Shop Collection
                </button>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-4 lg:flex">
                <img
                  src="https://i.pinimg.com/originals/74/14/ff/7414ffc5c0163dadc1b9cb391b26b9de.jpg"
                  alt="Explore Shop Collection"
                />
              </div>
              </div>
              <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            Trending Products
          </h2>
          <Slider {...settings}>
            {products && products.length
              ? products.slice(5, 13).map((productItem) => ( // Adjust the number of products to display based on your needs
                  <div key={productItem._id} className="p-4 rounded-md">
                    <img
                      src={productItem.imageUrl}
                      alt={productItem.name}
                      className="object-cover w-full h-56 rounded-md" // Adjust height for tile-like aspect ratio
                    />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">
                      {productItem.name}
                    </h3>
                    
                    <p className="text-gray-700 text-sm">
                      {productItem.description.slice(0, 50) + "..."}
                    </p>
                  </div>
                ))
              : null}
          </Slider>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Exclusive Summer Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop ALL
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 6)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <footer className="bg-gray-300 text-black py-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-semibold mb-4">Connect with the Team</h3>
              <ul className="flex flex-wrap list-none">
                <li className="mr-6 mb-4"><a href="https://www.linkedin.com/in/gnaneswar-lopinti-5bb480109/" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white">LinkedIn<LinkedInIcon/></a></li>
                <li className="mr-6 mb-4"><a href="https://github.com/lGnan-hub" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white">GitHub<GitHubIcon/></a></li>
               <li className="mr-6 mb-4"><a href="https://twitter.com/ImGnAn_30" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white">Twitter<XIcon/></a></li>
               
                <li className="mb-4"><a href="https://www.instagram.com/___gnan___/" target="_blank" rel="noopener noreferrer" className="text-black-300 hover:text-white">Instagram<InstagramIcon/></a></li>
                
              </ul>
              
            
            </div>
            <div>
              <p className="text-lg mb-4">Designed and Developed for MERN SDP Project </p>
            <p>An E-Commerce application for Gen-Z </p>
            <div className="text-xs">The copyrights of all images belong to their respective owners.
            </div>
          <div className="text-xs ">
          The content of this site is copyright-protected and is the property of FashionKart Dev.
          </div>
          </div>
         </div>
        </div>
      </footer>

        
      </section>
      
    </main>
    
  );
}
