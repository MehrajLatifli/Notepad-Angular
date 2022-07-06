import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { CheckedList } from 'src/app/Models/CheckedList';
import { ListService } from 'src/app/Services/list.service';


import { List1 } from '../../Models/List1';



@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  colorcount:number;

  List_1Array:List1[]=[];

  constructor(private listService:ListService) {


  }



  ngOnInit(): void {

    this.colorcount=0;


    setInterval(() => {

          this.listService.setcheckstatus(this.check);

          console.log("from control: "+  this.check);

    }, 1000);






  }

  noteform = new FormGroup({

    title: new FormControl(""),
    textarea: new FormControl("")


  });


  background_:any;

  changeColor($event:any){

    this.colorcount++;


    for (let index = 0; index < this.colorcount; index++) {



      if(index==1)
      {

        $event.target.innerText="grey";
        $event.target.classList.remove('btn-danger');
        $event.target.classList.remove('btn-secondary');
        $event.target.classList.remove('btn-success');
        $event.target.classList.remove('btn-info');
        $event.target.classList.add('btn-secondary');

        this.background_= $event.target.innerText
      }
      if(index==2)
      {
        $event.target.innerText="red";

        $event.target.classList.remove('btn-secondary');
        $event.target.classList.remove('btn-success');
        $event.target.classList.remove('btn-info');
        $event.target.classList.add('btn-danger');

        this.background_= $event.target.innerText
      }
      if(index==3)
      {
        $event.target.innerText="green";
        $event.target.classList.remove('btn-danger');
        $event.target.classList.remove('btn-secondary');
        $event.target.classList.remove('btn-info');
        $event.target.classList.add('btn-success');


        this.background_= $event.target.innerText
      }
      if(index==4)
      {
        $event.target.innerText="cyan";
        $event.target.classList.remove('btn-danger');
        $event.target.classList.remove('btn-secondary');
        $event.target.classList.remove('btn-success');
        $event.target.classList.remove('btn-success');
        $event.target.classList.add('btn-info');

        this.background_= $event.target.innerText
      }

    }

    if(this.colorcount>=5)
    {

      this.colorcount=1;
    }


    console.log("colorcount: "+this.colorcount)

  }

  check:boolean=false;

  CheckedlistClone: CheckedList[]=[];

  subcount:number

  addtoList($event:any)
  {


   var myElement: HTMLSelectElement | null= document.getElementById('checkselect') as HTMLSelectElement;

    const Checkedlist = {
      checked: myElement.value,
      text: this.noteform.value.textarea

    }

    this.subcount= this.CheckedlistClone.length+1;

    this.CheckedlistClone.push(Checkedlist);

    if (this.noteform.value.title != "" && this.noteform.value.textarea != "") {

      this.listService.postChecked(Checkedlist).subscribe(data => { console.log(data) });




    }

    this.check=true;

  }



  addNote() {

    this.subcount=0;






    if (this.check == false) {



    console.log(" control check 1: "+  this.check);

      if (this.colorcount == 0) {

        this.background_ = "white"


      }


      const List_1_ = {
        title: this.noteform.value.title,
        text: this.noteform.value.textarea,
        background: this.background_,

      }


      if (this.noteform.value.title != "" && this.noteform.value.textarea != "") {

        this.listService.postNotes(List_1_).subscribe(data => { console.log(data) })




        this.CheckedlistClone=[];

      }



    }

    if (this.check == true) {


      console.log(" control check 2: "+  this.check);

      if (this.colorcount == 0) {

        this.background_ = "white"


      }



      const List_2 = {
        title: this.noteform.value.title,
        text: this.noteform.value.textarea,
        background: this.background_,
        CheckedListArray:this.CheckedlistClone

      }



      if (this.noteform.value.title != "" && this.noteform.value.textarea != "") {

        this.listService.postNotes2(List_2).subscribe(data => { console.log(data) })



        this.CheckedlistClone=[];
      }


    }


    this.check=false;

  }







}
