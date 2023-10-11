# Hide Value

### Default null

```typescript
const result = HideValue.from({
  name: "Honny",
  age: 23,
  infos: { ammount: 1112.22 },
});

console.log(result); // { name: null, age: null, infos: { ammount: null } }
```

### Custom default

```typescript
const result = HideValue.from(
  {
    name: "Honny",
    age: 23,
    infos: { ammount: 1112.22 },
  },
  { default: "-" }
);

console.log(result); // { name: '-', age: '-', infos: { ammount: '-' } }
```

### Use Boolean

```typescript
const result = HideValue.from(
  {
    name: "",
    age: 23,
    infos: {},
  },
  { useBoolean: true }
);

console.log(result); // { name: false, age: true, infos: {} }
```
