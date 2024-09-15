

document.addEventListener("DOMContentLoaded", function() {
   const countryAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/travel/countries.php';
   const photoAPI = 'https://www.randyconnolly.com/funwebdev/3rd/api/travel/images.php';
   const imageURL = 'https://www.randyconnolly.com/funwebdev/3rd/images/travel/square150/';

   const loader1 = document.getElementById('loader1');
   const loader2 = document.getElementById('loader2');
   const countriesSelect = document.getElementById('countries');
   const resultsSection = document.getElementById('results');

  
   loader1.style.display = 'none';
   loader2.style.display = 'none';
   resultsSection.style.display = 'none';

 
   document.getElementById('fetchButton').addEventListener('click', async function() {
      loader1.style.display = 'inline-block';
  
      try {
         const response = await fetch(countryAPI);
         const countries = await response.json();
         populateCountries(countries);
      } catch (error) {
         console.error('Error fetching countries:', error);
      } finally {
         loader1.style.display = 'none';
      }
   });

  
   countriesSelect.addEventListener('change', async function() {
      loader2.style.display = 'inline-block';
      
      const countryCode = this.value;
      try {
         const response = await fetch(`${photoAPI}?iso=${countryCode}`);
         const photos = await response.json();
         displayImages(photos);
      } catch (error) {
         console.error('Error fetching images:', error);
      } finally {
         loader2.style.display = 'none';
         resultsSection.style.display = 'block';
      }
   });

  
   function populateCountries(countries) {
      countries.forEach(country => {
         const option = document.createElement('option');
         option.value = country.iso;
         option.textContent = country.name;
         countriesSelect.appendChild(option);
      });
   }

   
   function displayImages(photos) {
      resultsSection.innerHTML = '';
      photos.forEach(photo => {
         const img = document.createElement('img');
         img.src = `${imageURL}${photo.filename}`;
         resultsSection.appendChild(img);
      });
   }
});
