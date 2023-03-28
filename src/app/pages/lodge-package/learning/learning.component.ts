import { Component, OnInit } from '@angular/core';
import { of, from, map, tap, take } from 'rxjs'

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    of(2,4,6,8).pipe(
      map(item => item * 2),
      tap(item => console.log(item)),
      take(4)
    )
    .subscribe(item => console.log(item));
    // from([36, 43, 21, 10]).subscribe({
    //   next: (item) => console.log(`resulting item => ${item}`),
    //   error: (error) => console.log(error),
    //   complete: () => console.log('complete')
    // })

  }

}
