import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subject, takeUntil } from 'rxjs';
import { SelectButtonOption } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-filter-block',
  templateUrl: './filter-block.component.html',
  styleUrls: ['./filter-block.component.scss']
})
export class FilterBlockComponent {

  @Input() options: SelectButtonOption[] =[];
  @Input() searchBarTitle: string = '';
  @Input() placeholder = '';

  @Output() selectedValue = new EventEmitter<string[]>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<string>();

  showSearchButton = false;
  selectedOptions: SelectButtonOption[] = [];
  allChecked = false;
  currentUrl = window.location.href;

  searchForm = new FormGroup({
    searchTerm: new FormControl(),
  });

  destroy$: Subject<boolean> = new Subject<boolean>();

  @HostListener('document:keydown.enter', ['$event'])
  onEnter() {
    this.searchEvent.emit(this.searchTermControl.value)
  }

  ngOnInit(): void {
    this.currentUrl.includes('locations') ? 
    this.onChange({label: 'New Zealand', value: 'New Zealand', checked: true}) :
    this.onChange({label: 'Electric', value: 'Electric', checked: true});
    this.observeSearchField();
  }

  onChange(option: SelectButtonOption): void {
    if (option.checked) {
      this.selectedOptions = [...this.selectedOptions, option];
    } else {
      this.selectedOptions = this.selectedOptions.filter((x) => x.value !== option.value);
    }
    this.emitSelectedValues(this.selectedOptions);
  }

  observeSearchField(): void {
    this.searchTermControl.valueChanges.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.showSearchButton = true
      } 
    })
  }

  reset(): void {
    this.searchTermControl.reset();
    this.showSearchButton = false;
    this.clearEvent.emit(this.searchTermControl.value);
  }

  onAllChecked(event: MatCheckboxChange): void {
    this.allChecked = event.checked;
    this.options.forEach((option) => {
      option.checked = this.allChecked;
    });
    this.selectedOptions = this.allChecked ? [...this.options] : [];
    this.emitSelectedValues(this.selectedOptions);
  }

  emitSelectedValues(selectedOptions: SelectButtonOption[]): void {
    const values = selectedOptions.map((option) => option.value);
    this.selectedValue.emit(values);
  }

  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }
  
}
