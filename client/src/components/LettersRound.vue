<template>
    <div>
      <section id="background">
        <div id="scores">
          <h2>Player 1: {{players[0].score}}</h2>
          <h2>LETTERS ROUND</h2>
          <h2>Player 2: {{players[1].score}}</h2>
        </div>
        
        <timer v-if="letters.length === 9 && !timerEnded" :times="currentTime"/>
        <letters-board :letters="letters"/>
        <letter-input v-if="letters.length < 9" />
        <submit-answers v-if="timerEnded" :players="players" :fullGame="fullGame"/>
      </section>
    </div>
</template>

<script>
import Timer from '@/components/Reusable/Timer.vue'
import LetterBoard from '@/components/Reusable/LetterBoard.vue'
import LetterInput from '@/components/Letters/LetterInput.vue'
import SubmitAnswers from '@/components/Letters/SubmitAnswers.vue'

import {eventBus} from '@/main.js'
  export default {
    props: ['fullGame', 'players'],

    data(){
      return {
        // letters: ['f', 'i', 'r', 'e', 'b', 'o', 'a', 'r', 'd'],
        letters:[],
        timerEnded: false,
        enteredWords: [],
        numberOfPlayers: 2,
        definition: "",
        currentWord: "",
        currentTime: [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
      }
    },

    methods:{
      checkWord(word, index){
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
          .then((res) => res.json())
          .then((data) => {
            if (word === data[0].word){
              this.checkEnterWordIsAllowed(word)
              //improve this, is there a way to make the output of a function equal to a variable?
              word = this.currentWord
              this.currentWord = ""
              this.createplayersArray(word, index)

              this.enteredWords.push({name: index, word: word})
              this.compareWordsLength()
            }
          })
          .catch((err) => {
            this.createplayersArray("", index)
            this.enteredWords.push({name: index, word: ""})
            this.compareWordsLength()
          })
      },

      createplayersArray(word, name){
        if (this.players.length === this.numberOfPlayers){
          this.players.filter((player) => {
            if (player.name === name){
              player.word = word
            }
          })
        } else {
          this.players.push({name: name, word: word, score: 0})
        }
      },

      compareWordsLength(){
        if (this.numberOfPlayers === this.enteredWords.length){
          let highestPlayers = [{word: ""}]
          for (let player of this.players){
            let word = player.word
            if (word.length > highestPlayers[0].word.length){
              highestPlayers[0] = player
            } else if (word.length === highestPlayers[0].word.length){
              highestPlayers.push(player)
            }
          }
          this.calculateScore(highestPlayers)
        }
      },
      
      calculateScore(passedPlayer){
        if (passedPlayer.length >1){
          for (let player of passedPlayer){
            this.addScores(player)
          }
        } else {
          this.players.filter((player) => {
            if (player.name === passedPlayer[0].name){
              this.addScores(passedPlayer[0])
            }
          })
        }
      },

      addScores(passedPlayer){
        if (passedPlayer.word.length === 9){
            let addScores = {name: passedPlayer.name, score: 18}
            eventBus.$emit('add-scores', addScores)
          } else {
            let addScores = {name: passedPlayer.name, score: passedPlayer.word.length}
            eventBus.$emit('add-scores', addScores)
          }
      },

      checkEnterWordIsAllowed(word){
        const splitWord = [...word]
        let wordCount = 0
        let board = this.letters.map((letter) => letter.toLowerCase())
        splitWord.forEach((letter) => {
          if (board.includes(letter)){
            board[board.indexOf(letter)] = ""
            wordCount++
            if (wordCount === word.length){
              this.currentWord = word
            }
          }
        })
      }
    },
    mounted(){
      eventBus.$on('add-letter', letter => this.letters.push(letter.toUpperCase()))

      eventBus.$on('player-words', (words) => {
        words.forEach((word) => {
          this.checkWord(word.word, word.name)
        })
      })

      eventBus.$on('next-round', () => {
        this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
        this.timerEnded = false
        this.enteredWords = []
        for (let player of this.players){
          player.word = ""
        }
      })

      eventBus.$on('change-timer', (timer) => this.currentTime=timer)
      

      eventBus.$on('timer-finished', () => this.timerEnded = true)

      eventBus.$on('reset-everything', () => {
        this.letters = ['f', 'i', 'r', 'e', 'b', 'o', 'a', 'r', 'd']
        this.timerEnded = false
        this.enteredWords = []
        for (let player of this.players){
          player.word = ""
        }
        this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
      })
    },
    
    components:{
      'timer': Timer,
      'letters-board': LetterBoard,
      'letter-input': LetterInput,
      'submit-answers': SubmitAnswers
    }
  }
</script>

<style lang="css" scoped>

section{
  /* margin: -10px;
  padding: 10px; */
  
}

h2 {
  font-size: 60px;
  text-align: center;
  margin: 0px;
  color: white;
  text-shadow: 0 0 5px #034078;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;

}

#scores{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

</style>