'use client'

import { AddRouterDialog } from '@/components/add-router-dialog'
import { PingDialog } from '@/components/ping-dialog'
import { RouterDevice } from '@/types'
import { Delete, Router } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Dashboard({ params }: { params?: { slug: string[] } }) {
  function removeRouter(index: number) {
    if (!confirm('Tem certeza? Essa ação não poderá ser desfeita.')) {
      return
    }

    const routersAfterRemoveItem = [...routers.slice(0, index), ...routers.slice(index + 1)]

    localStorage.setItem('routers', JSON.stringify(routersAfterRemoveItem))

    setRouters(routersAfterRemoveItem)
  }

  const [routers, setRouters] = useState<RouterDevice[]>([])

  useEffect(() => {
    localStorage.getItem('routers') || localStorage.setItem('routers', '[]')

    const routers = JSON.parse(localStorage.getItem('routers') as string)

    setRouters(routers)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-2xl my-4 font-semibold text-center">Simulador de Tráfego de Pacotes em Redes</h1>
      <div className="flex flex-wrap justify-between my-4 px-4 w-full">
        <h2 className="font-semibold text-2xl">Roteadores</h2>
        <AddRouterDialog setRouters={setRouters} />
      </div>
      <div className="flex flex-wrap justify-center items-center w-full gap-4 my-4">
        {routers.length == 0
          ?
          <div className="flex flex-col justify-center items-center w-full">
            <Router size={64} />
            <p className="text-center my-2">Nenhum roteador cadastrado.</p>
          </div>
          :
          routers.map((router, index) => (
            <div key={index} className="relative flex flex-col justify-center">
              <button
                className="absolute top-0 right-0"
                onClick={() => removeRouter(index)}
              >
                <Delete className="text-red-800" />
              </button>
              <Link key={index} href={`/router/${index}/${params?.slug && router.ip_address != params?.slug[0] && router.ip_address.split('.').slice(0, 3).join('.') == params?.slug[0].split('.').slice(0, 3).join('.') ? params.slug[0] : ''}`}>
                <div className="flex flex-col justify-center items-center">
                  <div className={`rounded-full p-3 ${params?.slug && router.ip_address.split('.').slice(0, 3).join('.') == params?.slug[0].split('.').slice(0, 3).join('.') ? 'text-green-700 animate-bounce' : ''}`}>
                    <Router />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{router.name}</h3>
                  <p className="text-muted-foreground text-sm text-center">IP: {router.ip_address}</p>
                  <p className="text-muted-foreground text-sm text-center">Máscara: {router.mask}</p>
                </div>
              </Link>
              <PingDialog />
            </div>
          ))
        }
      </div>
    </div>
  )
}
