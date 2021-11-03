import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Resource 1', cols: 1, rows: 1 },
          { title: 'Resource 2', cols: 1, rows: 1 },
          { title: 'Resource 3', cols: 1, rows: 1 },
          { title: 'Resource 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Resource 1', cols: 1, rows: 1 },
        { title: 'Resource 2', cols: 1, rows: 1 },
        { title: 'Resource 3', cols: 1, rows: 1 },
        { title: 'Resource 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
