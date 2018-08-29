import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html'
})
export class GraficoDonaComponent implements OnInit {

  @Input('labels') doughnutChartLabels: string[]
  @Input('data') doughnutChartData: number[]
  @Input('chartType') doughnutChartType: string
  constructor() { }
  // public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  // public doughnutChartData: number[] = [350, 450, 100];
  // public doughnutChartType: string = 'doughnut';
  ngOnInit() {
  }

}
