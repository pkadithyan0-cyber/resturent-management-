import test from 'node:test'
import assert from 'node:assert/strict'
import {buildWhatsAppCartMessage,buildWhatsAppUrl} from '../lib/whatsapp.ts'

const coat={productName:'Architectural Wool Overcoat',imageUrl:'https://shop.test/coat.jpg',category:'Outerwear',sku:'NR-COAT',shade:'Noir (#171717)',size:'M',quantity:1,unitPrice:2100}

test('shares one cart line with complete details and quantity total',()=>{
 const message=buildWhatsAppCartMessage([coat])
 assert.match(message,/Architectural Wool Overcoat/)
 assert.match(message,/https:\/\/shop\.test\/coat\.jpg/)
 assert.match(message,/Category: Outerwear/)
 assert.match(message,/SKU: NR-COAT/)
 assert.match(message,/Shade: Noir/)
 assert.match(message,/Size: M/)
 assert.match(message,/Product total: \$2,100\.00/)
 assert.match(message,/TOTAL CART VALUE: \$2,100\.00/)
})

test('calculates multiple products with different sizes, shades, and quantities',()=>{
 const second={...coat,productName:'Cashmere Knit',category:'Knitwear',sku:'NR-KNIT',shade:'Ivory (#ded6c8)',size:'S',quantity:2,unitPrice:890}
 const message=buildWhatsAppCartMessage([coat,second])
 assert.match(message,/Size: S/)
 assert.match(message,/Shade: Ivory/)
 assert.match(message,/Product total: \$1,780\.00/)
 assert.match(message,/TOTAL CART VALUE: \$3,880\.00/)
})

test('reflects quantity changes in product and cart totals',()=>{
 const message=buildWhatsAppCartMessage([{...coat,quantity:3}])
 assert.match(message,/Quantity: 3/)
 assert.match(message,/Product total: \$6,300\.00/)
 assert.match(message,/TOTAL CART VALUE: \$6,300\.00/)
})

test('handles an empty cart and encodes a valid WhatsApp share URL',()=>{
 assert.equal(buildWhatsAppCartMessage([]),null)
 const message=buildWhatsAppCartMessage([coat])
 const url=buildWhatsAppUrl('+91 98765 43210',message)
 assert.match(url,/^https:\/\/wa\.me\/919876543210\?text=/)
 assert.equal(new URL(url).searchParams.get('text'),message)
 assert.equal(buildWhatsAppUrl('',message),null)
})
