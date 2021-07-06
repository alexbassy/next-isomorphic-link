[![CircleCI](https://circleci.com/gh/alexbassy/next-isomorphic-link.svg?style=svg)](https://circleci.com/gh/alexbassy/next-isomorphic-link)

# next-isomorphic-link

A tiny Next.js `<Link/>` wrapper that improves server-side rendered output with better keyboard navigation support

### Usage

```
yarn add next-isomorphic-link
```

Replace import from of `next/link` with `next-isomorphic-link`:

```diff
- import Link from 'next/link'
+ import Link from 'next-isomorphic-link'
```

### Why

The default `<Link/>` component usage looks like this (as of Next 9):

```jsx
<Link href='/puppies'>
  <a>Puppies</a>
</Link>
```

When you view the source, or disable JavaScript, the markup will look like this:

```html
<a>Puppies</a>
```

There are a few issues here:

- `<a>` tags without `href` attributes are not tabbable (you can’t tab around the page)
- When the page has’nt been rendered client side (e.g. JS disabled, slow network speed) the link will not be clickable
- Once the bundle has been executed and the page is interactive, hitting `Enter` (or the spacebar if you have that option enabled) when focussed on the link will have no effect.

These are easy to fix:

- Add the `href` attribute to the child `<a>` in the server-rendered markup (and remove it when mounted)
- Add a `tabIndex` of `0` to the client-side rendered link to ensure tabbability (if that is a word)
- Add an event handler for the Enter key

## Changelog

- 0.2.5: Added TypeScript declaration file
- 0.2.3: Bump peer dependency version
