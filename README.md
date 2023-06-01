# PreState

PreState is a lightweight JavaScript library that empowers you to efficiently manage and control state in your web applications. With PreState, you can easily handle data and enable reactive behavior, resulting in more organized and dynamic projects.

## Key Features

- **Simplified State Management**: PreState simplifies state management by providing a streamlined API for creating and updating state variables. With its intuitive syntax, you can focus on your application's logic instead of worrying about the intricacies of state management.

- **Effortless State Control**: Take control of your state with PreState's powerful functionality. You can define middleware functions to intercept and modify state updates before they are applied, allowing for fine-grained control and customization.

- **Flexible Integration**: PreState seamlessly integrates into any JavaScript project, offering a versatile solution for managing data across components, modules, and even complex UI structures. It can adapt to a wide range of use cases, providing consistency and coherence in your application's state management.

- **Lightweight and Efficient**: Built with performance in mind, PreState is designed to be lightweight and efficient. It has a minimal impact on your application's overall performance, ensuring smooth and responsive user experiences.

## Installation

You can install PreState via npm :

`npm install prestate`

   or 

`<script src="https://unpkg.com/prestate@1.0.4/index.js"></script>`

#Basic usage

Here is an example that demonstrates how to use PreState to create a simple counter:
```js
import State from 'prestate';

const [ getCount, setCount, onCountUpdates ] = new State(0).use();

// Register a callback for count updates
onCountUpdates((newValue) => {
console.log('Count updated:', newValue);
});

// Increment the count
setCount((currentCount) => currentCount + 1);
```
In this example, we import the `State` class and create a new state variable called count initialized with a value of **0**. Using array destructuring, we assign the` getCount, setCount, onCountUpdates` functions to corresponding variables.

The `onCountUpdates` function allows you to register a callback that will be invoked whenever the count state is updated. In this case, we simply log the updated value to the console.

To increment the count, we use the `setCount` function, which takes a callback as an argument. The callback receives the current value of the **count** state and returns the updated value.

By executing `setCount((currentCount) => currentCount + 1)`, the count state is updated, triggering the registered callback and logging the updated value to the console.

#Primitives

### State class
```js
const [ getColor , setColor , onColorUpdates ] = new State('red').use();
```
as we can see here the `State` class which has `use()` method that returns array we assign the` getColor`, `setColor`, `onColorUpdates` functions to corresponding variables.

##### getColor 
it is function that returns the current value of the state. 
```js
console.log(getColor());
// => red
```
##### setColor 
its is function , which takes a callback as an argument and has two parameter `current value` and `old value` and  returns  the new value of the state. 
```js
console.log(getColor());
// => red
setColor((currentValue,oldValue)=> 'green' );
console.log(getColor());
// => green
```
##### onColorUpdates 
its is function , that takes a callback as an argument and has two parameter `new value` and  a `function` that reset the value of the state to the old value and returns the old value , the callback function will run whenever the value of the state changes. 
```js
onColorUpdates((newValue,setOld)=>{
console.log(`my new color is ${newValue} ,now my color is ${setOld()}`);
});
setColor((e)=>'green');
//  =>  my new color is green , now my color is red
console.log(getColor());
// => red
setColor((e)=>'blue');
 //  =>  my new color is blue , now my color is red
```
### Use method 

`use` it is method in the State class and  we've seen in the previous examples that the `use` method returns an array and we've used three functions from , in `use` methods we can give it two argument the first is the update function in the second is a object. 
##### Example 
```js
const myUpdateFun = (e) =>console.log(`my Money is $${e}`);
const [ getMoney , setMoney ] = new State(100).use(myUpdateFun);
 // => my money is $100
```
as we can see the function that we've passed to the `use` method was called in start without any updates , the difference between the function that we've passed as callback to set the `onUpdateFun` function in the previous examples and the function that we've passed to the `use` method  that the function in the `use` method will be called in the start , and you can stop it from running in the start by the second argument in the `use` method. 
```js
const [ getPrice , setPrice ] = new State(250).use( onPriceUpdates , { runUOS : false } );
```
as we see that the object a property `runUOS` and it is by default true and when you set it to false the function that we passed as callback to the first argument won't be called in the start 

### UseCoust method 
`useCoust` it is method in the State class and it returns value of the State and it works as constant variable.
##### Example 
```js
const Salary = new State(2400).useConst();
console.log(`my salary is $${Salary}`);
// => my salary is $2400
```

### Middleware method
`middleware` it is method in the State class that you can you it to add middleware function that will be called before the `onStateChange` function called , middleware will help you control and modify your new value before your can use it.

##### Example Toggle 
```js
const myNav = new State(document.getElementById('mynav')).useConst();
const myBut = new State(document.getElementById('mybut')).useConst();
```
###### without middleware
```js
const onToggled = (e) => myNav.style.display = e ? 'flex' : 'none' ;
const [,setToggle ] = new State(true).use(onToggled);
// <nav id="myNav" style="display:flex" >...

myBut.onclick = ()=> setToggle(e=>!e);
// <nav id="myNav" style="display:none" >...

```
###### with middleware
```js
const onToggled = (e) => myNav.style.display = e;
const getDisplay = (e)=> e ? 'flex' ; 'none';
const [,setToggle ] = new State(true).middleware(getDisplay).use(onToggled,{runMOS:true} // middleware by defalute wont' run on start so we have to the `run MOS` property to true to allow them
);
// <nav id="myNav" style="display:flex" >...

myBut.onclick = ()=> setToggle(e=>!e);
// <nav id="myNav" style="display:none" >...

```
as we can see here that the **middleware** will be called before the `onToggled` function and returns the value that the `onToggled` will take as an argument, The **middleware** recommended to use in the complex logic and you can add as much as your needs from them, the callback that you put in `middleware` method has two arguments one is the new value the second is the old value 

```js 
const myMiddleware = (newValue,oldValue)=>{
  console.log(`the new value is ${newValue}, the old value is ${oldValue}`);
  return newValue ;
}
const [,setColor] = new State('blue').middleware(myMiddleware).use();

setColor(()=>'green');
// => the new value is green, the old value is blue

```

### this library is still under development 

### **Have fun!**

