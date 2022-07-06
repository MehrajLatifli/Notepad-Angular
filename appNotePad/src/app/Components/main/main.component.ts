import { Component, OnInit } from '@angular/core';
import { CheckedList } from 'src/app/Models/CheckedList';
import { List1 } from 'src/app/Models/List1';
import { ListService } from 'src/app/Services/list.service';
import { List2 } from '../../Models/List2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  List_1Array:List1[]=[];
  List_2Array:List2[]=[];
  CheckedList:CheckedList[]=[];
  backgrouncolor:any;

  check:boolean;

checkmain:any;
listinfo1:any;
listinfo2:any;


  constructor(private listService:ListService) { }


  //  myElement: HTMLElement | null= document.getElementById('indexUl') as HTMLElement;

  innerhtml:any;
  ngOnInit(): void {


    setInterval(() => {

          this.check=  this.listService.getcheckstatus();


          console.log("from main: "+  this.listService.getcheckstatus());

    }, 1000);

     setInterval(() => {

      this.listService.getNotes().subscribe(data=>{
        this.List_1Array=data;

        this.List_1Array.forEach(element2 => {

          this.listinfo1=element2.id

          console.log("list1info: "+this.listinfo1);
        });

      },error=>{console.log(error)});




   }, 1000);

   setInterval(() => {


    this.listService.getcheck().subscribe(data2=>{
      this.CheckedList=data2;






 this.CheckedList.forEach(element => {

  this.checkmain=element.id;

  console.log("checkmainId: " +this.checkmain);






 });



//  this.listService.getNotes2().subscribe(data=>{
//   this.List_2Array=data;

//   this.List_2Array.forEach(element3 => {

//     this.listinfo2=element3.id

//     console.log("list1info2: "+this.listinfo1);
//   });

// },error=>{console.log(error)});


      // for (let index = 0; index < data2.length; index++) {



      //   this.innerhtml += ` <li >

      //   ${data2[index].text}

      //       </li>`;



      //   }



      //   console.log(data2.length)
    },error=>{console.log(error)});

    this.listService.getNotes2().subscribe(data=>{
      this.List_2Array=data;










    },error=>{console.log(error)});






 },2000, 2000);





  }

}
