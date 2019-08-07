import { TestBed } from '@angular/core/testing';

import { TreeItemsService } from './tree-items.service';

describe('TreeItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeItemsService = TestBed.get(TreeItemsService);
    expect(service).toBeTruthy();
  });
});
