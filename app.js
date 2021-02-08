const searchButton = document.getElementById('search-button');
const foodItems = document.getElementById('meal');
const foodDetails = document.getElementById('food-details');

//event listener
searchButton.addEventListener('click', getFoodList);

//get meal list that matches with name
function getFoodList(){
   let searchInput = document.getElementById('food-input').value.trim();
   if(searchInput === ""){
      alert("Sorry, We did't find any meal");
   }
   else{
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
   .then(response => response.json())
   .then(data => {
      let html = "";
      if(data.meals){
         data.meals.forEach(meal => {
            html += `
               <div onclick="displayFoodDetails('${meal.idMeal}')" id = "search-item" data-id = "${meal.idMeal}">
                  <div class="food-img">
                     <img src="${meal.strMealThumb}" alt="">
                  </div>
                  <div class="food-title">
                     <h4>${meal.strMeal}</h4>
                  </div>
               </div>
            `;
         });
         foodItems.classList.remove('not-found');   
      } 
      else{
         html = "Sorry, We did't find any meal";
         foodItems.classList.add('not-found');
      }
      foodItems.innerHTML = html;
   });
  }
}

//get ingredients for selected items
const displayFoodDetails = id =>{
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
   .then(response => response.json())
   .then(data => {
      let item = data.meals[0];
      let ingredients = "";
      for(i = 1; i <= 7; i++){
         ingredients += `<li> ${item["strIngredient" + i]}</li>`;
      }
      foodDetails.innerHTML = `
         <img src="${item.strMealThumb}"/>
         <h3>${item.strMeal}</h3>
         <h5>Ingredients:</h5>
         <ul>${ingredients}</ul>
      `;
   });
}