<!-- .slide: class="transition blue" -->

# The new features

##--##
<!-- .slide: class="blue" -->

## The Reactivity API

##--##
<!-- .slide: class="blue" -->

## The Composition API

##--##
<!-- .slide: class="blue with-code" -->

## Fragments
Now you can create components with multiple root nodes

```html
<template>
  <div>Hello</div>
  <div>World</div>
</template>
```

<br/>

(that was possible with vue-fragments in Vue.js 2)

Notes: if multiple sub-components, you must specify who get the attribute binding

##--##
<!-- .slide: class="blue with-code" -->

## Async components

Before:
```javascript
const asyncPage = () => import('./NextPage.vue')
```

After:
```javascript
import { defineAsyncComponent } from 'vue'

// Async component without options
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

// Async component with options
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```

Notes: https://v3.vuejs.org/guide/migration/async-components.html#overview

##--##
<!-- .slide: class="blue with-code" -->

## Suspense

Allow to render a fallback component until a condition is met
```html
<Suspense>
  <template #default>
    <UserProfile />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

Works automatically with Async components and can be used with vue-router!

##--##
<!-- .slide: class="blue with-code" -->

## Multiple v-model

2-way binding on multiple values: 
 
```html
<InviteeForm
  v-model:name="inviteeName"
  v-model:email="inviteeEmail"
/>
```

##--##
<!-- .slide: class="blue with-code" -->

## Portals / Teleport

Special components meant to render certain content outside the current component

```html
<portal to="destination">
  <p>This slot content will be rendered wherever the portal-target with name 'destination' is  located.</p>
</portal>

<portal-target name="destination">
  <!--
  This component can be located anywhere in your App.
  The slot content of the above portal component will be rendered here.
  -->
</portal-target>
```

Useful for modals for example

Notes: or dynamic content that changes according to the page
But be careful about the readability of the code 

##--##
<!-- .slide: class="blue with-code" -->

## Custom directives 

Custom directives API are aligned with components lifecycle

Before
```javascript
const MyDirective = {
  bind(el, binding, vnode, prevVnode) {},
  inserted() {},
  update() {},
  componentUpdated() {},
  unbind() {}
}
```

After
```javascript
const MyDirective = {
  beforeMount(el, binding, vnode, prevVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {}, // new
  unmounted() {}
}
```

Notes: should help the newcomers understand when the different functions are called

##--##
<!-- .slide: class="blue with-code" -->

## Filters

Filters are *removed*

Replacements are method calls or computed properties on the Component level.

Or use a global definition:

```javascript
// main.js
const app = createApp(App)

app.config.globalProperties.$filters = {
  accountInUSD(num) {
    return '$' + num
  }
}
```
```html
<template>
  <h1>Bank Account Balance</h1>
  <p>{{ $filters.accountInUSD(accountInUSD) }}</p>
</template>
```

Notes: because now it's easy to define global function that can be used across the application. 
You can implement Vuex yourself easily. 
