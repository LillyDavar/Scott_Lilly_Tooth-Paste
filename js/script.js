const textElement = document.getElementById('text')
//This are the achivments you can get in the game...I wish I figured out a better why to do it if I'm honest.
const gameStartElement = document.getElementById('GameStart')
const Ending1Element = document.getElementById('Ending1')
const Ending2Element = document.getElementById('Ending2')
const Ending3Element = document.getElementById('Ending3')
const CreditsWElement = document.getElementById('CreditsW')
const quickElement = document.getElementById('quick')
const TamaElement = document.getElementById('Tama')
const milkElement = document.getElementById('milk')
// the button element and the image element.
const optionButtonsElement = document.getElementById('option-buttons')
const backgroundElement = document.getElementById('backgroundImage') // changed to use the <img id="backgroundImage">

let state = {}

function startGame() {
    console.log("Game started yay!");
    state = {}
    showTextNode(1)

}
const btn = document.getElementById('option-buttons')

if (btn) {
    const chimeAudio = new Audio('assets/chime-74910.mp3') //please work
    btn.addEventListener('click', () => {
        chimeAudio.currentTime = 0
        chimeAudio.play().catch(err => console.warn('Audio play prevented:', err)) //If this is ever used I will cry.
    })
} 


function showTextNode(textNodeIndex) {
    //you ever have a moment where you wake up and realize you don't know what you did? Like a scene out of a lovecraftian novel I can not tell you full what the t.id means.
    //I think it means that the text id is equal to the textNodeIndex. This part came in so early that I am unsure anymore...and that makes my skin crawl...Insert Dagon ending here I guess...but with less cocaine.
    const textNode = textNodes.find(t => t.id === textNodeIndex)
    if (!textNode) return

    // set image src from textNode.backgroundImage, this way we can have the image change when certain id are reached...in theory. I still got to get the images made and styled...and this is due tommorow. Why do I do this to myself?
    if (backgroundElement) {
        if (textNode.backgroundImage) {
            backgroundElement.src = textNode.backgroundImage
            backgroundElement.style.display = '' // ensure visible
        } else {
            backgroundElement.src = ''
            backgroundElement.style.display = 'none' // hide when not provided
        }
    }

    // Ok as much as I hate it, this section was written with A.I. As much as I objectivly hate the use of it I could not get the achivements in the game to function properly. Originally I was adding them into the textNodes and that didnt work for what I feel is obvious reasons.
    // It is super simple code and I'm really upset I didn't figure it out sooner.
    textElement.textContent = textNode.text

    // update GameStart display from current state
    if (gameStartElement) {
        gameStartElement.textContent = state.GameStart ? 'Start the Game!' : '???'
    }

        if (Ending1Element) {
        Ending1Element.textContent = state.Ending1 ? 'Back onto the computer' : '???'
    }

        if (Ending2Element) {
        Ending2Element.textContent = state.Ending2 ? 'Go to bed without brushing your teeth. Rude much?' : '???'
    }

        if (Ending3Element) {
        Ending3Element.textContent = state.Ending3 ? 'Sleepy Time!' : '???'
    }
        if (CreditsWElement) {
        CreditsWElement.textContent = state.CreditsW ? 'The Credits!' : '???'
    }

        if (TamaElement) {
        TamaElement.textContent = state.Tama ? 'Tama Tama' : '???'
    }
        if (quickElement) {
        quickElement.textContent = state.quick ? 'oh sure pick the boring option' : '???'
    }
        if (milkElement) {
        milkElement.textContent = state.milk ? 'I should get a bag of milk...' : '???'
    }

    //ok no more A.I

    // clear option buttons, replacese them with the next set of options...ideally
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: 'Tooth Paste',
        backgroundImage: "assets/title.jpg",
        options: [
            {
                text: 'Start Game ',

                nextText: 52
            },
            {
                text: 'Credits',
                setState: {CreditsW: true},
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        GameStart: 'Achivement 1: Game Start!',
        text: 'Another long day of doing...something important I think. Hard to tell anymore I guess you know.',
        backgroundImage: "assets/computer_on.jpg",
        options: [
            {
                text: '..Yeah?',
                GameStart: 'Achivement 1: Game Start!',
                requiredState: (currentState) => currentState.GameStart,
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: 'This game is based loosly of the indie game, "Milk inside a bag of milk inside a bag of milk" You can purchase it on steam. The games short, like 15 minutes its really worth it. The Chime sound effect was found on pixabay and was made by freesound_community. The photos used in this project were taken on a Nikon CoolPix S9200, Its a really nice Camera! The photos were edited on Affinity Version 3, its free and better than Adobe, not like thats to hard. The mouse icons are from Kabooffs mouse-cursor-pack-2 on itch.io.',
        options: [
            {
                text: 'Main Menu? ',


                nextText: 1
            },
        ]
    },

    {
        id: 4,
        text: ' Yeah, I mean I had to have been productive look at the time! its already 2 in the morning! I should really get going to bed.',
                backgroundImage: "assets/computer_on.jpg",
        options: [
            {
                text: 'Sleep is Important',

                nextText: 5
            },
            {
                text: '...Did you do anything besides sit in front of the computer today?',
                nextText: 5
            }
        ]
    },

    {
        id: 5,
        text: 'Yep! Very busy day today so that means I need to get well rested now!',
                backgroundImage: "assets/computer_on.jpg",
        options: [
            {
                text: 'Continue?',
                setState: { UncleanedTeeth: true },
                nextText: 6
            },

        ]
    },

    {
        id: 6,
        text: 'I turn the computer off and stand up from the desk. Feeling a little bit woozie',
                backgroundImage: "assets/computer_on.jpg",
        options: [
            {
                text: 'Ok?',

                nextText: 7
            },

        ]
    },

    {
        id: 7,
        text: 'OK I should go brush my teeth than I can go to bed!',
        backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'That is an Excellent idea.',
                setState: { quick: true },
                nextText: 8
            },
            {
                text: 'Why are you talking like that? theres no one else here.',
                nextText: 9
            },
            {
                text: 'When was the last time you brushed your teeth anyway?',
                nextText: 10
            }

        ]
    },

    {
        id: 8,
        text: 'OK I should go to the washroom and brush my teeth than!',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Continue?',

                nextText: 11
            },

        ]
    },
    {
        id: 9,
        text: 'Im imagining myself as a character in a game - what if it helps me gather my thoughts?.',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Ok than weirdo',

                nextText: 8
            }, {
                text: 'What game?',
                nextText: 48
            }

        ]
    },

    {
        id: 10,
        text: 'Good question! I dont need to warrent that with a response you know',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Im going to assume its been awhile than.',

                nextText: 8
            },

        ]
    },
    {
        id: 11,
        text: 'Im still standing in front of my computer, I should head to the washroom',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Back away than?',
                nextText: 12
            }, {
                text: "Look at tamagotchi maybe?",
                nextText: 13
            }, {
                text: 'look at the computer again?',
                nextText: 14
            }

        ]
    },

    {
        id: 13,
        text: 'You know I remember someone said you can tell a lot about someone based off how well their tamagotchis are taken care of!',
                backgroundImage: "assets/tama.png",
        options: [
            {
                text: 'Oh? hows yours than?',
                setState: { Tama: true },
                nextText: 15
            },

        ]
    },
    {
        id: 15,
        text: 'Mines been dead for a few months now...',
                backgroundImage: "assets/tama.png",
        options: [
            {
                text: 'Ah of course its dead.',

                nextText: 11
            },

        ]
    },

    {
        id: 14,
        text: ' Ah my mighty computer! Still cant believe I found it in the garbage! Lucky find I guess.',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Back away from the garbage computer',
                nextText: 12
            }, {
                text: 'Maybe go back onto the computer?',
                nextText: 38
            }

        ]
    },
    {
        id: 12,
        text: 'You got it! Backing away from the computer now!',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Ok',

                nextText: 16
            },
            {
                text: 'sounds good weirdo',
                nextText: 16
            }

        ]
    },

    {
        id: 16,
        text: 'I turn from the computer and am met with the rest of my bedroom',
            backgroundImage: "assets/bedroom.png",
        options: [
            {
                text: 'We should leave your room now',

                nextText: 17
            },
            {
                text: 'Lets look at the bed?',

                nextText: 30

            }

        ]
    },
    {
        id: 17,
        text: 'Ah the bathroom! its a little tiny but its nice, in that way that bathrooms tend to be!',
                backgroundImage: "assets/Bathroom.jpg",
        options: [
            {
                text: '...What?',

                nextText: 19
            },

        ]
    },
    {
        id: 19,
        text: 'Oh you know what I mean! Its nice and safe...I feel safe here.',
                backgroundImage: "assets/Bathroom.jpg",
        options: [
            {
                text: '...ok, should we Brush our teeth?',

                nextText: 20
            },
            {
                text: 'Makes sense, shall we brush your teeth than?',
                nextText: 20
            }, {
                text: 'check your reflection?'
            }

        ]
    },
    {
        id: 20,
        text: 'Yes! I picked up the toothbrush',
                backgroundImage: "assets/toothbrush.jpg",
        options: [
            {
                text: '...are you going to grab the toothpaste?',

                nextText: 51
            },

        ]
    },

    {
        id: 51,
        text: 'oh yeah of course! ',
                backgroundImage: "assets/toothbrush.jpg",
        options: [
            {
                text: '...Than do that please.',

                nextText: 21
            },

        ]
    },
    {
        id: 21,
        text: 'I grab the tooth pase and spread it over the tooth brush',
                backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'brush your teeth now I guess.',

                nextText: 22
            },

        ]
    },
    {
        id: 22,
        text: 'Im step ahead of ya voice',
        backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'continue?',

                nextText: 23
            },

        ]
    },

    {
        id: 23,
        text: 'I brush my teeth, counting backwards from 20 in my head, that way I know I spent enough time doing it!',
        backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'continue?',
                setState: { BrushedTeeth: true, UncleanedTeeth: false },
                nextText: 24
            },

        ]
    },

    {
        id: 24,
        text: 'Ok finally done!',
        backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'Cant believe you needed a hypeman for this.',

                nextText: 26
            }, {
                text: 'See? knew you could do it.',
                nextText: 26
            }

        ]
    },
    {
        id: 26,
        text: 'Guess I can go to bed now.',
            backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'Dont you think you are forgetting something?',

                nextText: 27
            }, {
                text: 'Correct',
                nextText: 28
            }

        ]
    },

        {
        id: 27,
        text: 'NO I dont think so! Nothing comes to mind at all...NOPE. Why would you ask that?',
            backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'You know what? I dont care, you should just go to bed',

                nextText: 28
            }

        ]
    },

    {
        id: 28,
        text: 'Sounds good to me voice in my head! Time for bed!',
        backgroundImage: "assets/bathroomscene.jpg",
        options: [
            {
                text: 'Than lets go back to the bedroom.',
                nextText: 29
            },

        ]
    },

    {
        id: 29,
        text: 'Ah its good to be back in my room.',
            backgroundImage: "assets/bedroom.png",
        options: [
            {
                text: 'You should go to Bed',

                nextText: 30
            }, 

        ]
    },

    {
        id: 30,
        text: 'Its my Bed! It looks comfy...',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'you should lay down in the bed?',
                requiredState: (currentState) => currentState.BrushedTeeth,
                //You did it!!!
                nextText: 31
            }, {
                text: 'Its not that comfy...',
                nextText: 42
            }

        ]
    },
    {
        id: 31,
        text: 'Now that I brushed my teeth I can go to bed! Good thing I havent changed out of ym pajamas or that would take another whoel 15 minutes!',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'You have been in the same pajamas all day?',

                nextText: 32
            },

        ]
    },
    {
        id: 32,
        text: 'Yep!',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: '...really',

                nextText: 33
            },
            {
                text: 'maybe we can get you into new pajamas?',
                nextText: 34
            }

        ]
    },
    {
        id: 33,
        text: 'Actually these are the same ones from a few days ago. I havent had the energy to change out of them I guess.',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'Ok we should really change you out of those that cant be good for you',
                NextText: 34

            }, {
                text: 'dont care, bed now.',
                nextText: 35
            }

        ]
    },
    {
        id: 34,
        text: 'Nah, that means I got to do the laundry to, and that is not an available feature in this little demo :3',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: '...ok than? I guess lets get you to bed',

                nextText: 35
            },

        ]
    },

    {
        id: 35,
        text: 'Ok than!',
                backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'continue?',

                nextText: 36
            },

        ]
    },

    {
        id: 36,
        text: 'I crawl into bed, its comfy and warm, after a few minutes I fall alseep.',
                backgroundImage: "assets/bedlaying.png",
        options: [
            {
                text: 'Continue to End',

                nextText: 37
            },

        ]
    },

    {
        id: 37,
        text: 'Ending 3: Teeth Brushed',
                backgroundImage: "assets/good-end.png",
        options: [
            {
                text: 'Back to main menue?',
                setState: { Ending3: true },


                nextText: 1
            },

        ]
    },


    {
        id: 38,
        text: 'hhhmmm. I should really go to bed...',
         backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'thats true I guess, fine lets back away.',

                nextText: 16
            }, {
                text: 'Yeah but than we will dream..',
                nextText: 39
            }

        ]
    },

    {
        id: 39,
        text: 'oh yeah good point.',
                        backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'continue',

                nextText: 40
            },

        ]
    }, {
        id: 40,
        text: 'I sit back down and turn the computer on. another 3 hours cant hurt to much',
                        backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'continue to ending',

                nextText: 41
            },

        ]
    },
    {
        id: 41,
        text: 'Ending 1: 5 more hours...',
                        backgroundImage: "assets/computer ending.png",
        options: [
            {
                text: 'Back to main menue?',
                setState: { Ending1: true },

                nextText: 1
            },

        ]
    },

    {
        id: 42,
        text: 'Ok it may be a matress thats falling apart that I bought at a garage sale but still! its better than that air matress...',
                        backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'Back away from the gross bed.',

                nextText: 16
            }, {
                text: 'You should just go to bed now...',
                requiredState: (currentState) => currentState.UncleanedTeeth,
                nextText: 43
            }
        ]
    },
    {
        id: 43,
        text: 'I should really brush my teeth though...',
                        backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'Thats true I guess, lets go do that.',

                nextText: 12
            }, {
                text: 'Who cares? Not like anyone would notice if you brushed your teeth anyways.',
                nextText: 44
            }

        ]
    },
    {
        id: 44,
        text: 'Well I guess I can do it in the morning...',
                        backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'oh we both know you wont, just go to bed and stop tallying.',

                nextText: 45
            },

        ]
    },

    {
        id: 45,
        text: '...right. Of course I wont, havent done it in days, why am I worring about it now?',
                        backgroundImage: "assets/bed.png",
        options: [
            {
                text: 'continue',

                nextText: 46
            },

        ]
    },

    {
        id: 46,
        text: 'I crawl into my gross bed, after about an hour I fall into a restless sleep',
                        backgroundImage: "assets/bedlay2.jpg",
        options: [
            {
                text: 'continue to Ending?',

                nextText: 47
            },

        ]
    },

    {
        id: 47,
        text: 'Ending 2: Gross teeth in a gross Bed',
            backgroundImage: "assets/bedlay2.jpg",
        options: [
            {
                text: 'Back to main menue?',
                setState: { Ending2: true },

                nextText: 1
            },

        ]
    },
    {
        id: 48,
        text: 'Well you know..',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: '...?',


                nextText: 49
            },

        ]
    },

    {
        id: 49,
        text: 'There are games where you can see the charaters thoughs. RIght on the screen, you know?',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Yeah I think I do...',


                nextText: 50
            },

        ]
    },

    {
        id: 50,
        text: 'So I thought, if someone is reading my mind, I need to be very focused so I dont blurt out too much!',
                backgroundImage: "assets/computerscene.jpg",
        options: [
            {
                text: 'Ok than I guess...',
                setState: { milk: true },
                //Fun fact! This whole conversation line was a refrence to the hit game "Milk inside a bag of milk inside a bag of milk inside a bag of milk"


                nextText: 8
            },

        ]
    },

    {
        id: 52,
        text: 'Help me brush my Teeth!',
        backgroundImage: "assets/Brush-Teeth.jpg",
        options: [
            {
                text: 'Enter Game?',
                setState: { GameStart: true },

                nextText: 2
            },

        ]
    },






]


startGame()

btn.addEventListener("click", sound);
function sound() {
    new Audio("assets/chime-74910.mp3").play()
    //This didnt work. I leave it in shame.
}


