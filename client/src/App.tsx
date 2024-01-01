import { useState, useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Editor } from '@tinymce/tinymce-react'
import './App.css'
import NavBar from './components/NavBar.tsx'

function App() {
  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <>
    <header>
      <NavBar />
    </header>
    <main>
      <div className='p-6'>
        <h1>Hello World!</h1>
        <Editor
      apiKey= {import.meta.env.VITE_TINY_MCE_KEY}
      init={{
        plugins: 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        // ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
      initialValue="Welcome to TinyMCE!"
    />
        
      </div>
    </main>
    </>
  )
}

export default App
