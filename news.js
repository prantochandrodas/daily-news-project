const loadNewsCategory =()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayData(data.data.news_category))
}
const displayData=categories=>{
    const categoriesContainer = document.getElementById('news-container');
    categories.forEach(category=>{
      const div = document.createElement('div');
      div.innerHTML=
      `
      <ul class="list-inline">
      <li class="list-inline-item listStyle fs-4">${category.category_name}</li>
     
    </ul>
    `
      categoriesContainer.appendChild(div);


    });
}
loadNewsCategory();