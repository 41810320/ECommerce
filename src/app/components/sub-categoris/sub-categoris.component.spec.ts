import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorisComponent } from './sub-categoris.component';

describe('SubCategorisComponent', () => {
  let component: SubCategorisComponent;
  let fixture: ComponentFixture<SubCategorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategorisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubCategorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
