const fs = require('fs');
// const book = {
//     title: 'Alchemist',
//     author: 'paulo'
// }

// const b=JSON.stringify(book);
// fs.writeFileSync("1-json.json",b)
const a = fs.readFileSync('1-json.json')
console.log(a.title)
console.log(a.toString())
const c = JSON.parse(a)
console.log(c)
c.name = "nishuu"
c.lname = "b"
c.age = 26
const j = JSON.stringify(c)
console.log(j)
fs.writeFileSync("1-json.json",j)
// console.log(b.title)
// const p = JSON.parse(b)
// console.log(p.title)