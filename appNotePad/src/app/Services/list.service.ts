import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable,tap,catchError,delay, map,throwError } from 'rxjs';

import { CheckedList } from '../Models/CheckedList';
import { List1 } from 'src/app/Models/List1';
import { List2 } from 'src/app/Models/List2';

@Injectable({
  providedIn: 'root'
})

export class ListService {

  check:boolean;

  constructor(private http:HttpClient) {

    console.log("from service: "+this.check);

  }

  setcheckstatus(check){

    this.check=check;
  }

  getcheckstatus(){



   return this.check;
  }


  url_firebase="https://angular-notepad-96768-default-rtdb.firebaseio.com/";


  postNotes(List_1_:List1):Observable<any>{


    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"notes.json",List_1_,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));
  }

  postNotes2(List_2_:any):Observable<any>
  {

    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"noteslist.json",List_2_,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));

  }


  postChecked(CheckedList_:CheckedList):Observable<any>
  {

    const httpOption={

      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Token'
      })

    }

    return  this.http.post<any>(this.url_firebase+"checked.json",CheckedList_,httpOption).pipe(tap(data=>console.log(data)),catchError(this.HandleError),delay(1000));

  }

  getNotes2():Observable<List2[]>{

    return  this.http.get<List2[]>(this.url_firebase+"noteslist.json").pipe(

      map(response=> {

      const List_2_: List2[]=[];

      for(const key in response)
      {
        List_2_.push({...response[key],id:key});
      }

      return List_2_;
    })

    );
  }

  getcheck():Observable<CheckedList[]>{

    return  this.http.get<CheckedList[]>(this.url_firebase+"checked.json").pipe(

      map(response=> {

      const CheckedList: CheckedList[]=[];

      for(const key in response)
      {
        CheckedList.push({...response[key],id:key});
      }

      return CheckedList;
    })

    );
  }

  getNotes():Observable<List1[]>{

    return  this.http.get<List1[]>(this.url_firebase+"notes.json").pipe(

      map(response=> {

      const List_1_: List1[]=[];

      for(const key in response)
      {
        List_1_.push({...response[key],id:key});
      }

      return List_1_;
    })

    );
  }



  private HandleError(error: HttpErrorResponse)
  {

    if(error.error instanceof ErrorEvent)
    {

      alert("Error: "+ error.error.message);

    }
    else{

      switch (error.status) {
        case 404:
                alert("404 Error: \n"+ error.message);
          break;

          case 403:
            alert("403 Error: \n"+ error.message);
           break;

           case 500:
            alert("500 Error: \n"+ error.message);
           break;

        default:
          alert("Some unknow Error: \n"+ error.message);
      }
    }
    return throwError(()=>new Error ("from HandleError: "+error.message));
  }

}


