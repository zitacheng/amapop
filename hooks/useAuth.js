import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectCurrentToken } from '../slices/authslice'

export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => ({ user }), [user])
}

export const useToken = () => {
  const token = useSelector(selectCurrentToken)

  return useMemo(() => ({ token }), [token])
}