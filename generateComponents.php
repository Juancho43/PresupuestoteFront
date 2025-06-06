<?php
function generateSearchComponentTemplate($entity)
{
    $T = ucfirst($entity);
    $className = $T . 'SearcherComponent';
    $serviceName = $T . 'SearchService';
    $template = <<<EOT
import {Component, inject, input, output, signal, Type} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {rxResource} from '@angular/core/rxjs-interop';
import {ApiResponseCollection} from '@core/interfaces/ApiResponseCollection';
import {of} from 'rxjs';

@Component({
  selector: 'app-{$entity}-searcher',
  imports: [
    FormsModule
  ],
  templateUrl: './{$entity}-searcher.html',
  standalone: true,
  styleUrl: './{$entity}-searcher.scss'
})
export class {$className}<{$T}> {
  readonly service = input.required<{$serviceName}<{$T}>>();
  results = output<{$T}[]>();
  readonly entity = input.required<string>();
  readonly route = input.required<string>();
  query = signal('');

  searchResource = rxResource({
    params: () => {
      return {query: this.query(), entity: this.route()};
    },
    stream: ({params}) => {
      if (params.query.length > 2) return this.service().search(params.entity, params.query);
      return of({} as ApiResponseCollection<{$T}>);
    },
  });

  search() {
    this.searchResource.reload();
  }

  complete() {
    this.results.emit(this.searchResource.value()?.data || []);
  }
}
EOT;

    return $template;
}

function generateSearchComponent($entity,$filePath)
{
    $T = ucfirst($entity);
    $className = $T . 'SearcherComponent';
    $template = generateSearchComponentTemplate($entity);
//    $filePath = __DIR__ . "/../src/app/components/{$entity}/{$className}.ts";

    if (!file_exists(dirname($filePath))) {
        mkdir(dirname($filePath), 0777, true);
    }

    file_put_contents($filePath, $template);
}
$entity = 'material';
$path = '../src/app/components/items/materials/material-search/material-searcher.component.ts';
generateSearchComponent($entity,$path);
