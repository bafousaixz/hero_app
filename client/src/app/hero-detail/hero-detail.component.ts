import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  public hero: Hero;
  check: boolean = false;
  Contact: FormGroup;

  public _id: string;
  public id: string;
  public name: string;
  public adress: string;
  public phone: string;
  public email: string;
 
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    ) {}
  
  getHeroDetail(): void{
    const _id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHerodetail(_id).subscribe(h =>
      this.hero = h
    );
  }

  delete(id: number){
    let mess;
    if(confirm("You are sure delete hero?")){
      this.heroService.deleteHero(id).subscribe((data)=>{
        alert("Deleted!!!")
      });
    }
    else{
      alert("Delete ERROR")
    }
    
  }

  Update(){
    this.check = false;
    let listupdate : Hero = {
      _id: this.hero._id,
      id : this.hero.id,
      name: this.hero.name,
      email: this.hero.email,
      phone: this.hero.phone,
      adress: this.hero.adress,
    };
    this.heroService.getUpdate(listupdate).subscribe(data =>{
      alert("Updated!!!")
     });
  }

  ngOnInit(): void {
    this.getHeroDetail();
  }
  Edit(){
    this.check = true;
  }



}
