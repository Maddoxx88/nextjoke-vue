<template>
  <div class="home">
    <!-- <h1 class="landing-text">Grab a Joke!</h1> -->
    <button class="click-btn" @click="fetchJoke">Grab a joke</button>
    <div v-if="jokeRes">
      <h2 id="setup">Setup - {{ setup }}</h2>
      <h2 id="punchline">Punchline - {{ punchline }}</h2>
    </div>
    <!-- <h3>Read some news!</h3> -->
    <!-- <button @click="fetchNews">Click here</button> -->
    <div v-if="newsRes">
      <img :src="imgUrl" alt="" width="350" height="250">
      <hr>
      <h2>Title - {{ title }}</h2>
      <hr>
      <h2>Desc - {{ desc }}</h2>
      <hr>
      <h4>Written By - {{ author }}</h4>
    </div>
    <share-it :text="jokeWA" :height="600" :width="600" :targets="['whatsapp', 'twitter', 'reddit', 'linkedin']" url=" "/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      setup: '',
      punchline: '',
      articles: '',
      title: '',
      url: '',
      desc: '',
      author: '',
      imgUrl: '',
      jokeRes: false,
      newsRes: false,
      jokeWA: ''
    }
  },
  methods: {
    hey() {
      console.log("HEY");
    },
    fetchJoke() {
      fetch("https://official-joke-api.appspot.com/random_joke")
      .then(response => { 
          if(response.ok){
              return response.json()    
          } else{
              console.log("Server returned " + response.status + " : " + response.statusText);
          }                
      })
      .then(response => {
          this.setup = response.setup; 
          this.punchline = response.punchline; 
          this.jokeWA = this.setup + '%0A' + this.punchline;
          console.log(this.jokeWA);
          this.jokeRes = true;
      })
      .catch(err => {
          console.log(err);
      });
    },
    fetchNews() {
      fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=55e09b1c63f5492fb176a9848f41c8fb&category=technology&pageSize=1")
      .then(response => { 
          if(response.ok){
              return response.json()    
          } else{
              console.log("Server returned " + response.status + " : " + response.statusText);
          }                
      })
      .then(response => {
        for (let index = 0; index < response.articles.length; index++) {
            this.title = response.articles[index].title; 
            this.desc = response.articles[index].description; 
            this.author = response.articles[index].author; 
            this.imgUrl = response.articles[index].urlToImage; 
        }
        // for (let index = 0; index < 1; index++) {
        //   const element = array[index];
        //   console.log(this.articles[0]);
          
        // }
          this.newsRes = true;
      })
      .catch(err => {
          console.log(err);
      });
    }
  }
}
</script>

<style lang="css" scoped>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

.landing-text {
  color: #EF3232;
  margin: 10px auto;
  padding: 20px;
}

.click-btn {
  color: black;
  background-color: #EF3232;
  text-decoration: none;
  border: none;
  outline:none;
  border-radius: 40px;
  padding: 0;
  padding: 15px 45px;
  font-size: 24px;
  font-weight: 800;
  margin-left: 45%;
  margin-bottom: 25px;
  display: block;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
}

#setup, #punchline {
  color: #EF3232;
  font-family: 'Lato', sans-serif;
  font-size: 48px;
}

</style>