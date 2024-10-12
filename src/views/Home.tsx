import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import rootState from '../store/rootState';
import { Members, DateMemberMessages } from '../types';
import { messageActions } from '../constants';
import { useHistory } from 'react-router-dom';
import { memberList } from '../store/memberState';
import { Button, Loader, Segment, Header, Icon } from 'semantic-ui-react';

export default function Home() {
  const dateReg = new RegExp(/^([0-9]{4})([./]{1})([0-9]{1,2})([./]{1})([0-9]{1,2})（.+）/);
  const messageReg = new RegExp("^([\u4e00-\u9fa5]{0,2})([0-9]{1,2})[:]{1}([0-9]{1,2})");
  const members = {} as Members;
  const dateMemberMessages = {} as DateMemberMessages;
  const history = useHistory();

  const inputEl = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [root, setRootState] = useRecoilState(rootState);
  const [memberNameList, setMemberNameList] = useRecoilState(memberList);
  const [isLoading, setIsLoading] = useState(false);

  const handleUploadFile = () => {
    if (inputEl.current) inputEl.current.click();
  };

  const isContainsMessageActions = (name: string) => {
    return messageActions.some(action => name.includes(action));
  };

  const processLine = (line: string, curDate: string) => {
    const linesAry = line.split(/(\t)/);
    if (messageReg.test(linesAry[0])) {
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
          memberNameList.push(name);
        }

        if (!dateMemberMessages[curDate][name]) dateMemberMessages[curDate][name] = { messages: 0 };

        if (message) {
          if (message.startsWith('[貼圖]')) members[name].totalStickers++;
          else if (message.startsWith('[照片]')) members[name].totalPhotos++;
          else members[name].totalTexts++;

          dateMemberMessages[curDate][name].messages++;
          members[name].totalMessages++;
        }
      }
    }
  };

  const analyze = (lines: Array<string>) => {
    let curDate = '';
    for (const line of lines) {
      if (dateReg.test(line)) {
        curDate = line.split('（')[0];
        dateMemberMessages[curDate] = {};
      } else {
        processLine(line, curDate);
      }
    }

    setRootState({ dateMemberMessages, members });
    setMemberNameList(memberNameList);
    history.push('/analytics');
  };

  const onChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLFormElement;
    if (target && target.files.length > 0) {
      const file = target.files[0];
      const fr = new FileReader();
      inputEl.current.value = '';
      fr.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const result = e.target.result as string;
          analyze(result.split('\n'));
        }
      };

      fr.onloadstart = () => setIsLoading(true);
      fr.onloadend = () => setIsLoading(false);
      fr.readAsText(file);
    }
  };

  return (
      <div className="flex justify-center items-center flex-col">
        <h1 className="ui header">Line 統計分析</h1>
        <Loader style={{ display: isLoading ? 'block' : 'none' }} />
        <Segment placeholder className="w-[400px] h-[300px]">
          <Header icon>
            <Icon name="file text" />
            Upload your txt file
          </Header>
          <Button primary onClick={handleUploadFile}>載入聊天</Button>
          <input ref={inputEl} type="file" name="file" id="file" style={{ display: 'none' }} onChange={onChange} />
        </Segment>
      </div>
  );
}