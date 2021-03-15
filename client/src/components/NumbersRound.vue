<template>
    <section>
        <div id="scores">
            <h2>Player 1: {{players[0].score}}</h2>
            <h2>NUMBERS ROUND</h2>
            <!-- <h2>Player 2: {{players[1].score}}</h2> -->
        </div>
        <timer  v-if="targetNumber > 0 && !timerEnded" :times="currentTime"/>
        <choose-numbers v-if="targetNumber === 0" />
        <numbers-board :targetNumber="targetNumber" :numbers="playingNumbers"/>
        <submit-answers v-if="targetNumber > 0 && timerEnded && !submitClicked" />
        <check-answers v-if="submitClicked" :numbers="playingNumbers" :fullGame="fullGame" />
    </section>
</template>

<script>
import Timer from '@/components/Reusable/Timer.vue'
import ChooseNumbers from '@/components/Numbers/ChooseNumbers.vue'
import NumbersBoard from '@/components/Numbers/NumbersBoard.vue'
import SubmitAnswers from '@/components/Numbers/SubmitAnswers.vue'
import CheckAnswers from '@/components/Numbers/CheckAnswers.vue'

import {eventBus} from '@/main.js'
    export default {
        props: ['fullGame', 'players'],
        data(){
            return {
                largeNumbers: [25, 50, 75, 100],
                smallNumbers: [1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 10, 3, 4, 5, 6, 7, 8, 10],
                playingNumbers: [],
                targetNumber: 0,
                timerEnded: false,
                submitClicked: false,
                currentTime: [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
            }
        },
        methods:{
            resetEverything(){
                this.timerEnded = false
                this.playingNumbers = []
                this.targetNumber = 0
                this.submitClicked = false
                this.currentTime = [['name', 'time'], ['currentTime', 0], ['timeUnused', 60]]
                for (let player of this.players){
                    player.word = ""
                }
            },
            declareWinner(playerName, pointsDifference){
                if (pointsDifference === 0){
                    this.addPoints(playerName, 10)
                } else if (pointsDifference < 10 && pointsDifference > 5){
                    this.addPoints(playerName, 7)
                } else if (pointsDifference < 10){
                    this.addPoints(playerName, 5)
                } 
            },
            addPoints(playerName, points){
                this.players.filter((player) => {
                    if (player.name === playerName){
                        player.score += points
                    } else if (playerName == 'Draw'){
                        player.score += points
                    }
                })
            }
        },

        mounted(){
            eventBus.$on('large-numbers', (number) => {
                let tempLargeNumbers = [...this.largeNumbers]
                let tempSmallNumbers = [...this.smallNumbers]
                for (let i=0; i<number; i++){
                    let random = Math.floor(Math.random() * Math.floor(tempLargeNumbers.length))
                    this.playingNumbers.push(tempLargeNumbers[random])
                    tempLargeNumbers.splice(random, 1)
                }
                for (let i=this.playingNumbers.length ; i<6; i++ ){
                    let random = Math.floor(Math.random() * Math.floor(tempSmallNumbers.length))
                    this.playingNumbers.push(tempSmallNumbers[random])
                    tempSmallNumbers.splice(random, 1)
                }
                this.targetNumber = Math.floor(Math.random() * Math.floor(898))+101
            })

            eventBus.$on('numbers-answers', (players) => {
                let playerOneDifference = this.targetNumber - players[0].score
                let playerTwoDifference = this.targetNumber - players[1].score
                if (playerOneDifference < 0) playerOneDifference *= -1
                if (playerTwoDifference < 0) playerTwoDifference *= -1
                
                if (playerOneDifference > playerTwoDifference){
                    this.declareWinner('Player Two',playerTwoDifference)
                } else if (playerTwoDifference > playerOneDifference){
                    this.declareWinner('Player One', playerOneDifference)
                } else {
                    this.declareWinner('Draw', playerOneDifference)
                }
                this.submitClicked = true
            })

            eventBus.$on('change-timer', (timer) => this.currentTime=timer)

            eventBus.$on('next-round', () => {
                this.resetEverything()
                
            })

            eventBus.$on('timer-finished', () => this.timerEnded = true)


            eventBus.$on('reset-everything', () => {
                this.resetEverything()

            })
        },
        
        components:{
            'timer': Timer,
            'choose-numbers': ChooseNumbers,
            'numbers-board': NumbersBoard,
            'submit-answers': SubmitAnswers,
            'check-answers': CheckAnswers
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