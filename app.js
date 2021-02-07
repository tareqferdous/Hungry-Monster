const searchButton = document.getElementById('search-button');
const foodItems = document.getElementById('meal');
const foodDetails = document.getElementById('food-details');
const single_mealEl = document.getElementById("single-meal");

//event listener
searchButton.addEventListener('click', getFoodList);

//get meal list that matches with name
function getFoodList(){
   let searchInput = document.getElementById('food-input').value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
   .then(response => response.json())
   .then(data => {
      let html = "";
      if(data.meals){
         data.meals.forEach(meal => {
            html += `
               <div id = "search-item" data-id = "${meal.idMeal}">
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

