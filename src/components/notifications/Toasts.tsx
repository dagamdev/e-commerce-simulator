import './toasts.css'

import Notification from './Notification'
import { useToasts } from '../../hooks/useToasts'

export default function Toasts() {
  const { notifications } = useToasts()
  
  return (
    <ul className='toasts'>
      {[...notifications].reverse().map(t=> <Notification key={t.id} toast={t} />)}
    </ul>
  )
}