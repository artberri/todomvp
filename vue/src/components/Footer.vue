<template>
  <footer class="footer">
      <span class="todo-count"><strong>{{ activeTodoCount }}</strong> {{ 'item' | pluralize(activeTodoCount) }} left</span>
      <ul class="filters">
        <li>
          <router-link :to="{ name: 'home'}" exact>All</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'active'}" exact>Active</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'completed'}" exact>Completed</router-link>
        </li>
      </ul>
      <button v-if="isClearCompletedLinkShown" v-on:click="onClearCompletedClicked()" class="clear-completed">Clear completed</button>
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FooterPresenter, Injector, IFooterView, TodoFilterType } from '../../../app/src';
import { VueFooterMixin } from '../mixins';

@Component({
  mixins: [VueFooterMixin]
})
export default class Footer extends VueFooterMixin implements IFooterView {
  public activeTodoCount: number = 0;
  public noneFilter: TodoFilterType = 'none';
  public activeFilter: TodoFilterType = 'active';
  public completedFilter: TodoFilterType = 'completed';
  public isClearCompletedLinkShown: boolean = false;

  public readonly presenter: FooterPresenter = Injector.resolve(FooterPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public setActiveTodoCount(count: number): void {
    this.activeTodoCount = count;
  }

  public showClearCompletedLink(): void {
    this.isClearCompletedLinkShown = true;
  }

  public hideClearCompletedLink(): void {
    this.isClearCompletedLinkShown = false;
  }
}
</script>
