'use client';

import { CartProvider } from '@/lib/cart';
import { ReactNode } from 'react';

export function FashionStoreProvider({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}