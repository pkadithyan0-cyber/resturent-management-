import homeImages from './noir_home_page.json'
import collectionImages from './noir_the_collection_plp.json'
import pdpImages from './noir_product_details_pdp.json'

export type Product = { id:string; slug:string; name:string; category:string; price:number; image:string; detail:string; colors:string[]; sizes:string[]; badge?:string }
const img=(arr:string[], n:number)=>arr[n] || arr[0]
export const products:Product[]=[
 {id:'coat',slug:'architectural-wool-overcoat',name:'Architectural Wool Overcoat',category:'Outerwear',price:2100,image:img(collectionImages,0),detail:'Virgin wool blend · Structured dropped shoulders',colors:['#171717','#b8a77e'],sizes:['XS','S','M','L'],badge:'New Arrival'},
 {id:'blazer',slug:'structured-silk-lapel-blazer',name:'Structured Silk Lapel Blazer',category:'Tailoring',price:1450,image:img(collectionImages,1),detail:'Mulberry silk satin trim · Monolithic waistline',colors:['#171717','#c6a15b'],sizes:['XS','S','M','L','XL'],badge:'Bestseller'},
 {id:'knit',slug:'double-faced-cashmere-knit',name:'Double-Faced Cashmere Knit',category:'Knitwear',price:890,image:img(collectionImages,2),detail:'Grade-A Inner Mongolian cashmere · Seamless',colors:['#79685a','#ded6c8'],sizes:['XS','S','M','L']},
 {id:'trousers',slug:'pleated-wide-leg-trousers',name:'Pleated Wide-Leg Trousers',category:'Tailoring',price:680,image:img(collectionImages,3),detail:'High-rise tailored waistband · Extended fluid break',colors:['#b89a6f','#171717'],sizes:['XS','S','M','L'],badge:'Iconic'},
 {id:'trench',slug:'sculpted-leather-trench',name:'Sculpted Leather Trench',category:'Outerwear',price:3200,image:img(collectionImages,4),detail:'Full grain Italian nappa · Hand-stitched storm flap',colors:['#111111'],sizes:['XS','S','M','L'],badge:'Exclusive'},
 {id:'dress',slug:'bias-cut-silk-slip-dress',name:'Bias-Cut Silk Slip Dress',category:'Dresses',price:1150,image:img(collectionImages,5),detail:'22 momme silk charmeuse · Low scoop backline',colors:['#d6c7ad','#171717'],sizes:['XS','S','M','L']},
 {id:'boots',slug:'minimalist-calfskin-chelsea-boot',name:'Minimalist Calfskin Chelsea Boot',category:'Footwear',price:950,image:img(collectionImages,6),detail:'Blake welted leather sole · Angular beveled heel',colors:['#111111'],sizes:['36','37','38','39','40','41']},
 {id:'bag',slug:'gold-accent-leather-crossbody',name:'Gold Accent Leather Crossbody',category:'Accessories',price:1280,image:img(collectionImages,7),detail:'Brushed 24k gold hardware · Dual compartment',colors:['#111111'],sizes:['ONE SIZE']},
 {id:'shirt',slug:'georgette-sheer-silk-shirt',name:'Georgette Sheer Silk Shirt',category:'Dresses',price:590,image:img(homeImages,5),detail:'Lightweight silk georgette · Refined proportions',colors:['#181818','#e7dfd1'],sizes:['XS','S','M','L']},
 {id:'skirt',slug:'silk-gown',name:'Silk Gown',category:'Dresses',price:980,image:img(homeImages,6),detail:'Fluid silk satin · Sculptural evening silhouette',colors:['#111111'],sizes:['XS','S','M','L']},
 {id:'tote',slug:'calfskin-minimal-tote',name:'Calfskin Minimal Tote',category:'Accessories',price:1850,image:img(homeImages,7),detail:'Soft calfskin · Architectural volume',colors:['#111111'],sizes:['ONE SIZE']},
 {id:'belt',slug:'sculpted-geometric-brass-belt',name:'Sculpted Geometric Brass Belt',category:'Accessories',price:450,image:img(pdpImages,7),detail:'Hand-finished brass buckle · Italian calfskin',colors:['#111111'],sizes:['S','M','L']},
]
export const productBySlug=(slug:string)=>products.find(p=>p.slug===slug)||products[1]
export const money=(n:number)=>`$${n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`

export const colorLabel=(hex:string)=>({ '#171717':'Noir', '#111111':'Noir', '#181818':'Noir', '#b8a77e':'Sand', '#b89a6f':'Camel', '#c6a15b':'Atelier Gold', '#79685a':'Cocoa', '#ded6c8':'Ivory', '#d6c7ad':'Champagne', '#e7dfd1':'Ecru' } as Record<string,string>)[hex.toLowerCase()]||`Shade ${hex.toUpperCase()}`
