import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from 'src/app/interfaces/response';
import { ApiConfigService } from 'src/app/services/api-config.service';
@Injectable({
  providedIn: 'root'
})
export class Api_Service<model>{

  private subject! : Response
  private subject$! : BehaviorSubject<Response>
  public subject_details! : model[]
  private subject_details$! : BehaviorSubject<any[]>
  private subject_select$! : BehaviorSubject<Response>

  constructor(private http : HttpClient, private con : ApiConfigService) { 

    this.subject$ = new BehaviorSubject<Response>({
      Status : false,
      Messague : "",
      Data : []
    })
    this.subject_details$ = new BehaviorSubject<any>({})

    this.subject_select$ = new BehaviorSubject<Response>({
      Status : false,
      Messague : "",
      Data : []
    })
  }
  //CARGAR SELECTS
  private load_data(){
    
  }
  // OBTENER TODOS LOS REGISTROS
  load_all(url : string, type : string = "table"){

    if(type == "table"){
        this.http.get<Response>(this.con.base_url +url)
        .subscribe((res : Response)=>{
          this.subject = res
          this.subject$.next(this.subject)
        })
    }else if(type == "selects"){

      this.http.get<Response>(this.con.base_url +url)
        .subscribe((res : Response)=>{

          this.subject_select$.next(res)
        })
    }

    
  }

  get_all(type : string = "table") : Observable<Response>{

    if(type == "table"){
      return this.subject$.asObservable()
    }
    else if( type == "selects"){
      return this.subject_select$.asObservable()
    }
    
    return  new Observable<Response>
  }

  clearData(type : string = "table") {

    if(type == "table"){
      this.subject$ = new BehaviorSubject<Response>({
        Status: false,
        Messague: "",
        Data: []
      })
    }
    else if( type == "selects"){

      this.subject_select$ = new BehaviorSubject<Response>({
        Status: false,
        Messague: "",
        Data: []
      })
    }
   
  }

  get_details(id : number, pk_colum_name : string){

      const data = this.subject.Data.filter(function(record : any){
      return record[pk_colum_name] == id
    })

    if(data != ""){

      this.subject_details = data
      
    }

    this.subject_details$.next(this.subject_details)
  }

  get_details$(): Observable<model[]>{

    return this.subject_details$.asObservable()
  }
  create(url : string, data : any) : Observable<Response>{

    return this.http.post<Response>(this.con.base_url + url, data)
  }
  update(url : string, data : any){

    return this.http.post<Response>(this.con.base_url + url, data)
    
  }
  delete(params : any) : Observable<Response>{

    return this.http.post<Response>(this.con.base_url + "records/delete_soft", params);
  }

  filter(url : string, data : any, type : string ="table"){

    
    this.http.post<Response>(this.con.base_url + url, data)
      .subscribe((res : Response)=>{

        if(type == "table"){
          this.subject = res   
          console.log(res.Messague)
          this.subject$.next(this.subject)
        }
        
      })
  }
}

