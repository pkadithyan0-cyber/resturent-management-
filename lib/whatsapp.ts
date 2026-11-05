export type WhatsAppCartLine={
 productName:string
 imageUrl:string
 category:string
 sku:string
 shade:string
 size:string
 quantity:number
 unitPrice:number
}

const money=(value:number)=>`$${value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`

export function buildWhatsAppCartMessage(items:WhatsAppCartLine[]):string|null{
 if(items.length===0)return null
 const details=items.map((item,index)=>[
  `${index+1}. ${item.productName}`,
  `Image: ${item.imageUrl}`,
  `Category: ${item.category}`,
  `SKU: ${item.sku}`,
  `Shade: ${item.shade}`,
  `Size: ${item.size}`,
  `Quantity: ${item.quantity}`,
  `Unit price: ${money(item.unitPrice)}`,
  `Product total: ${money(item.unitPrice*item.quantity)}`,
 ].join('\n')).join('\n\n')
 const total=items.reduce((sum,item)=>sum+item.unitPrice*item.quantity,0)
 return `Hello! I would like to share my shopping cart and place an order.\n\n*MY CART DETAILS*\n\n${details}\n\n*TOTAL CART VALUE: ${money(total)}*\n\nPlease confirm my order and product availability.`
}

export function buildWhatsAppUrl(phoneNumber:string,message:string):string|null{
 const digits=phoneNumber.replace(/\D/g,'')
 if(!/^[1-9]\d{7,14}$/.test(digits))return null
 return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
