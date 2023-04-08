import "./purchases.css"

import {useState, useEffect} from 'react'
import { Purchase } from '../../types'
import { PurchaseCard } from './PurchaseCard'
import { endPoint } from "../../utils/config"
import Loader from "../shared/loading/Locader"
import { getLocalData } from "../../utils"

const localData = getLocalData()

export const PurchasesScreen = ()=> {
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [loader, setLoader] = useState(true)

  useEffect(()=> {
    if(localData){
      fetch(endPoint+"purchases", {
        method: 'GET',  
        headers: {
          Authorization: `Bearer ${localData.user.token}`
        }
      }).then(prom=> prom.json()).then(res=> {
        setLoader(false)
        setPurchases(res)
      }).catch(err=> err)
    }
  }, [])


  return (
    <section className="purchases">
      <h2 className='purchases-title'>My purchases {purchases.length}</h2>
      <div className="purchases-elements">
        {loader ?
          <Loader /> :
          (purchases.length ? purchases.map(purchase=> <PurchaseCard key={purchase.id} purchase={purchase} />) : <i>There no purchases</i>)
        }
      </div>
    </section>
  )
}