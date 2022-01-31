import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from 'app/services/api/teams/customers/collection';
import { filter, find, map } from 'lodash';
import { first, tap } from 'rxjs/operators';
import { LoadingService } from '../../../services/loading/loading.service';
import { Papa } from 'ngx-papaparse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss']
})
export class CsvImportComponent implements OnInit, OnDestroy {

  error: string;
  hasError: boolean;
  csvData: any[] = [];
  customerSubscription: Subscription;

  constructor(private router: Router, private loadingService: LoadingService, private customerCollection: Collection, private papa: Papa) { }

  ngOnInit() {

  }

  /**
   * Selects the csv file for import
   *
  */
  selectFile(evt: any) {

    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = (event: any) => {

      this.loadingService.startLoading();

      const csv = event.target.result;
      this.extractData(csv);
    };

  }

  private extractData(data) { // Input csv data to the function

    this.hasError = false;
    this.loadingService.startLoading();

    this.papa.parse(data, {
      header: false,
      complete: result => {
        const mapped = map(result.data, (row) => {
          return {
            name: row[0],
            email: row[1],
            address: row[2]
          }
        });
        this.compareData(mapped);
        console.log(mapped, mapped.length);
        this.loadingService.stopLoading();
      },
      error: (err) => {
        console.log('Error', err);
        // Take care of error handling
        this.hasError = true;
        this.error = err.message;
        this.loadingService.stopLoading();
      }
    });

  }

  compareData(results) {
    this.customerSubscription = this.customerCollection.query$.pipe(
      tap((oldCustomers: any[]) => {
        const newCustomers = filter(results, (newCustomer: any) => {

          const foundCustomer = find(oldCustomers, (oldCustomer: any) => {
            return oldCustomer.name === newCustomer.name && oldCustomer.address === newCustomer.address && oldCustomer.email === newCustomer.email;
          });

          // Fix this error after error auth check
          // const newCustomerValid = newCustomer.name && newCustomer.email

          return !foundCustomer;

        });
        if (newCustomers.length > 0) {
          this.csvData = newCustomers;
        } else {
          console.log('No new customers');
          this.hasError = true;
          this.error = 'No new customers found';
        }
      })
    ).subscribe();
  }

  import() {
    this.customerCollection.import(this.csvData);
  }

  revert() {
    this.hasError = false;
    this.error = '';
    this.csvData = [];
  }

  back() {
    this.router.navigate(['customers']);
  }

  ngOnDestroy(): void {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe();
    }
  }

}
