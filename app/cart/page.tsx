import {CartPage} from '@/components/store'
export default function Page(){return <CartPage whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||''}/> }
