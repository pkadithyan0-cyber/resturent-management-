import {Detail} from '@/components/store'
export default function Page({params}:{params:{slug:string}}){return <Detail slug={params.slug}/> }
