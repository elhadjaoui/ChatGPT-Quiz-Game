import React from 'react'
import { useGlobalContext } from "./context";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";



const link = "https://fsb.zobj.net/crop.php?r=SBQWYnlFP-EYhc1ftJbDTYBKOcWnJT_bOZ8G_kykf4BM9VzshJU74AnMxnQt5gyR35qC4BmwWsYDmqqjBGYoyQfGTMBU_awFSpEudVFiehbY-Q8S2X2HjjBeeFnVtNmhUao3QufDaGkzFxmkSCHhV3RI8ItjW6WpHJdSfo6kjf4qOPGP_uoy2Abwu2TE7La-_HsBRcIRW01nwaMR"
const link1 = "https://fsb.zobj.net/crop.php?r=6GIgZ4qoAxejcBX1njBEhuQHCLtp7kaRnC4UjBzIM6LkFXC3HFEVuJ5RTCF2Rzsq6xqPhh5VeeCqnA-HlxBntD0zTXO_hKOYTvAAMyyksL3FgGdo8l5uI8NQsiVsSSKOLZIHEzGqjzJ6V9NEX-VentmjCYwGMm3oxQrI0RCHkodwf6krpFpwLY5EqoAacbG5VDNWNNLH3hfEUmGd"
function Debrief() {
  const {
 
    loading,
   
  } = useGlobalContext();


  if (loading) {
    return <Loading />;
  }
  return (
    <main className='min-h-screen  flex items-center justify-center"'>
      <div className='  w-full flex items-center justify-center px-4 py-7 space-x-3'>
        <Card link={link} desc={"El Clasico Resume"} det={"A resume of the last Clasico"} />
        <Card link={link1} desc={"WC Final Resume"} det={"A resume of the WC Final"} />
      </div>

    </main>
  )
}

const Card = (prop) => {
  const {
    loading,
    loading4read,
  } = useGlobalContext()
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className='w-full h-96'><img className='' src={prop.link} alt="clasico" /></figure>
      <div className="card-body">
        <h2 className="card-title">{prop.desc}</h2>
        <p>{prop.det}</p>
        <div className="card-actions justify-end">
          {loading ? <button className="btn bg-green-700">
            <svg aria-hidden="true" class="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            Listen
          </button> : <button className="btn bg-green-700">Listen</button>}

          {loading4read ? <button className="btn bg-green-700">
            <svg aria-hidden="true" class="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            Read
          </button> : <button className="btn bg-green-700">Read</button>}

        </div>
      </div>
    </div>
  )
}
export default Debrief