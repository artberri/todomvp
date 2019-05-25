<template>
  <header class="header">
    <h1>todos</h1>
    <input v-model="todoTitleInput" v-on:keyup.enter="onAddTodo(todoTitleInput)" class="new-todo" placeholder="What needs to be done?" autofocus>
  </header>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { HeaderPresenter, Injector, IHeaderView } from '../../../app/src';
import { VueHeaderMixin } from '../mixins';

@Component({
  mixins: [VueHeaderMixin],
})
export default class Header extends VueHeaderMixin implements IHeaderView {
  public todoTitleInput: string = '';

  public readonly presenter: HeaderPresenter = Injector.resolve(HeaderPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public emptyTodoInput(): void {
    this.todoTitleInput = '';
  }
}
</script>
