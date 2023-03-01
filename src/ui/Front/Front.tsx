import { Product } from "../../domain/product";
import { useStore } from "../../services/store";
import { Cookie } from "../Cookie";
import styles from "./Front.module.css";
import * as ReactDOM from 'react-dom';
import { useState } from 'react'

export function Front() {
  const { cookies } = useStore();
  
  const doDelete = async () => {
    let res = await _confirm.delete({ Template: ModalDeleteCookie })
    alert(res)
  }
  return (
    <main>
      <h1>Cookies</h1>
      <button onClick={doDelete}>Delete</button>
      <ul className={styles.list}>
        {cookies.map((cookie: Product) => (
          <li key={cookie.id}>
            <Cookie cookie={cookie} />
          </li>
        ))}
      </ul>
    </main>
  );
}





// TODO CORE_JS HERE
export const _confirm = {
  delete: async (options: any = {}) => {
    return await showModal(options)
  },
  alert: async () => {}
}

export const showModal = async (Options: any = {}) => {
  const _id = "___modal"
  let container = document.createElement("div")
  container.id = _id
  document.body.appendChild(container)
  return new Promise((resolve) => {
    const doResolve = (res: any) => {
      document.getElementById(_id)?.remove()
      resolve(res)
    }
    const PortalContent = <Options.Template {...Options.props} resolve={doResolve} />
    ReactDOM.render(ReactDOM.createPortal(PortalContent, container), document.createElement("div"));
  })

}

// TODO: MULTIPLE UI MODALS HERE
const ModalDeleteCookie = (props: any) => {
  const [loading, setLoading] = useState(false);
  const deleteApi = async () => {
    setLoading(true)
    setTimeout(() => {
      props.resolve("Deleted")
      setLoading(false)
    }, 4000)
  }
  return (
    <div className="modal_parent">
      <div className="modal_body">
        <button onClick={() => props.resolve("Cancel delete")}>Cancel</button>
        <button onClick={() => deleteApi()}>
          {loading ? 'Waiting for delete...' : 'Accept'}
        </button>
      </div>
    </div>
  )
}


