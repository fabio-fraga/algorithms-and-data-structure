type HostDevice = {
  name: string;
  ip_address: string;
}

type RouterDevice = {
  name: string;
  ip_address: string;
  mask: string;
  hosts: HostDevice[];
}

export type { HostDevice, RouterDevice };
