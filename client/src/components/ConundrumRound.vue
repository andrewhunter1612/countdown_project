<template>
  <div>
        <section id="background">
            <div id="scores">
                <h2>{{currentPlayer.name}}: {{currentPlayer.score}}</h2>
                <h2>CONUNDRUM ROUND</h2>
            </div>
            <timer v-if="!stopTimer" :stopTimer="stopTimer" :times="currentTime" :reset="resetTimer"/>
            <letters-board :letters="jumbledWord"/>
            <conundrum-submit v-if="correctPlayer.length === 0" :stopTimer="stopTimer" />
            <correct-answer :fullGame="fullGame" v-if="correctPlayer.length > 0" :playerName="correctPlayer"/>
        </section>
    </div>
</template>

<script>

import LetterBoard from '@/components/Reusable/LetterBoard.vue'
import ConundrumSubmit from '@/components/Conundrum/ConundrumSubmit.vue'
import Timer from '@/components/Reusable/Timer.vue'
import CorrectAnswer from '@/components/Conundrum/CorrectAnswer.vue'
import CountdownService from '@/services/CountdownService'

import {eventBus} from '@/main.js'

export default {
    props: ['fullGame', 'currentPlayer'],
    data(){
        return {
            word: '',
            jumbledWord: "",
            correctPlayer: "",
            stopTimer: false,
            currentTime: [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]],
            resetTimer: false
        }
    },

    methods:{
        getConundrumWord(){
            CountdownService.getConundrumWords()
            .then(words => {
                let conundrum = words[Math.floor(Math.random()*words.length)].name.toUpperCase()
                this.word = conundrum
                this.jumbledWord = [...conundrum].sort()
                console.log('word', this.word);
            })
        }
    },

    mounted(){
        eventBus.$on('conundrum-answered', (conundrum) => {
            if (conundrum.word.toUpperCase() === this.word){
                this.correctPlayer = `You are correct`
                let player = {name: this.currentPlayer.name, score: 10}
                eventBus.$emit('add-score', player)
            } else {
                this.correctPlayer = `You were wrong, the correct answer was ${this.word}`
            }
        })

        eventBus.$on('reset-everything', () => {
                this.getConundrumWord()
                this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
                this.stopTimer = false
                this.correctPlayer = ""
                this.resetTimer = true

            })

        eventBus.$on('stop-timer-button',() => this.stopTimer = true)

        eventBus.$on('start-timer-button', () => this.stopTimer = false)

        eventBus.$on('change-timer', (timer) => this.currentTime=timer)

        eventBus.$on('timer-stopped', (timer) => this.currentTime = timer)

        eventBus.$on('timer-finished', (timer) => this.stopTimer = true)

        this.getConundrumWord()

        eventBus.$on('next-round', () => {
            this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
            this.timerEnded = false
            this.enteredWords = []
        })
    },
    computed:{
        

    },

    components:{
        'letters-board': LetterBoard,
        'conundrum-submit': ConundrumSubmit,
        'timer': Timer,
        'correct-answer': CorrectAnswer
    }
}
</script>

<style>

button {
    box-shadow:inset 0px 1px 0px 0px #97c4fe;
	background:linear-gradient(to bottom, #3d94f6 5%, #1e62d0 100%);
	background-color:#3d94f6;
	border-radius:6px;
	border:1px solid #337fed;
	display:inline-block;
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


h2 {
  text-align: center;
  font-size: 60px;
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