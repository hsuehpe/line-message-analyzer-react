import React, { useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import userState from '../store/userState';
import { Member } from '../types';
import { messageActions } from '../constants';

export default function Home() {
  const dateReg = new RegExp("^([0-9]{4})([./]{1})([0-9]{1,2})([./]{1})([0-9]{1,2})");
  const messageReg = new RegExp("^([\u4e00-\u9fa5]{0,2})([0-9]{1,2})[:]{1}([0-9]{1,2})");
  const members = new Map<string, Member>();

  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [user, setUser] = useRecoilState(userState);
  console.log(user);
  // const [lines, setLines] = useState([] as string[]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = () => {
    if (inputEl.current) inputEl.current.click();
  }

  const analyze = (lines: Array<string>) => {
    let totalDays = 0;
    for (let i = 0; i < lines.length; i ++) {
      if (dateReg.test(lines[i].substring(0, 10))) { // date
        totalDays++;
      }

      if (messageReg.test(lines[i].split(/(\s+)/)[0])) { // message
        const name = lines[i].split(/(\s+)/)[2];
        if (name) {
          const isContainsMessageActions = (() => {
            for (let i = 0; i < messageActions.length; i++) {
              if (name.includes(messageActions[i])) return true;
            }
            return false;
          })();

          if (!members.has(name) && !isContainsMessageActions) {
            members.set(name, {
              totalMessages: 0,
              totalStickers: 0,
              totalPhotos: 0,
            });
          }
        }
      }
    }
    console.log(members);
  };

  const onChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLFormElement;
    if (target && target.files.length > 0) {
      const file = target.files[0];
      const fr = new FileReader();
      inputEl.current.value = '';
      fr.onload = function(e: ProgressEvent<FileReader>) {
        if (e.target) {
          const result = e.target.result as string
          analyze(result.split('\n'));
        }
      }

      fr.onloadstart = function() {
        setIsLoading(true);
      }

      fr.onloadend = function() {
        setIsLoading(false);
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
      <div style={ { display: isLoading ? 'block' : 'none' } }>Loading ...</div>
    </div>
  )
}
