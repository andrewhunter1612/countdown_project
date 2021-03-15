<template>
  <div>
    <button v-if="!stopTimer" @click="stopTimerButton" id="stop-button">Stop Timer</button>
    <!-- <button @click="startTimer" id="stop-button">Start Timer</button> -->
    <div v-if="stopTimer">
    <form @submit.prevent="submitWords">
      <div id="player-input-form">
        <div class="player-input">
            <label for="playerOne">Player One: </label>
            <input type="text" name="playerOne" v-model="playerOneWord">
        </div>
    
        <!-- <div class="player-input">  
            <label for="playerTwo">Player Two: </label>
            <input type="text" name="playerTwo" v-model="playerTwoWord" >
        </div> -->
      </div>

      <input id="submit-button" type="submit" value="Submit Answer">
    </form>
    </div>
  </div>
</template>

<script>
import {eventBus} from '@/main.js'

export default {

    props:['fullGame', 'stopTimer'],
    data(){
        return {
            playerOneWord: "",
            playerTwoWord: ""
        }
    },

    methods: {
        submitWords(){
            let conundrumWord={}
            if (this.playerOneWord.length >0){
                conundrumWord = {name: "Player One", word: this.playerOneWord}
            } else if (this.playerTwoWord.length >0){
                conundrumWord = {name: "Player Two", word: this.playerTwoWord}
            }
            eventBus.$emit('conundrum-answered', conundrumWord)
        },

        stopTimerButton(){
          eventBus.$emit('stop-timer-button')
        },

        startTimer(){
          eventBus.$emit('start-timer-button')
        }
    },
    mounted(){
      eventBus.$on('reset-everything', () => {
        this.playerOneWord = ""
        this.playerTwoWord = ""

    })
  }

}
</script>

<style lang="css" scoped>



.player-input{
  display: grid;
  justify-content: center;
  margin: 0px 30px;
}

.player-input>label{
  text-align: center;
  margin-bottom: 5px;
}

.player-input>input{
  font-size: x-large
}

#player-input-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#submit-button{
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

#submit-button:hover{
  background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}

#submit-button:active{
  position:relative;
	top:1px;
}

#stop-button:hover{
  background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}

#stop-button:hover{
  position:relative;
	top:1px;
}

</style>