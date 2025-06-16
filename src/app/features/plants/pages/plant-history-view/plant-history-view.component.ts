import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { PlantHistoryService } from '../../services/plant-history.service';
import { PlantHistory } from '../../model/plant-history.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-plant-history-view',
  imports: [CommonModule, NgChartsModule, RouterLink],
  templateUrl: './plant-history-view.component.html',
  styleUrls: ['./plant-history-view.component.css']
})
export class PlantHistoryViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private historyService = inject(PlantHistoryService);

  plantId!: number;
  history: PlantHistory[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Humedad (%)',
        fill: false,
        tension: 0.3,
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Humedad (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'
        }
      }
    }
  };

  ngOnInit(): void {
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));
    this.historyService.getPlantHistoryByPlantId(this.plantId).subscribe(data => {
      this.history = data;

      const labels = data.map(d =>
          new Date(d.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
      );

      const values = data.map(d => d.humidity);

      this.lineChartData = {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Humedad (%)',
            fill: false,
            tension: 0.3,
            borderColor: '#66bb6a',
            backgroundColor: '#c8e6c9',
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      };

    });
  }
}
