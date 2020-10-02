<!-- .slide: class="transition blue" -->

# The new features

##==##
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

##--##
<!-- .slide: class="blue with-code" -->

## Async components

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

##--##
<!-- .slide: class="blue" -->

## Multiple v-model

##--##
<!-- .slide: class="blue" -->

## Portals / Teleport

##--##
<!-- .slide: class="blue" -->

## Custom directives 

Notes: Maybe not useful ?
