'use client'

import { AddHostDialog } from "@/components/add-host-dialog";
import { PingDialog } from "@/components/ping-dialog";
import { HostDevice, RouterDevice } from "@/types"
import { ArrowLeft, Delete, MonitorSmartphone } from 'lucide-react';
import Link from "next/link";
import { useState } from "react";

export default function RouterPage({ params }: { params: { slug: string[] }}) {
  const routers = JSON.parse(localStorage.getItem('routers') as string) as RouterDevice[]
  const router = routers[parseInt(params.slug[0])]

  function removeHost(index: number) {
    const hostsAfterRemoveItem = [...router.hosts.slice(0, index), ...router.hosts.slice(index + 1)]

    router.hosts = hostsAfterRemoveItem

    routers[parseInt(params.slug[0])] = router

    localStorage.setItem('routers', JSON.stringify(routers))

    setHosts(router.hosts)
  }

  const [hosts, setHosts] = useState<HostDevice[]>(router.hosts as HostDevice[]);

  return (
    <div className="flex flex-col justify-center items-center w-full relative">
      <Link href={'/'}>
        <button className="absolute top-0 left-0 mt-4 px-4">
          <ArrowLeft />
        </button>
      </Link>
      <h1 className="text-2xl my-4 mx-8 font-semibold text-center">Simulador de Tráfego de Pacotes em Redes</h1>
      <p className="text-md mx-8 font-semibold text-center">{router.name}</p>
      <p className="text-sm mx-8 text-center">IP: {router.ip_address}</p>
      <p className="text-sm mx-8 text-center">Máscara: {router.mask}</p>
      <div className="flex flex-wrap justify-between my-4 px-4 w-full">
        <h2 className="font-semibold text-2xl">Dispositivos</h2>
        <AddHostDialog setHosts={setHosts} routerIndex={parseInt(params.slug[0])} />
      </div>
      <div className="flex flex-wrap justify-center items-center w-full gap-4 my-4">
        {hosts.length == 0
          ?
          <div className="flex flex-col justify-center items-center w-full">
            <MonitorSmartphone size={64} />
            <p className="text-center my-2">Nenhum dispositivo cadastrado.</p>
          </div>
          :
          hosts.map((host, index) => (
            <div key={index} className="relative">
              <button
                className="absolute top-0 right-0"
                onClick={() => removeHost(index)}
              >
                <Delete className="text-red-800" />
              </button>
              <div key={index} className="flex flex-col justify-center items-center">
              <div className={`rounded-full p-3 ${host.ip_address == params.slug[1] ? 'text-green-700 animate-bounce' : ''}`}>
              <MonitorSmartphone />
                </div>
                <h3 className="text-lg font-semibold mb-2">{host.name}</h3>
                <p className="text-muted-foreground text-sm text-center">IP: {host.ip_address}</p>
              </div>
              <PingDialog />
            </div>
          ))
        }
      </div>
    </div>
  )
}