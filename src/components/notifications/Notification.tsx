import { useRef } from 'react'
import { BsCheckCircleFill, BsXCircleFill, BsInfoCircleFill, BsX } from 'react-icons/bs'
import { IoMdWarning } from 'react-icons/io'
import { useToasts } from '../../hooks/useToasts'
import { Toast } from '../../types'

export default function Notification({toast}: {toast: Toast}){
  const toastRef = useRef<HTMLLIElement>(null)
  const { deleteNotification } = useToasts()
  
  const deleteNoti = () => {
    deleteNotification(toast.id)
  }

  
  return (
    <li key={toast.id} ref={toastRef} className={`toast toast-${toast.type}`}>
      <div className='toast_column'>
        {toast.type == 'success' ? <BsCheckCircleFill className='toast_column-icon' /> : toast.type == 'warning' ? <IoMdWarning className='toast_column-icon' /> : toast.type == 'error' ? <BsXCircleFill className='toast_column-icon' /> : <BsInfoCircleFill className='toast_column-icon' />}
        <span className='toast_column-content'>{toast.content}</span>
      </div>
      <BsX className='toast-close' onClick={deleteNoti} />
      <div style={{animationDuration: `${(toast.time ? toast.time/1000 : 0)}s`}} className='toast-line'></div>
    </li>
  )
}