import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('lapcare');

  constructor(private router: Router) {}

  ngOnInit(): void {
    // safer place to trigger navigation after construction
    this.router.navigate(['/home']);
  }
}
