import React, { useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import rootState from '../store/rootState';
import { Members, DateMemberMessages } from '../types';
import { messageActions } from '../constants';

export default function Home() {
  const dateReg = new RegExp(/^([0-9]{4})([./]{1})([0-9]{1,2})([./]{1})([0-9]{1,2})（.+）/);
  const messageReg = new RegExp("^([\u4e00-\u9fa5]{0,2})([0-9]{1,2})[:]{1}([0-9]{1,2})");
  const members = {} as Members;
  const dateMemberMessages = {} as DateMemberMessages;

  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [root, setRootState] = useRecoilState(rootState);
  // const [lines, setLines] = useState([] as string[]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = () => {
    if (inputEl.current) inputEl.current.click();
  }

  const isContainsMessageActions = (name: string) => {
    for (let i = 0; i < messageActions.length; i++) {
      if (name.includes(messageActions[i])) return true;
    }
    return false;
  };

  const analyze = (lines: Array<string>) => {
    let totalDays = 0;
    let curDate = '';
    for (let i = 0; i < lines.length; i ++) {
      const linesAry = lines[i].split(/(\s+)/);

      if (dateReg.test(lines[i])) { // date
        curDate = lines[i].split('（')[0];
        dateMemberMessages[curDate] = {};
        totalDays++;
      }

      if (messageReg.test(linesAry[0])) { // message
        const name = linesAry[2];
        const message = linesAry[4];
        if (name) {
          if (!members[name] && !isContainsMessageActions(name)) {
            members[name] = {
              totalMessages: 0,
              totalStickers: 0,
              totalPhotos: 0,
              totalTexts: 0,
            };
          }

          if (!dateMemberMessages[curDate][name]) dateMemberMessages[curDate][name] = { messages: 0 };

          if (message) {
            if (message.substring(0, 4) === '[貼圖]') members[name].totalStickers++;
            else if (message.substring(0, 4) === '[照片]') members[name].totalPhotos++;
            else members[name].totalTexts++;

            if (dateMemberMessages[curDate][name]) dateMemberMessages[curDate][name].messages++;
            members[name].totalMessages++;
          }
        }
      }
    }

    setRootState(Object.assign({}, {
      dateMemberMessages,
    }));

    console.log(rootState);
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
