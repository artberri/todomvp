<template>
  <section class="todoapp">
    <Header />
    <section v-if="isListVisible" class="main">
      <CompleteAll v-if="isListVisible" />
      <label v-if="isListVisible" for="toggle-all">Mark all as complete</label>
      <Todos />
    </section>
    <Footer v-if="isListVisible" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Todos from './components/Todos.vue';
import Footer from './components/Footer.vue';
import CompleteAll from './components/CompleteAll.vue';
import { IAppView, AppPresenter, Injector } from '../../app/src';
import { TodoLocalStorageService } from './services';

@Component({
  components: {
    Header,
    Todos,
    Footer,
    CompleteAll,
  }
})
export default class App extends Vue implements IAppView {
  public isListVisible: boolean = false;

  protected readonly presenter: AppPresenter = Injector.resolve(AppPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public showList(): void {
    this.isListVisible = true;
  }

  public hideList(): void {
    this.isListVisible = false;
  }
}
</script>
