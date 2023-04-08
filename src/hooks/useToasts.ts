import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { Toast } from "../types";
import { createToast, deleteToast } from "../store/slices/toasts.slice";


export function useToasts() {
  const dispatch: AppDispatch = useDispatch()
  const notifications: Toast[] = useSelector((state: RootState)=> state.toasts)

  const createNotification = (data: { 
    type: Toast['type'],
    time?: number,
    content: string,
  }) => {
    const defaultTime = 10000
    const notification = {
      id: (Math.floor(Math.random()*8888)+1111)+'',
      time: data.time || defaultTime,
      ...data
    }
    if(notifications.some(s=> s.content == data.content)) return
    dispatch(createToast(notification))

    // console.log({notification})
    const condition = data.time != undefined ? data.time : true
    
    if(condition){
      setTimeout(()=> {
        dispatch(deleteToast(notification.id))
      }, data.time || defaultTime)
    }
  }

  function deleteNotification(notificationId: string) {
    dispatch(deleteToast(notificationId))
  }

  return {
    notifications,
    createNotification,
    deleteNotification
  }
}