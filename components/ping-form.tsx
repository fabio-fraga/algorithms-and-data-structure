'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useState } from 'react'
import { RouterDevice } from '@/types'
import { useRouter } from 'next/navigation'

type AddRouterFormProps = {
  className?: string
}

export function PingForm({ ...props }: AddRouterFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    ip_address: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()    

    if (!formData.ip_address) {
      setError('Preencha todos os campos.')

      return
    }

    const ipv4Pattern = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/

    if (!ipv4Pattern.test(formData.ip_address)) {
      setError('Endereço IPV4 inválido')

      return
    }

    if (formData.ip_address.split('.')[3] == '0') {
      setError('Endereço IPV4 inválido')

      return
    }

    const routers = JSON.parse(localStorage.getItem('routers') as string)

    if (!routers.some((router: RouterDevice) => {
      if (router.ip_address == formData.ip_address) {
        return true
      }
    
      if (router.hosts.some((host) => host.ip_address == formData.ip_address)) {
        return true
      }
    
      return false
    })) {
      setError('Destino inalcançável.')
    
      return
    }

    setError('')

    setFormData({
      ip_address: '',
    })

    setSuccess('Ping disparado com sucesso! Preparando visualização...')

    setTimeout(() => {
      setSuccess('')

      router.push(`/dashboard/${formData.ip_address}`)
    }, 3000)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('grid items-start gap-4 space-y-4', props.className)}
    >
      <div className="grid gap-2 space-y-2">
        <Label htmlFor="ip_address">
          Endereço IPV4 <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          name="ip_address"
          value={formData.ip_address}
          placeholder="192.168.0.1"
          onChange={(e) => {
            setFormData({ ...formData, ip_address: e.target.value })
            setError('')
          }}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && <p className="text-green-500 text-xs">{success}</p>}
      <Button type="submit" disabled={success ? true : false}>Disparar</Button>
    </form>
  )
}
