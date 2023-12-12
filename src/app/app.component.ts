import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'entrevistas';

  pixelSize = 10; // Tamaño de los píxeles

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const pixelSize = this.pixelSize;
    const x = Math.floor(event.clientX / pixelSize) * pixelSize;
    const y = Math.floor(event.clientY / pixelSize) * pixelSize;

    // Se podría almacenar o usar x y y según tus necesidades
  }
}
