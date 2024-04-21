import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  act : {nom:string,img?:string,round?:number,win?:boolean,lose?:boolean}[][] = [];
  activites : {nom:string,img?:string,round?:number,win?:boolean,lose?:boolean}[] = [
    {
      nom:"Saut en parachute",
      img:"parach"
    },
    {
      nom:"Salle d'arcade",
      img:"arcade"
    },
    {
      nom:"Laser Game entre nous",
      img:"laserg"
    },
    {
      nom:"Canoe Kayak",
      img:"canoe"
    },
    {
      nom:"Parc d'attraction (aquatique)",
      img:"parcattr"
    },
    {
      nom:"Mystère",
      img:"karaoke"
    },
    {
      nom:"Urbex",
      img:"urbex"
    },
    {
      nom:"Ecape game horreur",
      img:"escapeg"
    },
    {
      nom:"Cache cache géant",
      img:"cachec"
    },
    {
      nom:"Plongée sous-marine",
      img:"plongee"
    },
    //10
    {
      nom:"Archery tag",
      img:"archer"
    },
    {
      nom:"Football méga ballon",
      img:"football"
    },
    {
      nom:"Accrobranche",
      img:"accro"
    },
    {
      nom:"Escalade",
      img:"escalade"
    },
    {
      nom:"Randonnée avec cascade",
      img:"randonnee"
    },
    {
      nom:"Blind test",
      img:"blind"
    },
    {
      nom:"Soirée VIP à la maison",
      img:"maison"
    },
    {
      nom:"Vol d'intérieur",
      img:"vol"
    },
    {
      nom:"Skatepark géant",
      img:"skate"
    },
    {
      nom:"Trampoline Park",
      img:"trampo"
    },
    //20
    {
      nom:"Qui veut gagner des millions",
      img:"millions"
    },
    {
      nom:"Parcours d'obstacles",
      img:"obst"
    },
    {
      nom:"Jeu de piste géant",
      img:"piste"
    },
    {
      nom:"Surf",
      img:"surf"
    },
    {
      nom:"Fête foraine",
      img:"fete"
    },
    {
      nom:"Piscine à boules géante",
      img:"boules"
    },
    {
      nom:"Mini golf",
      img:"golf"
    },
    {
      nom:"Patinoire",
      img:"patin"
    },
    {
      nom:"Ruée de challenges",
      img:"chall"
    },
    {
      nom:"SPA",
      img:"spa"
    },
    //30
    {
      nom:"Parapente",
      img:"parap"
    },
    {
      nom:"Isolation sensorielle",
      img:"iso"
    }
  ]
  round = 0;
  rounds : number[] = [];
  nb = 0;

  ngOnInit()
  {
    let j = this.activites.length/2;

    let r = 1;
    if(j==2) r=2;
    else if(j==4) r=3;
    else if(j==8) r=4;
    else if(j==16) r=5;
    else if(j==32) r=6;
    else if(j==64) r=7;

    for(let i=0;i<r;i++)
    {
      this.rounds.push(i);
    }

    for(let i=0;i<j;i++)
    {
      let fight = [];

      let rdm = Math.floor(Math.random()*this.activites.length);
      let a = this.activites[rdm];
      a.round = this.round;
      fight.push(a);
      this.activites.splice(rdm,1);

      rdm = Math.floor(Math.random()*this.activites.length);
      a = this.activites[rdm];
      a.round = this.round;
      fight.push(a);
      this.activites.splice(rdm,1);

      this.act.push(fight);
    }

    console.log(this.act);
    this.round++;
  }

  getAct(i:number)
  {
    let tmp = this.act.filter((a:any)=>a[0].round==i);
    return tmp;
  }

  win(i:number)
  {
    let a = this.act[this.nb][i];
    let b = Object.assign({}, a);
    b.round = this.round;
    let c = this.act[this.nb][i==0?1:0];

    a.win = true;
    c.lose = true;

    if(this.nb%2==0)
    {
      this.act.push([b]);
    }
    else
    {
      this.act[this.act.length-1].push(b);
    }
    this.nb++;
    let z = 0;
    for(let x=0;x<this.round;x++)
    {
      z += this.getAct(x).length;
    }

    let el = document.getElementById("col"+(this.round-1));
    if(this.nb==z)this.round++;

    if(el)
    {
      setTimeout(() => {if(el){el.scrollTop = el.scrollHeight*100}}, 20);
    }
  }

  isDisabled(r:number,i:number)
  {
    let a = i;
    for(let x=0;x<r;x++)
    {
      a += this.getAct(x).length;
    }
    return a;
  }

  max(r:number,i:number)
  {
    let a = i;
    for(let x=0;x<r;x++)
    {
      a += this.getAct(x).length;
    }
    return a;
  }
}
