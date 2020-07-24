import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['../hero-detail/hero-detail.component.css']
})
export class HeroAddComponent implements OnInit {

  public _id: string;
  public id: string;
  public name: string;
  public adress: string;
  public phone: string;
  public email: string;

  constructor(
    public heroService : HeroService,
  ) { }


  addHero(){
    let listadd : Hero = {
      _id: this._id,
      id : this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      adress: this.adress,
    };
    if(this.id == null || this.name == null || this.email == null || this. phone == null || this.adress == null){
      alert("Please don't input null")
    }
    else{
      this.heroService.getAdd(listadd).subscribe(data =>{
        alert("Add success")
       });
    }
    
  }

  ngOnInit(): void {
  }

}
