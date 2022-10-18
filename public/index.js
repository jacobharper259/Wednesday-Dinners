document.getElementById('submitPass').addEventListener('click', login)

async function login(){
    try{
        if(localStorage.getItem('loginPass')){
            body= JSON.stringify({password: localStorage.getItem('loginPass')})
        }else{
            body = JSON.stringify({password: document.querySelector('.password').value})
        }
        const response = await fetch(window.location.origin + '/login', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: body
        })
        const data= await response.json()
        console.log(data)
        if(data!== null){
            if(!localStorage.getItem('loginPass')){
                localStorage.setItem('loginPass',data.password)
            }
            if(!localStorage.getItem('loginName')){
                localStorage.setItem('loginName',data.name)
                location.reload()
            }
            runItAll()
        }else{
            document.querySelector('.password').value = ''
        }
        
    }
    catch(error){
        console.log(error)
    }
}
if(localStorage.getItem('loginPass')){
    login()
}
function runItAll(){
document.querySelector('.login').classList.add('hidden')
document.querySelector('.wrapper').classList.remove('hidden')
for(i=1;i<=20;i++){
    let ingredientInput = document.createElement('input')
    ingredientInput.type = 'text'
    ingredientInput.classList.add('conIngredient')
    ingredientInput.placeholder=`Ingredient ${i}`
    document.querySelector(".conIngredients").appendChild(ingredientInput)
}


for(i=1;i<=20;i++){
    let stepInput = document.createElement('input')
    stepInput.type = 'text'
    stepInput.classList.add('conStep')
    stepInput.placeholder=`Step ${i}`
    document.querySelector(".conSteps").appendChild(stepInput)
}
for(i=1;i<=10;i++){
    let equipmentInput = document.createElement('input')
    equipmentInput.type = 'text'
    equipmentInput.classList.add('conEquip')
    equipmentInput.placeholder=`Equipment ${i}`
    document.querySelector(".conEquipment").appendChild(equipmentInput)
}
document.getElementById('submitRecipe').addEventListener('click', PostRecipe)
console.log(window.location.origin)



async function GetRecipes(){
    try{
        const response = await fetch(window.location.origin + '/db/')
        const data = await response.json()
        data.forEach((item,i)=>{
            createRecipe(item,i)
        })
    }
    catch(error){
        console.log(error)
    }
}
GetRecipes()

function createRecipe(item,i){
    let newRecipe = document.createElement('div')
    newRecipe.classList = `recipe recipe${i}`
    document.querySelector('.recipes').appendChild(newRecipe)
    let recipeName = document.createElement('h2')
    recipeName.innerText=item.name
    newRecipe.appendChild(recipeName)
    let recipeAuth = document.createElement('i')
    recipeAuth.innerText= `By ${item.author}`
    newRecipe.appendChild(recipeAuth)
    function createDivsAndLists(elemName,elem,listType){
        let recipeIngredients = document.createElement('div')
        recipeIngredients.classList.add(`${elemName}`)
        newRecipe.appendChild(recipeIngredients)

        let ingredientUl =document.createElement(listType)
        recipeIngredients.appendChild(ingredientUl)

        elem.forEach((value)=>{
            let ingredient = document.createElement('li')
            ingredient.innerText=value
            ingredientUl.appendChild(ingredient)
        })
    }
    console.log(item.ingredients)
    let titleIng = document.createElement('h3')
    titleIng.innerText='Ingredients'
    newRecipe.appendChild(titleIng)
    createDivsAndLists('ingredients',item.ingredients,'ul')
    if(item.equipment.length>0){
    let titleEquip = document.createElement('h3')
    titleEquip.innerText='Equipment'
    newRecipe.appendChild(titleEquip)
    }
    createDivsAndLists('equipment',item.equipment,'ul')
    let titleSteps = document.createElement('h3')
    titleSteps.innerText='Steps'
    newRecipe.appendChild(titleSteps)
    createDivsAndLists('steps',item.steps,'ol')

}


async function PostRecipe(){
    let conIngredients = []
    let conSteps = []
    let conEquipment = []
    let conName = document.querySelector('.conName').value
    let conAuth = localStorage.getItem('loginName')
    document.querySelector('.conName').value = ''
    document.querySelectorAll('.conIngredients .conIngredient').forEach((element)=>{
        if(element.value!=''){
            conIngredients.push(element.value)
        }
        element.value=''
    })
    document.querySelectorAll('.conSteps .conStep').forEach((element)=>{
        if(element.value!=''){
            conSteps.push(element.value)
        }
        element.value=''
    })
    document.querySelectorAll('.conEquipment .conEquip').forEach((element)=>{
        if(element.value!=''){
            conEquipment.push(element.value)
        }
        element.value=''
    })

    let body = JSON.stringify({
        name:conName,
        ingredients:conIngredients,
        equipment:conEquipment,
        steps:conSteps,
        author:conAuth
        

    })
    console.log(body)

    try{
        const response = await fetch(window.location.origin + '/db/createRecipe', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: body
        })
        const data = await response.json()
        console.log(data)
    }
    catch(error){
        console.log(error)
    }
}


// document.querySelector('.conIngredient').addEventListener('click',(click)=>{
//     document.querySelectorAll('.selectedIng').forEach((elem)=>elem.classList.remove('selectedIng'))
//     click.target.classList.add('selectedIng')
// })
// document.querySelector('.conIngredient').addEventListener('keydown',(elem)=>{
//     if(! document.querySelector(`#ingredient${Number(document.querySelector('.selectedIng').id.split('ingredient')[1]) + 1}`)){
//         let ingredientInput = document.createElement('input')
//         ingredientInput.type = 'text'
        
//         ingredientInput.classList.add('conIngredient')
//         ingredientInput.placeholder=`ngredient ${Number(document.querySelector('.selectedIng').id.split('ingredient')[1]) + 1}`
//         ingredientInput.id=`ingredient${Number(document.querySelector('.selectedIng').id.split('ingredient')[1]) + 1}`
//         document.querySelector(".conIngredients").appendChild(ingredientInput)
//     }
// })





}