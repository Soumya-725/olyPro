import { TestBed } from '@angular/core/testing';

import { ColorDividerService } from './color-divider.service';

describe('ColorDividerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorDividerService = TestBed.get(ColorDividerService);
    expect(service).toBeTruthy();
  });
});
