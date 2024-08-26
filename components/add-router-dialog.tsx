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
import { AddRouterForm } from './add-router-form'
import { RouterDevice } from '@/types'

type AddRouterDialogProps = {
  setRouters: React.Dispatch<React.SetStateAction<RouterDevice[]>>
}

export function AddRouterDialog({ setRouters }: AddRouterDialogProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Adicionar Roteador</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] space-y-1">
          <DialogHeader>
            <DialogTitle className="text-center my-5">Novo Roteador</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo.
            </DialogDescription>
          </DialogHeader>
          <AddRouterForm setRouters={setRouters}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Adicionar Roteador</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left space-y-4 my-4">
          <DrawerTitle className="text-center">Novo Roteador</DrawerTitle>
          <DrawerDescription>
            Preencha os campos abaixo.
          </DrawerDescription>
        </DrawerHeader>
        <AddRouterForm className="px-4" setRouters={setRouters} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
