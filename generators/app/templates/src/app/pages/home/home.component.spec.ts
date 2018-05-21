import { TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';

import { HomePage } from './home.component';

describe('HomePage', () => {
	let fixture;
	let component;

  	beforeEach(() => {

    	TestBed.configureTestingModule({
			declarations: [
				HomePage
			],
			imports: [
				IonicModule.forRoot(HomePage)
			],
			providers: [
			]
    	})
  	});

  	beforeEach(() => {
    	fixture = TestBed.createComponent(HomePage);
    	component = fixture.componentInstance;
  	});

  	it('should create HomePage component', () => {
		expect(component instanceof HomePage).toBe(true);
  	});

	it('should have correct title',() => {
		let title = fixture.debugElement.query(By.css('ion-title'));
		fixture.detectChanges();
		expect(title.nativeElement.textContent).toContain('Home');
	});

});
