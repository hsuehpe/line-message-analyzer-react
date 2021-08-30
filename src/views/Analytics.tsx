import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { memberList, selectedName } from '../store/memberState';
import { selectedDate } from '../store/dateState';
import { filteredDateMemberMessages, yearMonths } from '../store/rootSelector';
import { Dropdown } from 'semantic-ui-react';

export default function Analytics() {
  const [memberNameList] = useRecoilState(memberList);
  const [name, setName] = useRecoilState(selectedName);
  const [date, setDate] = useRecoilState(selectedDate);
  const filteredMessages = useRecoilValue(filteredDateMemberMessages);
  const dateOptions = useRecoilValue(yearMonths);

  useEffect(() => {
    setName(memberNameList[1]);
    setDate(dateOptions[0]);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="w-[700px] h-[700px]">
        <div className="flex">
          <span className="mt-2">{name} - { filteredMessages.totalMessages }</span>
          <Dropdown
            className="ml-2"
            value={name}
            selection
            options={
              memberNameList.map((name, index) => {
                return {
                  key: index,
                  text: name,
                  value: name,
                };
              })
            }
            onChange={(e, { value }: { [key: string]: string }) => {
              setName(value);
            }}
          />
          <Dropdown
            className="ml-2"
            value={date}
            selection
            options={
              dateOptions.map((date, index) => {
                return {
                  key: index,
                  text: date,
                  value: date,
                }
              })
            }
            onChange={(e, { value }: { [key: string]: string }) => {
              setDate(value);
            }}
          />
        </div>
        <LineChart
          width={1200}
          height={600}
          data={filteredMessages.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="messages" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};
