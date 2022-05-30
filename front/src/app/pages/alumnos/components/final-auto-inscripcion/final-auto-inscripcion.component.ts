import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-final-auto-inscripcion',
  templateUrl: './final-auto-inscripcion.component.html',
  styleUrls: ['./final-auto-inscripcion.component.css']
})
export class FinalAutoInscripcionComponent implements OnInit {

  constructor(
    private _router:Router
  ) { }

  ngOnInit(): void {
  }

}
