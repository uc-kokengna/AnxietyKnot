import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-journal-book',
  templateUrl: './journal-book.component.html',
  styleUrls: ['./journal-book.component.css']
})
export class JournalBookComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Journal 1', cols: 2, rows: 1 },
          { title: 'Journal 2', cols: 2, rows: 1 },
          { title: 'Journal 3', cols: 2, rows: 1 },
          { title: 'Journal 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Journal 1', cols: 1, rows: 1 },
        { title: 'Journal 2', cols: 1, rows: 1 },
        { title: 'Journal 3', cols: 1, rows: 1 },
        { title: 'Journal 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
