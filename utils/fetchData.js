const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'bf5a77d6a7mshf9752c0a90be373p113122jsn65c9f615a136',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': 'd3277c5906msh0bec42be8356d6ep17f2d8jsn09226feabc10',
  },
};

const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

module.exports = { exerciseOptions, youtubeOptions, fetchData }



// const apiUrl = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD';
// const apiKey = '8676D644-45F8-4A8D-972A-547EF1F666E3';


// const detail = async () => {
//   const data = await fetch(apiUrl, {
//     method: 'GET',
//     headers: {
//       'X-CoinAPI-Key': apiKey,
//     },
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`HTTP Error! Status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // const info = data
//       // Handle the JSON response here

//       ExerciseData(data.rate)

//       console.log(data);
//     })
//     .catch(error => {
//       // Handle any errors here
//       console.error('Fetch Error:', error);
//     });

//   // console.log(info);
// }

// detail();




// const options = {
//   method: 'GET',
//   params: {
//     from: 'USD',
//     to: 'INR',
//     q: '1.0'
//   },
//   headers: {
//     'X-RapidAPI-Key': 'd3277c5906msh0bec42be8356d6ep17f2d8jsn09226feabc10',
//     'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
//   }
// };



// const ExerciseData = async (rate) => {
//   const response = await fetchData('https://currency-exchange.p.rapidapi.com/exchange', options)
//   console.log(response);
//   console.log(response * rate);

// }


