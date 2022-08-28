import React, {useState, useEffect} from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { getSimilarPosts, getRecentPosts } from '../services'

/* TARJETA FLOTANTE PARA MOSTRAR LOS POSTS RECIENTES O RELACIONADOS (dependiendo de donde se encuentre el usuario) */

const PostAdrift = ({categories, slug}) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(()=>{
    if(slug){
      getSimilarPosts(categories, slug)
        .then((result)=>setRelatedPosts(result))
    } else {
      getRecentPosts()
        .then((result)=>setRelatedPosts(result))
    }
  }, [slug])
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {slug ? 'También puede interesarte...' : 'Publicado recientemente...'}
      </h3>
      {
        relatedPosts.map((post) => (
          <a key={post.title} href={`/post/${post.slug}`}>
          <div className='flex items-center w-full mb-4 hover:shadow-lg transition-shadow rounded-lg pl-2 py-2' key={post.title} href={`/post/${post.slug}`}>
              <div className='w-20 h-16 flex-none mr-3'>
                <img
                  src={post.thumbnail.url}
                  alt={post.title}
                  className='w-full h-full align-middle rounded-full'
                />
              </div>
              <div>
                <p className='text-fuchsia-600'>
                  {moment(post.createdAt).format('DD MMM YYYY')}
                </p>
                <h5>
                  {post.title}
                  </h5>
              </div> 
          </div>
          </a>
        ))}
    </div>
  )
}

export default PostAdrift