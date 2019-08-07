import { ITreeItem } from '../store/tree-item.model';

export const treeItemsDB: ITreeItem[] = [
  {
    id: '1',
    parentId: null,
    childIds: [],
    content: {
      text: 'Aaaaaaa'
    }
  },
  {
    id: '2',
    parentId: null,
    childIds: ['3', '4'],
    content: {
      text: 'Bbbbbbb'
    }
  },
  {
    id: '3',
    parentId: '2',
    childIds: [],
    content: {
      text: 'Ccccccc'
    }
  },
  {
    id: '4',
    parentId: '2',
    childIds: ['5'],
    content: {
      text: 'DDDD'
    }
  },
  {
    id: '5',
    parentId: '4',
    childIds: ['6', '7'],
    content: {
      text: 'EEEEE'
    }
  },
  {
    id: '6',
    parentId: '5',
    childIds: ['8'],
    content: {
      text: 'FFFFFFFF'
    }
  },
  {
    id: '7',
    parentId: '5',
    childIds: ['9'],
    content: {
      text: 'GGGGGGGG'
    }
  },
  {
    id: '8',
    parentId: '6',
    childIds: [],
    content: {
      text: 'HHHHHHH'
    }
  },
  {
    id: '9',
    parentId: '7',
    childIds: [],
    content: {
      text: 'IIIIIIII'
    }
  }
];
