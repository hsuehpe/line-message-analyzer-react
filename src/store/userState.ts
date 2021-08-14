import { atom } from 'recoil';

const userState = atom({
  key: 'userStateKey',
  default: {},
});

export default userState
