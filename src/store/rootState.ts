import { atom } from 'recoil';

const rootState = atom({
  key: 'rootStateKey',
  default: {} as any,
});

export default rootState

