import * as React from 'react'

export type CartItemType = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export type NavigationItemType = {
  href: string
  label: string
}

export type Category = {
  name: string
  icon: string | React.ReactNode
  color: string
  href?: string
}