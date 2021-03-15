<template>
    <section>
      <form @submit.prevent="submitWords">
        <div id="player-input-form">
          <div class="player-input">
            <label for="player_one_input">Your word: </label>
            <input type="text" name="player_one_input" v-model="playerOneWord" required >
            <p v-if="falseWord">This is not a word</p>
          </div>

        </div>
        <div id="submit-button" >
          <input v-if="!submitClicked" type="submit" value="Submit Word">
          <button v-if="submitClicked && fullGame" @click="nextRound">Next Round</button>
          <button v-if="submitClicked && !fullGame" @click="resetEverything">Reset Game</button>
        </div>
      </form>
  </section>
</template>

<script>
import {eventBus} from '@/main.js'

    export default {
      props: ['players', 'fullGame', 'currentPlayer', 'falseWord'],
            
      data(){
        return{
          playerOneMeaning: "",
          playerOneWord: "",
          submitClicked: false,
          definitionOneClicked: false,
        }
      },
      methods:{
        submitWords(){
          const words = {
              name: this.currentPlayer.name, 
              word: this.playerOneWord
              }
          
          eventBus.$emit('player-word', words)
          this.submitClicked = true
        },

        nextRound(){
          eventBus.$emit('next-round')
          this.resetEverything()
        },
        
       
        resetEverything(){
          this.submitClicked = false
          this.playerOneWord = ""
          this.playerOneMeaning = ""
          this.definitionOneClicked = false
          eventBus.$emit('reset-everything')
        }
      },

    }
</script>

<style lang="css" scoped>



.player-input{
  display: grid;
  justify-content: center;
  margin: 0px 30px;
  font-size: 25px;
  align-self: start;
}

.player-input>label{
  text-align: center;
  margin-bottom: 5px;
  color: #034078;
  font-size: 30px;
  font-weight: 500;
  text-shadow: 0 0 8px white;
}


.player-input>input{
  font-size: x-large
}

#player-input-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 60px;
}


#submit-button{
  display:grid;
  justify-content: center;
  
}

#submit-button>input{
  box-shadow:inset 0px 1px 0px 0px #97c4fe;
  background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
  background-color:#3d94f6;
  border-radius:6px;
  border:1px solid #337fed;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:large;
  font-weight:bold;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0px 1px 0px #1570cd;
  margin: 20px 40px;
  width: 180px;
  height: 100px
}

#submit-button>input:hover {
	background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}

#submit-button>input:hover {
  position:relative;
	top:1px;
}

#submit-button>button{
  box-shadow:inset 0px 1px 0px 0px #97c4fe;
  background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
  background-color:#3d94f6;
  border-radius:6px;
  border:1px solid #337fed;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:large;
  font-weight:bold;
  padding:6px 24px;
  text-decoration:none;
  text-shadow:0px 1px 0px #1570cd;
  margin: 20px 40px;
  width: 180px;
  height: 100px
}

#submit-button>button:hover {
	background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}
#submit-button>button:active {
	position:relative;
	top:1px;
}

.definition-button {
  box-shadow:inset 0px 1px 0px 0px #78f098;
	background:linear-gradient(to bottom, #69e356 5%, #4acc5d 100%);
	background-color:#69e356;
	border-radius:6px;
	border:1px solid #7aad23;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #74a822;
  margin: 20px 50px;
}

.definition-button:hover {
	background:linear-gradient(to bottom, #4acc5d 5%, #69e356 100%);
	background-color:#1e62d0;
}
.definition-button:active {
	position:relative;
	top:1px;
}


.definition {
  max-width: 275px;
  color: #034078;
}

</style>