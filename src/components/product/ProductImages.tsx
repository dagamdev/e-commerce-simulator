import { MouseEvent, useState, useRef } from 'react'
import { Product } from '../../types'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

export const ProductImages = ({product}: {product: Product|undefined})=> {
  const button1 = useRef<HTMLButtonElement|null>(null)
  const button2 = useRef<HTMLButtonElement|null>(null)
  const [imagen, setImagen] = useState(0)
  
  function previusImg({currentTarget: {classList}}: MouseEvent<HTMLElement>){
    if(imagen == 1) classList.remove("btn-active")
    if(imagen >= 1) button2.current?.classList.add("btn-active")
    setImagen(imagen-1)
    let value = imagen==1 ? 0 : -33.3333*(imagen-1)
    document.querySelector(".images_list")?.setAttribute("style", `transform: translateX(${value}%)`)
    document.querySelectorAll(".images_preview-img").forEach((doc, i)=> {
      if(i==imagen-1){
        doc.classList.add("preview-img-selected")
      }else{
        doc.classList.remove("preview-img-selected")
      }
    })
  }

  function nextImg({currentTarget: {classList}}: MouseEvent<HTMLElement>){
    if(imagen == 1) classList.remove("btn-active")
    if(imagen >= 0) button1.current?.classList.add("btn-active")
    setImagen(imagen+1)
    let value = -33.3333*(imagen+1)
    document.querySelector(".images_list")?.setAttribute("style", `transform: translateX(${value}%)`)
    document.querySelectorAll(".images_preview-img").forEach((doc, i)=> {
      if(i==imagen+1){
        doc.classList.add("preview-img-selected")
      }else{
        doc.classList.remove("preview-img-selected")
      }
    })
  }

  function selectPreviewImg({currentTarget}: MouseEvent<HTMLElement>){
    if(!currentTarget.classList.contains("preview-img-selected")){
      const indice = currentTarget.dataset.id ? parseInt(currentTarget.dataset.id) : 0
      currentTarget.classList.add("preview-img-selected")
      document.querySelectorAll(".images_preview-img").forEach((doc, i)=> {
        if(i==indice){
          doc.classList.add("preview-img-selected")
        }else{
          doc.classList.remove("preview-img-selected")
        }
      })
      document.querySelector(".images_list")?.setAttribute("style", `transform: translateX(${-33.3333*(indice)}%)`)
      setImagen(indice)
      indice>=1 ? button1.current?.classList.add("btn-active") : button1.current?.classList.remove("btn-active")
      indice<=1 ? button2.current?.classList.add("btn-active") : button2.current?.classList.remove("btn-active")
    }
  }

  // console.log(imagen)
  
  return (
    <div className="product_images">
      <div className="product_images-gallery">
        <div className="product_images-div">
          <button onClick={previusImg} ref={button1} className='gallery-btn'><BiChevronLeft /></button>
        </div>
        <div className="product_images-div">
          <button onClick={nextImg} ref={button2} className='gallery-btn btn-active'><BiChevronRight /></button>
        </div>
        <ul id='images_list' className='images_list'>
          {product?.images.map((m, i)=> <li className='images_list-img' key={m.id}><img src={m.url} alt={`Image-${i}`} /></li>)}
        </ul>
      </div>
      <ul className="images_preview">
        {product?.images.map((m, i)=> <li onClick={selectPreviewImg} className={i==0 ? "images_preview-img preview-img-selected" : "images_preview-img"} data-id={i} key={m.id}><img src={m.url} alt={`Image-${i}`} /></li>)}
      </ul>
    </div>
  )
}