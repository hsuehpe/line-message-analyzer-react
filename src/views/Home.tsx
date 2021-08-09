import React, { useRef } from 'react'

export default function Home() {
  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;;

  const handleUploadFile = () => {
    if (inputEl.current) inputEl.current.click();
  }

  const onChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLFormElement;
    if (target && target.files.length > 0) {
      const file = target.files[0];
      const fr = new FileReader();
      fr.onload = function(e: ProgressEvent<FileReader>) {
        if (e.target) {
          console.log(e.target.result);
        }
      }
      fr.readAsText(file);
    }
  }

  return (
    <div>
      <div className="upload">
        <div className="btn" onClick={ handleUploadFile }>載入聊天</div>
        <input ref={ inputEl } type="file" name="file" id="file" style={{ display: 'none' }} onChange={ onChange } />
      </div>
    </div>
  )
}