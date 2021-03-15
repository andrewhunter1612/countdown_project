<template>
    <section>
      <form @submit.prevent="submitWords">
        <div id="player-input-form">
          <div class="player-input">
            <label for="player_one_input">Your word: </label>
            <input type="text" name="player_one_input" v-model="playerOneWord" required >
            <p v-if="submitClicked && !pOneWord">This is not a word</p>
            <button class="definition-button" v-if="submitClicked && !definitionOneClicked && pOneWord" @click="getWordDefinition('Player One')">Definition</button>
            <p class="definition" v-if="submitClicked && definitionOneClicked && pOneWord">{{playerOneMeaning}}</p>

          </div>

          <!-- <div class="player-input">
            <label for="player_two_input">Player 2 word: </label>
            <input type="text" name="player_two_input" v-model="playerTwoWord" required >
            <p v-if="submitClicked && !pTwoWord">
              {{ playerTwoMeaning }}
            </p>
            <button class="definition-button" v-if="submitClicked && !definitionTwoClicked && pTwoWord" @click="getWordDefinition('Player Two')">Definition</button>
            <p class="definition" v-if="submitClicked && definitionTwoClicked && pTwoWord">{{playerTwoMeaning}}</p>
          </div> -->
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
      props: ['players', 'fullGame', 'currentPlayer'],
            
      data(){
        return{
          playerOneMeaning: "",
          playerTwoMeaning: "",
          playerOneWord: "",
          playerTwoWord: "",
          submitClicked: false,
          definitionOneClicked: false,
          definitionTwoClicked: false
        }
      },
      methods:{
        submitWords(){
          const words = [
            {
              name: "Player One", 
              word: this.playerOneWord
            },
            {
              name: "Player Two",
              word: this.playerTwoWord
            }
          ]
          eventBus.$emit('player-words', words)
          this.submitClicked = true
        },

        nextRound(){
          eventBus.$emit('next-round')
          this.resetEverything()
        },
        
        getWordDefinition(playerName){
          for (let player of this.players){
            if (playerName == player.name && player.word.length > 0){
              fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${player.word}`)
              .then((res) => res.json())
              .then((data) => {
                if (playerName === 'Player One'){
                  this.playerOneMeaning = data[0].meanings[0].definitions[0].definition
                  this.definitionOneClicked = true
                } else if (playerName === 'Player Two') {
                  this.playerTwoMeaning = data[0].meanings[0].definitions[0].definition
                  this.definitionTwoClicked = true
                } 
              })
            } else if (player.name === playerName && !player.word) {
              if (player.name === 'Player One'){
                this.playerOneMeaning = "Not a word"
                this.definitionOneClicked = true
              }
              else if (player.name === 'Player Two') {
                this.playerTwoMeaning = "Not a word"
                this.definitionTwoClicked = true
              }
            }       
          }
        },
        resetEverything(){
          this.submitClicked = false
          this.playerOneWord = ""
          this.playerTwoWord = ""
          this.playerOneMeaning = ""
          this.playerTwoMeaning = ""
          this.definitionOneClicked = false
          this.definitionTwoClicked = false
          eventBus.$emit('reset-everything')
        }
      },
      computed:{
        pOneWord: function(){
          let wordToReturn = "empty"
          this.players.filter((player) => {
            if (player.name === 'Player One'){
              wordToReturn = player.word
            }
          })
          return wordToReturn
        },
        pTwoWord: function(){
          let wordToReturn = "empty"
          this.players.filter((player) => {
            if (player.name === 'Player Two'){
              wordToReturn = player.word
            }
          })
          return wordToReturn
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