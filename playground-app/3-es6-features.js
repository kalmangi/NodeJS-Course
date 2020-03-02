const product = {
    name: 'product name',
    description:'ddd',
    features:'dddsaaa',
}

const {label:name, description, rating=5} = product; //This s object destructuring same as 'name:product.name'
console.log(name);
console.log(rating)
//destructuring stores undefined if there is no property available in object

const trans = (type, {name,description}) =>{
console.log(type)
console.log(name)
console.log(description)
}

trans('product', product)