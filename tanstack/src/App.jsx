import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {useQuery, useMutation} from '@tanstack/react-query'


const POSTS=[
{id:1, title:"post 1"},
{id:2, title:"post 2"},
]

function wait(durration){


  return new Promise(resolve=>setTimeout(resolve, durration))
}


function App() {

  console.log(POSTS);

  const postsQuery=useQuery({
    querKey:['posts'],
    queryFn:()=>wait(1000).then(()=>[...POSTS])
  })

  const newPostMutation=useMutation({
    mutationFn:title=>{
     return wait(1000).then(()=>POSTS.push({id:crypto.randomUUID(),title}))
    }
  }
  )

  if (postsQuery.isLoading) return <h1>Loading...</h1>


  return(
    <>
      {postsQuery.data.map(post=><div key={post.id}>{post.title}</div>)}

      <button onClick={()=>newPostMutation.mutate('new post')}>Add post</button>
    </>
  )
}

export default App
