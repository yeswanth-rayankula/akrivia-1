import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component(
    {
        selector:'app-header',
        standalone: true,
        template:`<nav>
  <button routerLink="/login">Login</button>
  <button routerLink="/register">Register</button>
</nav>`,
       imports:[RouterLink]
    }
)
export class Header{}