import {Detail} from '@/components/store'
import {FashionStoreProvider} from '@/components/FashionStoreProvider'

type PageProps = {
  params: Promise<{slug: string}>
}

export default async function Page({params}: PageProps){
  const {slug} = await params
  return <FashionStoreProvider><Detail slug={slug}/></FashionStoreProvider>
}
