import { reducer, initialTreeState } from './tree-item.reducer';

describe('TreeItem Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialTreeState, action);

      expect(result).toBe(initialTreeState);
    });
  });
});
