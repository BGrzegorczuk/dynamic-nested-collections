export enum TreeItemOrientation {
  HORIZONTAL,
  VERTICAL
}

export interface ITreeItemState { // kind of state - should I rename?
  text?: string;
  title?: string;
  color?: string;
  orientation?: TreeItemOrientation;
  activeChildIndex?: number; // only for GROUPED component
}

// export interface ITreeItem {
//   id: string | null;
//   parentId: string;
//   childIds: string[];
//   content: ITreeItemContent;
// }

export enum TreeItemTypes {
  DEFAULT,
  GROUP
}

// TODO: how to handle active state?


// TODO: how to handle using class (with default values) instead of interface ??
export class ITreeItem { // TODO: temporarily reused interface name - for simplicity
  id: string | null = null;
  parentId: string | null = null;
  childIds: string[] = [];
  type: TreeItemTypes = TreeItemTypes.DEFAULT;
  state: ITreeItemState = {
    text: '',
    color: 'black'
  }
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
