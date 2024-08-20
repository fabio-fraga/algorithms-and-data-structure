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
import { PingForm } from './ping-form'

export function PingDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Disparar ping</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] space-y-1">
          <DialogHeader>
            <DialogTitle className="text-center my-5">Ping</DialogTitle>
            <DialogDescription>
              Preencha o IP de destino.
            </DialogDescription>
          </DialogHeader>
          <PingForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Disparar ping</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left space-y-4 my-4">
          <DrawerTitle className="text-center">Ping</DrawerTitle>
          <DrawerDescription>
            Preencha o IP de destino.
          </DrawerDescription>
        </DrawerHeader>
        <PingForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
