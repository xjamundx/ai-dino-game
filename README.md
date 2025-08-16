# ai-dino-game
side scrolling dinosaur game built with ai

<img width="1006" height="639" alt="Screenshot 2025-08-16 at 13 14 53" src="https://github.com/user-attachments/assets/f3fdc8ba-20d3-47f1-a80b-9010bcaa95d5" />

**Play here:**
https://xjamundx.github.io/ai-dino-game/

---

### Prompt History


```
1. "create a side scrolling dinosaur game with vanilla js and HTML using simple dom elements. the dinsoaur itsself should move up and down when you click the spacebar. "
2. "you can keep this same code but split it out into separate files for the js and css"
3. "the spacebar isn't makign the dinosaur jump, can you make it do a better job"
4. "It's clear that the spacebar is not working, because the logs fire, but the little dinoaur creature in the game is not visually updating to show a changed position. why is that?"
5. "Spacebar pressed, game running: true\ngame.js:52 Jump method called, isJumping: false\ngame.js:56 Starting jump with speed: -20\ngame.js:60 Set dinosaur bottom to 200px manually\ngame.js:73 Landing - back to ground\ngame.js:77 Dinosaur position: 100"
6. "It's just hard coding the bottom to 100px when it's already 100px. It's not moving the dinosaur at all"
7. "The \"jumping\" is now going negative, it's not jumping up, it's jumping DOWN, please reverse it. It also needs to jump higher."
"The jumping is further now, thank you, but it's still jumping downwards. I believe this is because we're setting the bottom position to negative numbers instead of positive numbers. THe peak jump positionm should be around 176px total when applied to the css bottom property"
8. "Yes jumping is working now, but the screen is moving too slowly and the gravity is toos trong, so it's impossible to clear the obstacles in the game. can you make the obstacles and background scroll more quickly and make the jump gravity a little bit slower? ALso pleaser emove the extra debug logs"
9. "Can you make the score increase every second the game is in play, rather than when jumping over specific obstacles?"
10. "Bug: when i restart the game the gameplay appears slower, what's up with that/"
11. "can you add little feet to the dinosaur that move"
12. "can you make the obstacles look more like trees"
13. "I like the circles, but can some of the trees have triangle chapes, more like a pine tree?"
14. "the triangles look liek squares"
15. "i don't see the pine tree obstacles at all anymore, what happened?"
16. "Alright I see them now, can you make the triangles much wider and little taller?"
17. "That's better but I want them 3x wider and taller"
18. "That's great thank you"
19. "one thing, can we make the obstacles happen more frequently, like right now when it starts you have to wait up to 3s before you see any  obstacles?"
20. "I noticed the collision detection doesn't care about the tree foilage, only the trunk. can we have it be a little bit more picky about collission with the green parts as well/"
21. "It now collides with the tere even before it touches. Did you just draw a great big box aroudn the tree? It needs to have a more precise way to detect the collissions"
22. "that's much better. one thing the game over sign is covered up by the pine trees, can you make sure the z-index is correct (or figure out why it's being obscured)?"
23. "That did it thanks!"
24. "I would like you to make the pine trees slightly shorter, specifically by lowering where the foilage starts by like 10 pixels"
25. "lower by another 20px please"
26. "sometimes after i ocllide the game restarts and moves extra fast, can you tell me what that is about? is it correct?"
27. "Can we make the start and restart button \"enter\" instead of space bar?"
```
