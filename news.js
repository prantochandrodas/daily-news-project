// fetch news category
const loadNewsCategory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.news_category))
}

// display news catogory
const displayData = categories => {
  const categoriesContainer = document.getElementById('news-container');
  categories.forEach(category => {
    console.log(category)
    const div = document.createElement('div');
    
    div.innerHTML =
      `
      <ul class="list-inline">
      <li class="list-inline-item listStyle fs-5"  onclick="loadDetails('${category.category_id}')">${category.category_name}</li>
     
    </ul>
    `
    categoriesContainer.appendChild(div);


  });
}
 // fetech dynamic url for details
const loadDetails = id => {
  toggleSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
    .catch(err => console.log(err))
}

// display details
const displayDetails = news => {
  news.sort(function(a,b){
        return b.total_view-a.total_view;
  });
  console.log(news);
  const postTotal = document.getElementById('postTotal');
  postTotal.innerText=news.length;
   console.log(news.length);
  
  news=news.slice(0,10);
  const noNews = document.getElementById('noNews');
  if(news.length===0){
    noNews.classList.remove('d-none');
  }else{
    noNews.classList.add('d-none');
  }
  const allNewsContainer = document.getElementById('allNews-container');
  allNewsContainer.innerHTML="";
  news.forEach(news => {
    
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('container');
    newsDiv.innerHTML =
      `  <div class="card mb-3" >
    <div class="row g-0">
        <div class="col-md-4 p-3">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title">${news.title}</h3>
                <p class="card-text fs-5">${news.details.slice(0, 200)}...</p>
                <div>
                     <img style="width:50px;  border-radius: 50%;" src="${news.author.img}">
                      <span class="ms-2 fw-bold">${news.author.name ? news.author.name : 'No author Founded' }</span>
                      <span class="ms-5 fw-bold"> <i class="fa fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 0 }</span><br><br>
                      <button class="btn btn-primary" onclick="loadModal('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                      
                </div>
            </div>
        </div>
    </div>

</div>`
allNewsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
  
}

const loadModal=ModalId=>{
  
  fetch(`https://openapi.programming-hero.com/api/news/${ModalId}`)
  .then(res => res.json())
  .then(data => displayModalDetails(data.data[0]))
  .catch(err => console.log(err))
}
const displayModalDetails=data=>{
  console.log(data);
  const modalDetails = document.getElementById('news-new-details');
  modalDetails.innerHTML=
  `<h3>Author Name : ${data.author.name ? data.author.name : 'No name found'}
 <h4>Author Image:<?> <img style="width:50px" src="${data.author.img ? data.author.img : 'No image found'}">
 <h4>Post Views: ${data.total_view ? data.total_view : 0}<h4>
 <span>Published Date: ${data.author.published_date ? data.author.published_date : 'No data Founded'}</span>` 
}

const toggleSpinner = isLoading=>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none')
  }
}
loadDetails('01');
loadNewsCategory();