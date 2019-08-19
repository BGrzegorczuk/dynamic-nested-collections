import {ITreeItem, TreeItemTypes} from '../store/tree-item.model';

export const treeItemsDB: Partial<ITreeItem>[] = [
  {
    id: '1',
    parentId: null,
    childIds: [],
    state: {
      text: 'Aaaaaaa'
    }
  },
  {
    id: '2',
    parentId: null,
    childIds: ['3', '4'],
    state: {
      text: 'Bbbbbbb',
      activeChildIndex: 1
    },
    type: TreeItemTypes.GROUP
  },
  {
    id: '3',
    parentId: '2',
    childIds: [],
    state: {
      text: 'Ccccccc'
    }
  },
  {
    id: '4',
    parentId: '2',
    childIds: ['5'],
    state: {
      text: 'DDDD'
    }
  },
  {
    id: '5',
    parentId: '4',
    childIds: ['6', '7'],
    state: {
      text: 'EEEEE',
      activeChildIndex: 1
    },
    type: TreeItemTypes.GROUP
  },
  {
    id: '6',
    parentId: '5',
    childIds: ['8'],
    state: {
      text: 'FFFFFFFF'
    }
  },
  {
    id: '7',
    parentId: '5',
    childIds: ['9'],
    state: {
      text: 'GGGGGGGG'
    }
  },
  {
    id: '8',
    parentId: '6',
    childIds: [],
    state: {
      text: 'HHHHHHH'
    }
  },
  {
    id: '9',
    parentId: '7',
    childIds: [],
    state: {
      text: 'IIIIIIII'
    }
  }
];
