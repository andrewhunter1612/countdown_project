<template>
    <div>
      <section id="background">
        <div id="scores">
          <h2>{{currentPlayer.name}}: {{currentPlayer.score}}</h2>
          <h2>LETTERS ROUND</h2>
        </div>
        
        <timer v-if="letters.length === 9 && !timerEnded" :times="currentTime"/>
        <letters-board :letters="letters"/>
        <letter-input v-if="letters.length < 9" />
        <submit-answers v-if="timerEnded" :currentPlayer="currentPlayer" :falseWord="falseWord" :fullGame="fullGame"/>
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
    props: ['fullGame', 'currentPlayer'],

    data(){
      return {
        letters: ['f', 'i', 'r', 'e', 'b', 'o', 'a', 'r', 'd'],
        // letters:[],
        timerEnded: false,
        enteredWords: [],
        currentWord: "",
        currentTime: [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]],
        falseWord: false
      }
    },

    methods:{
      checkWord(word, name){
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
          .then((res) => res.json())
          .then((data) => {
            if (word === data[0].word){
              this.checkEnterWordIsAllowed(word)
              this.addScores(word, name)
            }
          })
          .catch((err) => {
            this.falseWord = true
          })
      },
      
      calculateScore(passedPlayer){
        if (passedPlayer.word.length >1){
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

      addScores(word, player){
        if (word.length === 9){
            let addScore = {name: player, score: 18}
            eventBus.$emit('add-score', addScore)
          } else {
            let addScore = {name: player, score: word.length}
            eventBus.$emit('add-score', addScore)
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

      eventBus.$on('player-word', (data) => {
        this.checkWord(data.word, data.name)
      })

      eventBus.$on('next-round', () => {
        this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
        this.timerEnded = false
        this.enteredWords = []
        
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