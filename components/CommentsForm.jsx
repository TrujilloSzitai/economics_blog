import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";
import $ from 'jquery'
import 'animate.css';

/* FORMULARIO PARA PUBLICAR COMENTARIOS */

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const commentContent = useRef();
  const commentName = useRef();
  const commentEmail = useRef();
  const storeDataCheckbox = useRef();

  useEffect(()=>{
    commentName.current.value = window.localStorage.getItem('name');
    commentEmail.current.value = window.localStorage.getItem('email')
  }, [])

  const submitCommentValidation = () => {
    setError(false);
    const { value: comment } = commentContent.current;
    const { value: name } = commentName.current;
    const { value: email } = commentEmail.current;
    const { checked: storeData } = storeDataCheckbox.current

    if(!comment || !name || !email){
      setError(true);
      return;
    }

    const commentData = { name, email, comment, slug }

    if(storeData){
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email)
    } else {
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('email')
    }

    submitComment(commentData)
      .then((res)=>{
        setSuccessMessage(true);
        setTimeout(()=>{
          $('#successMessage').removeClass('animate__fadeInUp')
          $('#successMessage').addClass('animate__fadeOutDown')
        }, 5000)

        setTimeout(()=>{
          setSuccessMessage(false);
        }, 6000)
      })
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">¡Deja un comentario!</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentContent}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:rig-gray-200 bg-gray-100 text-gray-700"
          placeholder="Escribe tu comentario..."
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={commentName}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:rig-gray-200 bg-gray-100 text-gray-700"
          placeholder="Nombre..."
          name="name"
          autoComplete="off"
        />
        <input
          type="email"
          ref={commentEmail}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:rig-gray-200 bg-gray-100 text-gray-700"
          placeholder="Email..."
          name="email"
          autoComplete="off"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input ref={storeDataCheckbox} type='checkbox' id='storeData' name='storeData' />
          <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Recordar mi correo electrónico</label>
        </div>
      </div>
      {error && <p>Se requiere completar todos los campos.</p>}
      <div className="mt-8">
        <button 
        className="transition duration-500 ease hover:bg-indigo-900 inline-block rounded-full bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer" 
        type="button" 
        onClick={submitCommentValidation}
        >
          Publicar comentario
        </button>
        {successMessage && <span className={'text-xl float-right font-semibold mt-3 text-green-500 animate__animated animate__fadeInUp'}
        id='successMessage'
        >Comentario enviado para su revisión</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
