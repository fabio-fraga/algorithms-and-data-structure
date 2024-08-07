'use client';

import { AddRouterDialog } from '@/components/add-router-dialog';
import { RouterDevice } from '@/types';
import { Delete, Router } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  function removeRouter(index: number) {
    const routersAfterRemoveItem = [...routers.slice(0, index), ...routers.slice(index + 1)]

    localStorage.setItem('routers', JSON.stringify(routersAfterRemoveItem))

    setRouters(routersAfterRemoveItem)
  }

  const [routers, setRouters] = useState<RouterDevice[]>([]);

  useEffect(() => {
    localStorage.getItem('routers') || localStorage.setItem('routers', JSON.stringify([
      {
        name: 'Router 1',
        ip_address: '192.168.0.254',
        mask: '255.255.255.0',
        hosts: [
          {
            name: 'Host 1',
            ip_address: '192.168.0.1'
          },
        ],
      } as RouterDevice,
      {
        name: 'Router 2',
        ip_address: '192.168.1.254',
        mask: '255.255.255.0',
        hosts: [
          {
            name: 'Host 2',
            ip_address: '192.168.1.1'
          },
        ],
      } as RouterDevice,
    ]));

    const routers = JSON.parse(localStorage.getItem('routers') as string);

    setRouters(routers);
  }, []);

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
            <div key={index} className="relative">
              <button
                className="absolute top-0 right-0"
                onClick={() => removeRouter(index)}
              >
                <Delete className="text-red-800" />
              </button>
              <Link key={index} href={`/router/${index}`}>
                <div className="flex flex-col justify-center items-center">
                  <div className="rounded-full p-3">
                    <Router />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{router.name}</h3>
                  <p className="text-muted-foreground text-sm text-center">IP: {router.ip_address}</p>
                  <p className="text-muted-foreground text-sm text-center">Máscara: {router.mask}</p>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
