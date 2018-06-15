import { Component, OnInit, Input, Output } from '@angular/core';
import {Company} from '../company.model';
import {CompanyService} from '../company.service';
import {PageEvent} from '@angular/material';
import {Page} from '../../page.model';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Page<Company>;
  length;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
    this.getCompanies(0, this.pageSize);
  }

  getCompanies(page: number, resultPerPage: number) {
    this.companyService.getCompanyPage(page, resultPerPage).subscribe(company => {
      this.companies = company;
      this.pageSize = company.resultPerPage;
      this.length = company.numberOfElements;
    });
  }

  changePagination(event) {
    this.pageEvent = event;
    this.getCompanies(this.pageEvent.pageIndex, this.pageEvent.pageSize);
  }


}
