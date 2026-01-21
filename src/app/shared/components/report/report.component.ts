import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../core/services/api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatButton } from '@angular/material/button';
import { Select, select, Store } from '@ngxs/store';
import { getReport, reportState } from '../../../core/store/state/report.state';
import { Observable } from 'rxjs';
export interface PeriodicElement{
  uid: string;
  name: string;
  created_at: string;
  symbol: string;
}
export interface ReportElement{
  Total_Recipient_Recevier: number;
  Total_Unique_Open_Email: number;
  Total_Open_Email:number;
  Total_Not_Open_Email: number;
  Total_Unique_Click_Link: number;
  Total_Click_Link: number;
  Total_New_Subscribers: number;
  Total_Unsubscriber: number;
  Total_Email_Report: number;
}
@Component({
  selector: 'app-report',
  imports: [MatTableModule,MatPaginatorModule,MatCheckboxModule,MatButton],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})

export class ReportComponent implements OnInit{
  constructor(private ApiService: ApiService,
    private store: Store
  ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['select','uid', 'name', 'created_at', 'symbol'];
  reportColumns: string[] = ['Total_Recipient_Recevier', 'Total_Unique_Open_Email', 'Total_Open_Email', 'Total_Not_Open_Email', 'Total_Unique_Click_Link', 'Total_Click_Link','Total_New_Subscribers', 'Total_Unsubscriber', 'Total_Email_Report']
  dataSource!: MatTableDataSource<PeriodicElement>
  dataSource_report!: MatTableDataSource<ReportElement>
  selection = new SelectionModel<PeriodicElement>(true, []);
  clickedRows = new Set<PeriodicElement>();
  report$ = this.store.select(reportState.getReport);
  ngOnInit(): void {
    this.store.dispatch(new getReport)
    this.ApiService.getCampaign().subscribe({
      next: (res) => {

        // Reverse the data
        const reversedData = res.reverse();

        // Filter the data by date (March 2025)
        const filteredData = reversedData.filter((item: { created_at: string | number | Date; }) => {
          let date = new Date(item.created_at);
          return date.getFullYear() === 2025; // March is month 2 (0-based index)
        });

        // Update the data source for the table
        this.dataSource = new MatTableDataSource(filteredData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      },
      error: (err) => {
        console.error('Error fetching campaigns:', err);
      }
    });
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.uid + 1}`;
  }
}
