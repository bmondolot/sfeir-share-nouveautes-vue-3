<!-- .slide: class="transition" -->

# Composition & Reactivity APIs

Is the new way of doing thing always better?

Notes:
- One of the biggest new feature of Vue 3
- Subject to great debate at first
- But first, a quick introduction to the way we use to write Vue code

##--##

<!-- .slide: data-type-show="prez" class="with-code" -->

## Writing components' logic

```js
export default {
  name: 'UserRepositories',
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { type: String }
  },
  data () {
    return {
      repositories: [], // 1
      filters: { ... }, // 3
      searchQuery: '' // 2
    }
  },
  computed: {
    filteredRepositories () { ... }, // 3
    repositoriesMatchingSearchQuery () { ... }, // 2
  },
  watch: {
    user: 'getUserRepositories' // 1
  },
  methods: {
    getUserRepositories () {
      // using `this.user` to fetch user repositories
    }, // 1
    updateFilters () { ... }, // 3
  },
  mounted () {
    this.getUserRepositories() // 1
  }
}
```

Component example from [Vue.js' documentation](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api).

Notes:
- Go through every part of the component
- Downsides:
    - Hard to read through and to know what everything is doing;
    - Things get messier when a component contains more than one "feature"

##--##

<!-- .slide: data-type-show="prez" -->

## Sharing logic between componentns

TODO: mixin declaration
TODO: mixin injection

Notes:
Downsides:
 - You don't know which mixin injected which options at first sight

##--##

<!-- .slide: data-type-show="prez" class="with-code" -->

## Introducting the Reactivity APIs

A new API to use Vue's reactivity outside of a Vue instance!

```js
import { ref, computed, watchEffect } from 'vue';

const repositories = ref([]);
const filters = ref({ ... });
const searchQuery = ref('');

const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.map(
        repository => repository.name.includes(searchQuery.value)
    );
});

// ...

watchEffect(() => console.log('updated:', repositoriesMatchingSearchQuery))
```

Complete API available in [the documentation](https://v3.vuejs.org/api/basic-reactivity.html).

Notes:
- Already used by developers to create reactive wrappers around file system for instance
- What about lifecycle hooks? We won't need them anymore thanks to the Composition API

##--##

<!-- .slide: data-type-show="prez" -->

## Introducting the Composition API

<div style="height:600px; width:100%">
    <img class="full-height center" src="https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1570466251996_04-logical-concerns.jpg?alt=media&token=da79b1b0-c956-4dae-aaa8-d22e67ec1714">
</div>

Schema from [Vue Mastery's course](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/).

Notes:
- Feature splitting instead of technical splitting

##--##

<!-- .slide: data-type-show="prez" -->

## Introducting the Composition API

TODO: Code with a setup

Notes:

##--##

<!-- .slide: class="transition" -->

# Demo effect!