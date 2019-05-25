<template>
  <li>
    <a :class="{'selected': isSelected}" v-on:click="onLinkClicked()" href="#"><slot></slot></a>
  </li>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { Injector, IFilterLinkView, FilterLinkPresenter, TodoFilterType } from '../../../app/src';
import { VueFilterLinkMixin } from '../mixins';

@Component({
  mixins: [VueFilterLinkMixin],
})
export default class FilterLink extends VueFilterLinkMixin implements IFilterLinkView {
  @Prop()
  public filter!: TodoFilterType;

  public isSelected: boolean = false;

  public readonly presenter: FilterLinkPresenter = Injector.resolve(FilterLinkPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public select(): void {
    this.isSelected = true;
  }

  public unselect(): void {
    this.isSelected = false;
  }
}
</script>
