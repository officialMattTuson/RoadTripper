import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import { SelectButtonOption } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Input() options: SelectButtonOption[] =[];
  @Input() searchBarTitle: string = '';
  @Output() selectedValue = new EventEmitter<string[]>();

  selectedOptions: SelectButtonOption[] = [];
  allChecked = false;
  currentUrl = window.location.href;

  ngOnInit(): void {
    this.currentUrl.includes('locations') ? 
    this.onChange({label: 'New Zealand', value: 'New Zealand', checked: true}) :
    this.onChange({label: 'Electric', value: 'Electric', checked: true})
  }

  onChange(option: SelectButtonOption) {
    if (option.checked) {
      this.selectedOptions = [...this.selectedOptions, option];
    } else {
      this.selectedOptions = this.selectedOptions.filter((x) => x.value !== option.value);
    }

    this.emitSelectedValues(this.selectedOptions);
  }

  onAllChecked(event: MatCheckboxChange) {
    this.allChecked = event.checked;
    this.options.forEach((option) => {
      option.checked = this.allChecked;
    });
    this.selectedOptions = this.allChecked ? [...this.options] : [];
    this.emitSelectedValues(this.selectedOptions);
  }

  emitSelectedValues(selectedOptions: SelectButtonOption[]) {
    const values = selectedOptions.map((option) => option.value);
    this.selectedValue.emit(values);
  }

}
