'use client'
import {createContext,useContext,useEffect,useMemo,useState} from 'react'
import {Product} from './products'

type Item={id:string;product:Product;size:string;color:string;quantity:number}
type Cart={ready:boolean;savedItems:Product[];toggleWishlist:(product:Product)=>void;items:Item[];add:(p:Product,size:string,color?:string)=>void;quantity:(id:string,size:string,n:number,color?:string)=>void;remove:(id:string,size:string,color?:string)=>void;updateSize:(id:string,size:string,nextSize:string,color?:string)=>void;clear:()=>void;count:number;subtotal:number;giftMessage:string;setGiftMessage:(message:string)=>void}
const CartContext=createContext<Cart|null>(null)
const CART_KEY='noire-cart'
const GIFT_KEY='noire-gift-message'
const WISHLIST_KEY='noire-wishlist'
const matches=(item:Item,id:string,size:string,color?:string)=>item.id===id&&item.size===size&&(!color||item.color===color)

export function CartProvider({children}:{children:React.ReactNode}){
 const [items,setItems]=useState<Item[]>([])
 const [giftMessage,setGiftMessageState]=useState('')
 const [savedItems,setSavedItems]=useState<Product[]>([])
 const [ready,setReady]=useState(false)
 useEffect(()=>{
  try{
   const saved=JSON.parse(localStorage.getItem(CART_KEY)||'[]')
   if(Array.isArray(saved))setItems(saved.filter((x):x is Item=>!!x&&typeof x.id==='string'&&!!x.product&&typeof x.product.price==='number'&&typeof x.size==='string'&&Number.isFinite(x.quantity)&&x.quantity>0).map(x=>({...x,color:typeof x.color==='string'?x.color:x.product.colors?.[0]||'#171717'})))
   setGiftMessageState(localStorage.getItem(GIFT_KEY)||'')
   const savedWishlist=JSON.parse(localStorage.getItem(WISHLIST_KEY)||'[]')
   if(Array.isArray(savedWishlist))setSavedItems(savedWishlist.filter((x):x is Product=>!!x&&typeof x.id==='string'&&typeof x.slug==='string'&&typeof x.price==='number'))
  }catch{setItems([]);setGiftMessageState('');setSavedItems([])}
  setReady(true)
 },[])
 useEffect(()=>{if(!ready)return;try{localStorage.setItem(CART_KEY,JSON.stringify(items));localStorage.setItem(GIFT_KEY,giftMessage);localStorage.setItem(WISHLIST_KEY,JSON.stringify(savedItems))}catch{/* Keep cart usable for this session if storage is unavailable. */}},[items,giftMessage,savedItems,ready])
 const value=useMemo<Cart>(()=>({
  ready,items,savedItems,
  toggleWishlist:product=>setSavedItems(a=>a.some(x=>x.id===product.id)?a.filter(x=>x.id!==product.id):[...a,product]),
  add:(product,size,color=product.colors?.[0]||'#171717')=>setItems(a=>{const old=a.find(x=>matches(x,product.id,size,color));return old?a.map(x=>x===old?{...x,quantity:x.quantity+1}:x):[...a,{id:product.id,product,size,color,quantity:1}]}),
  quantity:(id,size,n,color)=>setItems(a=>n<1?a.filter(x=>!matches(x,id,size,color)):a.map(x=>matches(x,id,size,color)?{...x,quantity:Math.floor(n)}:x)),
  remove:(id,size,color)=>setItems(a=>a.filter(x=>!matches(x,id,size,color))),
  updateSize:(id,size,nextSize,color)=>setItems(a=>{if(size===nextSize)return a;const current=a.find(x=>matches(x,id,size,color));if(!current)return a;const match=a.find(x=>matches(x,id,nextSize,current.color));return match?a.filter(x=>x!==current).map(x=>x===match?{...x,quantity:x.quantity+current.quantity}:x):a.map(x=>x===current?{...x,size:nextSize}:x)}),
  clear:()=>{setItems([]);setGiftMessageState('')},
  count:items.reduce((n,x)=>n+x.quantity,0),subtotal:items.reduce((n,x)=>n+x.product.price*x.quantity,0),
  giftMessage,setGiftMessage:setGiftMessageState,
 }),[items,giftMessage,savedItems,ready])
 return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){const c=useContext(CartContext);if(!c)throw new Error('CartProvider missing');return c}
