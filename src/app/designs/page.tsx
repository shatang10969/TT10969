"use client";

import Footer from '../../components/Footer';
import { useState, useRef, useEffect } from 'react';
import { getImagePath } from '@/utils/imagePath';

const designs = [
  {
    title: "2023个人作品集设计",
    description: "采用黑白极简风格的作品集设计，以网格和几何图形为基础，展现信息流设计、社交行业、电商行业等多个领域的设计作品。设计风格简约现代，突出作品分类展示。",
    cover: "/portfolio-cover.png",
    images: ["/design3.png"],
    link: "#"
  },
  {
    title: "2020游戏直播设计合集",
    description: "包含Banner设计、Logo设计和品牌视觉包装，涵盖了和平精英、虎牙直播等游戏直播内容。设计风格突出电竞元素，采用动感的构图和鲜明的色彩对比。",
    cover: "/game-cover.png",
    images: ["/design2.jpeg"],
    link: "#"
  },
  {
    title: "Octanion Wallte APP UI设计",
    description: "一款数字货币钱包APP的UI设计，采用蓝色渐变为主色调，简洁的LOGO设计突出品牌识别度。包含完整的用户界面流程、功能模块设计和视觉风格定义。",
    cover: "/wallet-cover.jpg",
    images: ["/design1.jpg"],
    link: "#"
  }
];

export default function DesignsPage() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedDesign(null);
      }
    };

    if (selectedDesign !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDesign]);

  return (
    <div className="md:min-h-screen md:flex md:flex-col">
      <div className="min-h-[calc(100vh-64px)] flex flex-col md:min-h-0 md:flex-1">
        <main className="flex-1">
          <div className="px-4 md:px-8 py-4 pb-6 md:py-16 md:pb-8">
            <section className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-2">设计作品</h1>
              <p className="text-gray-600 mb-8">探索我的设计作品集，展示最近的设计创作。</p>

              <div className="space-y-8">
                {designs.map((design, index) => (
                  <div
                    key={index}
                    className="group block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-3/5">
                        <div 
                          className="relative aspect-video cursor-pointer"
                          onClick={() => setSelectedDesign(index)}
                        >
                          <img
                            src={getImagePath(design.cover)}
                            alt={design.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-2/5 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg md:text-2xl font-medium text-gray-900 mb-2">
                            {design.title}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                            {design.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedDesign(index)}
                          className="text-purple-600 hover:text-purple-800 text-sm md:text-base font-medium inline-flex items-center mt-3"
                        >
                          查看详情 
                          <svg className="w-3 h-3 md:w-4 md:h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>

      {/* 图片预览弹窗 */}
      {selectedDesign !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div 
            ref={modalRef}
            className="relative w-full h-full overflow-auto"
          >
            <button
              onClick={() => setSelectedDesign(null)}
              className="fixed top-4 right-4 text-white hover:text-gray-300 z-50"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="min-h-full flex items-center py-8">
              <div className="w-full px-4 space-y-4">
                {designs[selectedDesign].images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${designs[selectedDesign].title} - 图片 ${index + 1}`}
                    className="w-full max-w-5xl mx-auto rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}