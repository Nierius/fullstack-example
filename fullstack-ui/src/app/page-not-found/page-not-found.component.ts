import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@Component({
  templateUrl: './page-not-found.component.html',
  imports: [MatButtonModule, RouterModule],
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
