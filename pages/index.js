import {useEffect, useState} from 'react'

import axios from 'axios'

import Loading from '../components/loading'

export default function Home() {
  
  const [contents, setContents] = useState(null)

  useEffect(() => {
    axios.get('/api/get-contents', {
      params: {
        id: 21
      }
    })
    .then(res => {
      setContents(res.data)
    })
  }, [])

  if (contents) {
    if (contents.object === "error") {
      return (
        <div className="container mx-auto px-6">
          <div 
            className="flex justify-center items-center"
            style={{
              height: "calc(100vh - 188px)"
            }}
          >
            {contents.message}
          </div>
        </div>
      )
    } else {
      if (contents.attributes) {
        return (
          <div className="container mx-auto px-6">
            <h1 className="text-gray-700 text-2xl font-medium">{contents.attributes.headline.value}</h1>
            <div dangerouslySetInnerHTML={{ __html: contents.attributes.content.value }} />
          </div>
        )
      } else {
        return (
          <div className="container mx-auto px-6">
            <div 
              className="flex justify-center items-center"
              style={{
                height: "calc(100vh - 188px)"
              }}
            >
              NO DATA
            </div>
          </div>
        )
      }
    }
  } else {
    return (
      <Loading/>
    )
  }

}
