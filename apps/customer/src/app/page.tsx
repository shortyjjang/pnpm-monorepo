'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    const hasToken = document.cookie.includes('authToken=');
    setIsLoggedIn(hasToken);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">고객용 쇼핑몰</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-blue-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">환영합니다</h2>
          <p className="mb-6">최고의 제품을 최상의 가격으로 만나보세요.</p>
          
          <div className="space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/profile" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  내 프로필
                </Link>
                <Link 
                  href="/orders" 
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  주문 내역
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  로그인
                </Link>
                <Link 
                  href="/register" 
                  className="inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">인기 상품</h2>
          <p className="mb-4">지금 가장 인기 있는 상품들을 확인해보세요.</p>
          <Link 
            href="/products" 
            className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            상품 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
