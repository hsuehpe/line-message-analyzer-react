import { selector } from 'recoil';
import rootState from './rootState';
import { selectedName } from './memberState';
import { selectedDate } from './dateState';

export const yearMonths = selector({
  key: 'months',
  get: ({ get }) => {
    const root = get(rootState);
    const { dateMemberMessages } = root;
    const d = ['all'] as Array<string>;

    for (let date in dateMemberMessages) {
      const str = date.split('/')[0] + '/' + date.split('/')[1];
      if (!d.includes(str)) d.push(str);
    }

    return d;
  }
});

export const filteredDateMemberMessages = selector({
  key: 'filteredDateMemberMessages',
  get: ({ get }) => {
    const root = get(rootState);
    const name = get(selectedName);
    const dateOption = get(selectedDate);
    const { dateMemberMessages } = root;
    const data = [] as Array<object>;
    let totalMessages = 0;
    
    for (let date in dateMemberMessages) {
      const yearMonths = date.split('/')[0] + '/' + date.split('/')[1];
      if ((yearMonths === dateOption) || dateOption === 'all') {
        if ((dateMemberMessages[date][name])) totalMessages += dateMemberMessages[date][name].messages;

        data.push({
          date,
          messages: (dateMemberMessages[date][name]) ? dateMemberMessages[date][name].messages : 0
        });
      }
    }

    return {
      data,
      totalMessages,
    };
  }
});

