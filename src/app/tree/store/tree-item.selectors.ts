import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, ITreeState, treeItemsFeatureKey } from './tree-item.reducer';
import { Dictionary } from '@ngrx/entity';
import { ITreeItem } from './tree-item.model';

export const selectTreeItemsState = createFeatureSelector<ITreeState>(
  treeItemsFeatureKey
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors(selectTreeItemsState);

export const selectTreeItemById = () =>
  createSelector(
    selectEntities,
    (entities: Dictionary<ITreeItem>, props: { id: string }) =>
      entities[props.id]
  );
