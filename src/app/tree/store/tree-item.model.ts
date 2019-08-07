import {pick} from 'lodash';

export interface ITreeItemContent { // kind of state - should I rename?
  // title?: string;
  text: string;
  color: string;
}

export interface ITreeItem {
  id: string | null;
  parentId: string;
  childIds: string[];
  content: ITreeItemContent;
}

// export class TreeItem {
//   id: string | null = null; // null id means component not initialized
//   parentId: string | null;
//   childIds: string[] = [];
//   content: ITreeItemContent = {
//     text: '',
//     color: 'black'
//   };
//
//   serialize() {
//     return JSON.stringify(this);
//   }
//
//   update(model: Partial<ITreeItem>): ITreeItem {
//     return pick(Object.assign(this, model), ['id']);
//   }
// }
