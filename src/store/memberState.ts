import { atom } from 'recoil';

export const memberList = atom({
  key: 'memberList',
  default: [] as Array<string>,
});

export const selectedName = atom({
  key: 'selectedName',
  default: ''
});
