# taro-tailwind

Like using [Tailwind](https://tailwindcss.com/)? You can use it in Taro with a little help from this package!

# Usage

First, install the package into your project

```bash
npm install --save taro-tailwind
```

Then you can use it in a couple ways:
 1. [Pre Built CSS](#1-pre-built-css) (Quickest for protyping)
 2. [Build the CSS based on your own config](#2-build-the-css-based-on-your-own-config)
 3. [Use as a PostCSS plugin](#3-use-as-a-postcss-plugin) (Recommended)


## 1. Pre Built CSS

Import the built css based on the default tailwindcss config from `taro-tailwind/dist/tailwind.css`

This is the easiest and quickest way to try out Tailwind in Taro, but you are limited to the default config.

There are a couple ways to do this, for example in a Vue component you can add

```html
<style src="taro-tailwind/dist/tailwind.css" />
```

Or import it in a css file

```css
@import "taro-tailwind/dist/tailwind.css"
```

Or import it in your `main.js`

```js
import 'taro-tailwind/dist/tailwind.css'
```

## 2. Build the CSS based on your own config

This package ships with an executable script which can build your css file using your own tailwind config.

```bash
node node_modules/.bin/taro-tailwind tailwind.config.js
# or
npx taro-tailwind tailwind.config.js
```

## 3. Use as a PostCSS plugin

If you're using PostCSS, you can [install tailwind according to their official docs](https://tailwindcss.com/docs/installation/), and then include the `taro-tailwind` postcss plugin.

```js
// postcss.config.js

module.exports = {
  plugins: [
    // ...
    require('tailwindcss'),
    require('taro-tailwind'),
    // ...
  ]
}
```
