import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlantHistoryService } from '../../services/plant-history.service';
import { PlantHistory } from '../../models/plant-history.model';
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
  // Injecting ActivatedRoute service to access route parameters
  private route = inject(ActivatedRoute);
  // Injecting PlantHistoryService to fetch plant history data
  private historyService = inject(PlantHistoryService);

  plantId!: number;  // Stores the current plant's ID
  history: PlantHistory[] = [];  // Array to hold history data for the plant

  // Configuration object for the line chart data
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],  // X-axis labels, initially empty
    datasets: [
      {
        data: [],  // Data points for humidity, initially empty
        label: 'Humedad (%)',  // Label for the dataset (Humidity %)
        fill: false,  // No fill under the line
        tension: 0.3,  // Curve tension for smooth lines
      }
    ]
  };

  // Chart display options for responsiveness and axis titles
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      y: {
        min: 0,  // Minimum value for y-axis (humidity %)
        max: 100,  // Maximum value for y-axis
        title: {
          display: true,
          text: 'Humedad (%)'  // Y-axis label
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha'  // X-axis label (Date)
        }
      }
    }
  };

  ngOnInit(): void {
    // Retrieve plant ID from route parameters
    this.plantId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch plant history data by plant ID
    this.historyService.getPlantHistoryByPlantId(this.plantId).subscribe(data => {
      this.history = data;

      // Map the dates to formatted labels for the chart's x-axis
      const labels = data.map(d =>
          new Date(d.date).toLocaleDateString('es-PE', { day: '2-digit', month: 'short' })
      );

      // Extract humidity values for the chart's dataset
      const values = data.map(d => d.humidity);

      // Update the chart data with new labels and dataset values
      this.lineChartData = {
        labels: labels,
        datasets: [
          {
            data: values,
            label: 'Humedad (%)',
            fill: false,
            tension: 0.3,
            borderColor: '#66bb6a',  // Line color
            backgroundColor: '#c8e6c9',  // Point background color
            pointRadius: 5,  // Radius of data points
            pointHoverRadius: 7  // Radius of points on hover
          }
        ]
      };

    });
  }
}

