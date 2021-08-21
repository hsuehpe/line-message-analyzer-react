import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import rootState from '../store/rootState';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import memberState from '../store/memberState';

export default function Analytics() {
  const [root] = useRecoilState(rootState);
  const [memberNameList] = useRecoilState(memberState);
  const { dateMemberMessages } = root
  const [data, setData] = useState([] as Array<any>);
  const d = [] as Array<object>;
  const name = memberNameList[1];

  useEffect(() => {
    for (let date in dateMemberMessages) {
      d.push({
        date,
        messages: (dateMemberMessages[date][name]) ? dateMemberMessages[date][name].messages : 0
      });
    }

    setData(d);
  }, []);

  return (
    <LineChart
      width={1000}
      height={600}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="messages" stroke="#82ca9d" />
    </LineChart>
  );
};
