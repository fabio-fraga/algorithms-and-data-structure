'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import React, { FormEvent, useState } from 'react'
import { RouterDevice } from '@/types'

const subnetMasks = [
  { cidr: '/8', mask: '255.0.0.0' },
  { cidr: '/9', mask: '255.128.0.0' },
  { cidr: '/10', mask: '255.192.0.0' },
  { cidr: '/11', mask: '255.224.0.0' },
  { cidr: '/12', mask: '255.240.0.0' },
  { cidr: '/13', mask: '255.248.0.0' },
  { cidr: '/14', mask: '255.252.0.0' },
  { cidr: '/15', mask: '255.254.0.0' },
  { cidr: '/16', mask: '255.255.0.0' },
  { cidr: '/17', mask: '255.255.128.0' },
  { cidr: '/18', mask: '255.255.192.0' },
  { cidr: '/19', mask: '255.255.224.0' },
  { cidr: '/20', mask: '255.255.240.0' },
  { cidr: '/21', mask: '255.255.248.0' },
  { cidr: '/22', mask: '255.255.252.0' },
  { cidr: '/23', mask: '255.255.254.0' },
  { cidr: '/24', mask: '255.255.255.0' },
  { cidr: '/25', mask: '255.255.255.128' },
  { cidr: '/26', mask: '255.255.255.192' },
  { cidr: '/27', mask: '255.255.255.224' },
  { cidr: '/28', mask: '255.255.255.240' },
  { cidr: '/29', mask: '255.255.255.248' },
  { cidr: '/30', mask: '255.255.255.252' }
];

type AddRouterFormProps = {
  className?: string;
  setRouters: React.Dispatch<React.SetStateAction<RouterDevice[]>>;
}

export function AddRouterForm({ setRouters, ...props }: AddRouterFormProps) {
  const [formData, setFormData] = useState<RouterDevice>({
    name: '',
    ip_address: '',
    mask: '',
    hosts: [],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();    

    if (!formData.name || !formData.ip_address || !formData.mask) {
      setError('Preencha todos os campos.');

      return;
    }

    const ipv4Pattern = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;

    if (!ipv4Pattern.test(formData.ip_address)) {
      setError('Endereço IPV4 inválido');

      return;
    }

    if (formData.ip_address.split('.')[3] == '0') {
      setError('Endereço IPV4 inválido');

      return;
    }

    const routers = JSON.parse(localStorage.getItem('routers') as string);

    if (routers.some((router: RouterDevice) => {
      const network = router.ip_address.split('.').slice(0, 3).join('.');

      return network === formData.ip_address.split('.').slice(0, 3).join('.')
    })) {
      setError('Já existe um roteador com esse endereço de rede.');

      return;
    }

    if (routers.some((router: RouterDevice) => router.name === formData.name)) {
      setError('Já existe um roteador com esse nome.');

      return;
    }

    localStorage.setItem('routers', JSON.stringify([
      ...JSON.parse(localStorage.getItem('routers') as string),
      formData,
    ]));

    setRouters((prevRouters) => [...prevRouters, formData]);

    setError('');

    setFormData({
      name: '',
      ip_address: '',
      mask: '',
      hosts: []
    })

    setSuccess('Roteador adicionado com sucesso!');

    setTimeout(() => {
      setSuccess('')
    }, 5000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('grid items-start gap-4 space-y-4', props.className)}
    >
      <div className="grid gap-2 space-y-2">
        <Label htmlFor="name">
          Nome <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Router X"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setError('');
          }}
        />
      </div>
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
            setFormData({ ...formData, ip_address: e.target.value });
            setError('');
          }}
        />
      </div>
      <div className="grid gap-2 space-y-2">
        <Label htmlFor="mask">
          Máscara <span className="text-red-500">*</span>
        </Label>
        <Select
          name="mask"
          onValueChange={(value) => {
            setFormData({ ...formData, mask: value });
            setError('');
          }}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecione a máscara" />
          </SelectTrigger>
          <SelectContent>
            {
              subnetMasks.map((mask, index) => (
                <SelectItem key={index} value={mask.mask}>
                  {mask.cidr} - {mask.mask}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && <p className="text-green-500 text-xs">{success}</p>}
      <Button type="submit">Salvar</Button>
    </form>
  )
}
