import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  constructor(
    private snackbar:MatSnackBar,
    private updates:SwUpdate
    ){}

  ngOnInit(): void {
      this.updates.versionUpdates.pipe(
        filter((evt):evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        switchMap(() => this.snackbar.open('A new version is available!', 'Update now').afterDismissed()),
        filter(result => result.dismissedByAction),
        map(() => this.updates.activateUpdate().then(() => location.
        reload()))
      ).subscribe();
  }
}
