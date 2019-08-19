import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TreeComponent } from './tree.component';
import * as fromTreeReducer from './store/tree-item.reducer';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { TreeItemsService } from './services/tree-items.service';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [TreeComponent, TreeItemComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTreeReducer.treeItemsFeatureKey,
      fromTreeReducer.reducer
    ),
    MatTabsModule,
    DragDropModule
  ],
  providers: [TreeItemsService]
})
export class TreeModule {}
