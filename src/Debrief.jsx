import React, { useState } from 'react'
import { useGlobalContext } from "./context";

import { data, link } from './db';



function Debrief() {

  const {
    setCards,
    cards,
  } = useGlobalContext()
  console.log("data = ", cards);               
  return (
    <main className='min-h-screen  flex flex-col space-y-6 items-center justify-center"'>
      <div className='  w-full flex items-center justify-center px-4 py-7 space-x-3'>
        <label htmlFor="new" className="btn  bg-green-700">New Debrief</label>
      </div>
      <div className='  w-full flex items-center justify-center max-h-[1000px]  max-w-4xl  overflow-y-auto scro flex-wrap px-4 py-7   space-x-3 space-y-3 m-2'>
        {cards.map((item) => <Card key={item.id} link={item.link} desc={item.desc} det={item.det} prompt={item.prompt} />)}

      </div>

    </main>
  )
}

const Card = (prop) => {
  const {
    loading,
    loading4read,
    loading4listen,
    ReadSumbit,
    listen,
    fetchApi4Listen,
    audio,
  } = useGlobalContext()
  console.log("audio = ", audio);
  return (
    <>
      <Read />
      <FormModal />
      <div className="card w-96 bg-base-100 shadow-xl">

        <figure className='w-full h-96'><img className='' src={prop.link} alt="clasico" /></figure>
        <div className="card-body">
          <h2 className="card-title">{prop.desc}</h2>
          <p>{prop.det}</p>
          <div className="card-actions justify-end">
            {/* {loading4listen && <audio controls>
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>} */}
            {listen ?
              loading4listen ? <button className="btn bg-green-700">
                <svg aria-hidden="true" className="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                Listen
              </button> : <button onClick={fetchApi4Listen} className="btn bg-green-700">Listen</button> : ""}

            {loading4read ? <button className="btn bg-green-700">
              <svg aria-hidden="true" className="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              Read
            </button> : <button onClick={() => {
              ReadSumbit(prop.prompt)
            }} className="btn bg-green-700"> Read</button>}

          </div>
        </div>
      </div>
    </>
  )
}


export function FormModal() {
  const {
    setCards
  } = useGlobalContext()

  return (
    <div>
      <input type="checkbox" id="new" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-slate-300">
          <label htmlFor="new" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

          <div className="justify-center flex items-center   w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCards((prev) => {
                  return [
                    ...prev,
                    {
                      id: prev.length + 1,
                      det: e.target.title.value,
                      link: link,
                      des: e.target.title.value,
                      prompt: e.target.prompt.value,
                    },
                  ];
                });
              }
              }
              className=" p-5 md:p-8 max-w-[500px] space-y-8   w-11/12 "
            >
              <h2 className="text-3xl font-medium">Generate Debrief</h2>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-medium" htmlFor="title">
                 Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
                  // value={quiz.amount}
                  // onChange={handleChange}
                  // min={2}
                  // max={6}
                  required
                />
              </div>
             
          
              <div className="flex flex-col space-y-2">
                <label className="text-gray-600 font-medium" htmlFor="Prompt">
                  Prompt
                </label>
                <textarea
                  id="prompt"
                  name="prompt"
                  className="bg-gray-200 p-2 rounded-md outline-0 focus:bg-gray-300"
                  // value={quiz.type}
                  // onChange={handleChange}
                  maxLength={10118} 
                  required

                />
              </div>
           
              <button
                type="submit"
                className=" bg-green-700 rounde-md w-full p-2 text-white hover:bg-yellow-500"
              >
                ADD
              </button>
            </form>
          </div>
          <div className="modal-action">
            <label htmlFor="new" className="btn ">Close</label>
          </div>
        </div>
      </div>
    </div>

  )
}

export function Read() {
  const {
    resume,
    loading4read,
    read,
    setRead
  } = useGlobalContext()

  return (
    <div>
      <input type="checkbox" onChange={e => { }} id="my-modal" className="modal-toggle" checked={read} />
      <div className="modal">
        <div className="modal-box relative bg-slate-300">
          <button onClick={() => setRead(false)} className="btn btn-sm btn-circle absolute bg-green-700 right-2 top-2">✕</button>

          {loading4read ? <svg aria-hidden="true" className="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            :
            <p className="py-4">{resume}</p>}
          <div className="modal-action">
            <button onClick={() => setRead(false)} className="btn bg-green-700">Close</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export function Listen() {
  const {
    resume,
    loading4read,
    read,
    setRead
  } = useGlobalContext()

  return (
    <div>
      <input type="checkbox" onChange={e => { }} id="my-modal" className="modal-toggle" checked={read} />
      <div className="modal">
        <div className="modal-box relative bg-slate-300">
          <button onClick={() => setRead(false)} className="btn btn-sm btn-circle absolute bg-green-700 right-2 top-2">✕</button>

          {loading4read ? <svg aria-hidden="true" className="w-5 h-5 mr-2  text-gray-600 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            :
            <p className="py-4">{resume}</p>}
          <div className="modal-action">
            <button onClick={() => setRead(false)} className="btn bg-green-700">Close</button>
          </div>
        </div>
      </div>
    </div>

  )
}
export default Debrief