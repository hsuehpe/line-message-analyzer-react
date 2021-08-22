import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { memberList, selectedName } from '../store/memberState';
import { selectedDate } from '../store/dateState';
import { filteredDateMemberMessages, yearMonths } from '../store/rootSelector';

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
    <div>
      {name} - { filteredMessages.totalMessages }
      <select value={name} onChange={e => {
        setName(e.target.value);
      }}>{ 
        memberNameList.map((name, index) => <option key={index}>{ name }</option>) 
      }</select>

      <select value={date} onChange={e => {
        setDate(e.target.value)
      }}>
        {
          dateOptions.map((date, index) => <option key={index}>{ date }</option>)
        }
      </select>
      <LineChart
        width={1000}
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
  );
};
