'use client'

import * as React from 'react'

import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { AddHostForm } from './add-host-form'
import { HostDevice } from '@/types'

type AddHostDialogProps = {
  setHosts: React.Dispatch<React.SetStateAction<HostDevice[]>>;
  routerIndex: number;
}

export function AddHostDialog({ setHosts, routerIndex }: AddHostDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Dispositivo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] space-y-1">
          <DialogHeader>
            <DialogTitle className="text-center my-5">Novo Dispositivo</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo.
            </DialogDescription>
          </DialogHeader>
          <AddHostForm setHosts={setHosts} routerIndex={routerIndex}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Adicionar Dispositivo</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left space-y-4 my-4">
          <DrawerTitle className="text-center">Novo Dispositivo</DrawerTitle>
          <DrawerDescription>
            Preencha os campos abaixo.
          </DrawerDescription>
        </DrawerHeader>
        <AddHostForm className="px-4" setHosts={setHosts} routerIndex={routerIndex} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
