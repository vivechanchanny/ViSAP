import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../logger/logger.service';
import { Logable } from '../logger/logable';



export class BaseComponent implements Logable {

  logger: any;
  ViSAP: any;

  constructor(protected _logger: LoggerService) {
    this.logger = _logger;
    this.ViSAP = window['ViTag'];
  }

  ngOnInit() {
  }

}
