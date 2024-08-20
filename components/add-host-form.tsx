'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { FormEvent, useState, useEffect } from 'react'
import { HostDevice, RouterDevice } from '@/types'

type AddHostFormProps = {
  className?: string;
  setHosts: React.Dispatch<React.SetStateAction<HostDevice[]>>;
  routerIndex: number;
}

export function AddHostForm({ setHosts, routerIndex, ...props }: AddHostFormProps) {
  const [routers, setRouters] = useState<RouterDevice[]>([]);
  const [router, setRouter] = useState<RouterDevice | null>(null);

  const [formData, setFormData] = useState<HostDevice>({
    name: '',
    ip_address: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedRouters = JSON.parse(localStorage.getItem('routers') as string) as RouterDevice[];
    setRouters(storedRouters);
    setRouter(storedRouters[routerIndex]);
  }, [routerIndex]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.name || !formData.ip_address) {
      setError('Preencha todos os campos.');
      return;
    }

    const ipv4Pattern = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/;

    if (!ipv4Pattern.test(formData.ip_address)) {
      setError('Endereço IPV4 inválido');
      return;
    }

    if (formData.ip_address.split('.')[3] === '0') {
      setError('Endereço IPV4 inválido');
      return;
    }

    if (router?.name === formData.name) {
      setError('Já existe um dispositivo com esse nome.');
      return;
    }

    if (router?.ip_address.split('.').slice(0, 3).join('.') !== formData.ip_address.split('.').slice(0, 3).join('.')) {
      setError('O dispositivo deve estar na mesma rede do roteador.');
      return;
    }

    const updatedRouters = [...routers];
    updatedRouters[routerIndex].hosts.push(formData);
    localStorage.setItem('routers', JSON.stringify(updatedRouters));

    setHosts((prevHosts) => [...prevHosts, formData]);
    setRouters(updatedRouters);

    setError('');
    setFormData({
      name: '',
      ip_address: '',
    });

    setSuccess('Host adicionado com sucesso!');
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
          placeholder="Host X"
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setError('');
          }}
        />
      </div>
      <div className="grid gap-2 space-y-2">
        <Label htmlFor="gateway">
          Gateway <span className="text-red-500">*</span>
        </Label>
        <Input
          type="text"
          name="gateway"
          value={router?.ip_address || ''}
          disabled
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
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {success && <p className="text-green-500 text-xs">{success}</p>}
      <Button type="submit" disabled={!!success}>Salvar</Button>
    </form>
  )
}
