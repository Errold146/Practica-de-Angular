import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {

    placeholder = input('Buscar')
    buttonText = input('Buscar')
    initialValue = input<string>()
    debounceTime = input(1000)

    value = output<string>()

    inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

    debounceEffect = effect((onCleanup) => {
        const value = this.inputValue()

        const timeout = setTimeout(() => {
            this.value.emit(value)
        }, this.debounceTime())

        onCleanup(() => {
            clearTimeout(timeout)
        })
    })
}
