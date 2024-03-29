import { Component, OnInit } from '@angular/core';
import {TermApiService} from "../term-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import {term} from "../schemas/englishTerm";
import { definition } from '../schemas/definition';

@Component({
  selector: 'app-term-details',
  templateUrl: './term-details.component.html',
  providers : [TermApiService],
  styleUrls: ['./term-details.component.css']
})
export class TermDetailsComponent implements OnInit {

  m_term = {} as  term;
  m_definitions : definition[];

  m_param_id : string;
  m_termType : string;
  m_HelpfulClicked = false;
  m_NotHelpfulClicked = false;
  

  constructor(private apiService : TermApiService, private route:ActivatedRoute, private router:Router) { 


    

  }


  ngOnInit(): void {

    this.m_param_id= this.route.snapshot.paramMap.get("id");
    this.m_termType = this.route.snapshot.paramMap.get("termType");
    if (this.m_termType === "termEnglish")
      this.getPopulatedEnglishTerm();
    else if (this.m_termType === "termNonEnglish")
      this.getPopulatedNonEnglishTerm();
  }


  
  deleteTerm(termID : String): void{
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.apiService.deleteEnglishTerm(termID).subscribe(() => ( this.router.navigate(['/termEnglish'])));

   
   ;
  }

 getPopulatedEnglishTerm() : void {
     this.apiService.getPopulatedEnglishTerm(this.m_param_id).subscribe(term => ( this.m_term = term, this.m_definitions = term.definitions, console.log(term)));
  }

  getPopulatedNonEnglishTerm() : void {
    this.apiService.getPopulatedNonEnglishTerm(this.m_param_id).subscribe(term => ( this.m_term = term, this.m_definitions = term.definitions, console.log(term)));
 }

  onClickHelpful(){

    
    if (this.m_HelpfulClicked === false){
      this.apiService.modifyHelpYes(this.m_term._id, this.m_termType,true).subscribe(()=>{});
      this.m_term.helpYes++;
    }
    else if(this.m_HelpfulClicked === true){
      this.apiService.modifyHelpYes(this.m_term._id, this.m_termType,false).subscribe(()=>{});
      this.m_term.helpYes--;
    }

    this.m_HelpfulClicked = !this.m_HelpfulClicked;
   

  }


  onClickDefinitionLike(def : definition){
    def.likes++;

    this.apiService.updateDefinition(def).subscribe(()=>{});
  }
  
  onClickNotHelpful(){


    if (this.m_NotHelpfulClicked === false){
      this.apiService.modifyHelpNo(this.m_term._id, this.m_termType,true).subscribe(()=>{});
      this.m_term.helpNo++;
    }
    else if(this.m_NotHelpfulClicked === true){
      this.apiService.modifyHelpNo(this.m_term._id, this.m_termType,false).subscribe(()=>{});
      this.m_term.helpNo--;
    }

    this.m_NotHelpfulClicked = !this.m_NotHelpfulClicked;
    
    
    
  }

  onClickDefDelete(id : string){
    this.apiService.deleteDefintion(id).subscribe(() => { this.router.navigate(['details','termEnglish', this.m_term._id])});
    this.ngOnInit();
   }
  
}
