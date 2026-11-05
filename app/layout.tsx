import type {Metadata} from 'next'
import './globals.css'
import {CartProvider} from '@/lib/cart'
import {Shell} from '@/components/store'
export const metadata:Metadata={title:'NOIRÉ — Haute Couture',description:'Timeless fashion. Modern identity. Pure sculptural silhouettes.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;1,6..96,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/></head><body><CartProvider><Shell>{children}</Shell></CartProvider></body></html>}
