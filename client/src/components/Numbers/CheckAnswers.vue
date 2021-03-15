<template>
    <div>
        <!-- <div>
            <div>
                <button class="answer-button" @click="numberOne" >{{numbers[0]}}</button>
                <button class="answer-button" @click="numberTwo" >{{numbers[1]}}</button>
                <button class="answer-button" @click="numberThree" >{{numbers[2]}}</button>
                <button class="answer-button" @click="numberFour" >{{numbers[3]}}</button>
                <button class="answer-button" @click="numberFive" >{{numbers[4]}}</button>
                <button class="answer-button" @click="numberSix" >{{numbers[5]}}</button>
            </div>

            <div>
                <button class="operator-button" @click="add" >+</button>
                <button class="operator-button" @click="minus" >-</button>
                <button class="operator-button" @click="times" >X</button>
                <button class="operator-button" @click="divide" >/</button>
            </div>

            <p>{{typedCalculation}}</p>
        </div>
        
        <button class="submit-button" @click="finishedEquals" >Check Answer</button> -->
        <button class="submit-button" v-if="fullGame && finished" @click="nextRound">Next Round</button>
        <button class="submit-button" v-if="!fullGame && finished" @click="resetEverything">Reset Game</button>
    </div>
</template>

<script>
import {eventBus} from '@/main.js'
    export default {
        props: ['numbers', 'targetNumber', 'fullGame'],

        data(){
            return {
                typedCalculation: "",
                calculation: "",
                operator: "",
                firstNumber: 0,
                finished: true
            }
        },
        
        methods:{
            resetEverything(boolean){
                eventBus.$emit('reset-everything', boolean)
                this.calculation = "",
                this.operator = "",
                this.firstNumber = 0
            },

            nextRound(boolean){
                eventBus.$emit('next-round', boolean)
                this.resetEverything()
                },

            divide(){
                this.calculation += ' / '
                this.operator = true
                this.typedCalculation += ' / '
            },
            add(){
                this.calculation += ' + '
                this.operator = '+'
                this.typedCalculation += ' + '
            },
            minus(){
                this.calculation += ' - '
                this.operator = true
                this.typedCalculation += ' - '
            },
            times(){
                this.calculation += ' * '
                this.operator = true
                this.typedCalculation += ' x '
            },
            numberOne(){
                this.calculation += this.numbers[0]
                if (this.operator.length > 0){
                    this.equals(this.numbers[0])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[0]
            },
            numberTwo(){
                this.calculation += this.numbers[1]
                if (this.operator.length > 0){
                    this.equals(this.numbers[1])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[1]
            },
            numberThree(){
                this.calculation += this.numbers[2]
                if (this.operator.length > 0){
                    this.equals(this.numbers[2])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[2]
            },
            numberFour(){
                this.calculation+=this.numbers[3]
                if (this.operator.length > 0){
                    this.equals(this.numbers[3])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[3]
            },
            numberFive(){
                this.calculation+=this.numbers[4]
                if (this.operator.length > 0){
                    this.equals(this.numbers[4])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[4]
            },
            numberSix(){
                this.calculation+=this.numbers[5]
                if (this.operator.length > 0){
                    this.equals(this.numbers[5])
                } else {
                    this.firstNumber = this.numbers[0]
                }
                this.operator = false
                this.typedCalculation += this.numbers[5]
            },
            equals(){
                let test = eval(this.calculation)
                this.calculation = test.toString()
                
            },
            finishedEquals(){
                this.equals()
                if (this.calculation === this.targetNumber){
                    if (this.fullGame){
                        this.nextRound('true')
                    } else {
                        this.resetEverything('true')
                    }
                } else {
                    if (this.fullGame){
                        this.nextRound('false')
                    } else {
                        this.resetEverything('false')
                    }
                }
            }
        }
        
    }
</script>

<style lang="css" scoped>

.submit-answer {
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
    height: 100px;
}

.answer-button {
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
    margin: 5px 10px;
    width: 70px;
    height: 40px
}

.operator-button {
    box-shadow:inset 0px 1px 0px 0px #97c4fe;
	background:linear-gradient(to bottom, #5f6ae3 5%, #1c138a 100%);
	background-color:#b5f63d;
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
    margin: 5px 10px;
    width: 70px;
    height: 40px
}

button:hover {
	background:linear-gradient(to bottom, #1e62d0 5%, #3d94f6 100%);
	background-color:#1e62d0;
}
button:active {
	position:relative;
	top:1px;
}

</style>