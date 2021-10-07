import {
  capitalize,
  createID,
} from '../helpers';

describe('test helpers functions', () => {

  it('test capitalize', () => {
    expect(capitalize('word')).toBe('Word');
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('test createID', () => {
    const cid = createID();
    expect(cid.length).toBe(36);
  });

});
