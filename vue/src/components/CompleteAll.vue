<template>
  <input id="toggle-all" class="toggle-all" type="checkbox" :checked="isChecked" v-on:click="onCompleteAllClicked">
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Injector, ICompleteAllView, CompleteAllPresenter } from '../../../app/src';
import { VueCompleteAllMixin } from '../mixins';

@Component({
  mixins: [VueCompleteAllMixin],
})
export default class CompleteAll extends VueCompleteAllMixin implements ICompleteAllView {
  public isChecked: boolean = false;

  public readonly presenter: CompleteAllPresenter = Injector.resolve(CompleteAllPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public check(): void {
    this.isChecked = true;
  }

  public uncheck(): void {
    this.isChecked = false;
  }
}
</script>
