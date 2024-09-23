'use client'

import { logout } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { IcRoundLogout } from '@/components/svg/logout'
import { useState } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function LogoutBtn() {
  const [loading, setLoading] = useState<boolean>(false)

  const logoutHandler = () => {
    setLoading(true)

    logout().finally(() => {
      setLoading(false)
    })
  }

  return (
    <div className="flex">
      <Button disabled={loading} onClick={logoutHandler}>
        {loading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <IcRoundLogout />
        )}
        登出
      </Button>
    </div>
  )
}
