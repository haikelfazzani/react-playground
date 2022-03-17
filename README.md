# Vconsole: advanced console

- [x] Typescript
- [x] Coffeescript
- [x] LiveScript

### Embed
```js
// Params: theme - code - language
const code = encodeURIComponent(btoa("console.log('hello')"));
const language = 'livescript'; 
const theme = 'vs-dark'; // or 'vs-light'

// -> https://vconsole.vercel.app?language=language&code=code&theme=theme
```

### Todo
- [ ] PWA
- [ ] Samples

# License
MIT