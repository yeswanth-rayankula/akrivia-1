import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.css'],  
  imports: [RouterLink], 
})
export class Header {}
