import { atom } from 'recoil';

const memberState = atom({
  key: 'memberStateKey',
  default: [] as Array<string>,
});

export default memberState;


