# workingsoftware2023 - Autenticazione e autorizzazione in salsa microservice (italian)

## Abstract (italian)
Se partiamo da un monolite è tutto facile: verifichiamo le credenziali sul database (e/o utilizziamo oauth) e il gioco è fatto. 
I monoliti sono semplici e utili in tantissimi casi, ma non sempre. 
A volte abbiamo bisogno di una architettura a microservizi, magari con linguaggi e stack tecnologici differenti. 
- Chi verifica le credenziali? 
- Come ogni servizio è in grado di identificare in modo sicuro l’utente e assegnargli i giusti ruoli per poter esaudire le richieste? 

Queste sono alcune domande che un sistema distribuito ci impone di valutare. 
In questo talk analizzeremo tramite demo e un caso reale e complesso, i diversi modi e le tecniche per gestire l’autorizzazione e l’autenticazione in un mondo a microservizi, illustrando pregi e difetti di ogni soluzione.

## Demo
This demo wants to dimostrate how to manage following requirements in both monolith and microservices architecture:
- Authentication (centralized or decentralized)
- Authorization via user roles (centralized or decentralized)
- How to mix public and protected informations in a public web page
- How to avoid tampering when passing parameters to a service
- How to coordinate the business logic client side (microservice version)
- How to secure a server to server call (microservice version)
- How to make services wrote in different languages cooperate

### The demo implements the following user stories
- As a customer I want to see a product page (PDP)
- As a logged customer I want to see the price of the product in the PDP
- As a logged customer I want to buy the product and receive my invoice
- As a content team user I want to change the title and description of the product
- As a price team user I want to change the price of the product

And now... _Are you ready to became invisible?_

## Prerequisites
The only requirements to run the demo are **node**, **yarn** and **python3** installed on your system.

In order to manage better environments, my suggestion is to install node via nvm and python3 through conda tools.  

## Code
In order to start, please clone this repository with the command `git clone git@github.com:rucka/workingsoftware2023.git`

If you want to run monolith version, please checkout the monolith tag version with the command `git checkout tags/monolith -b monolith`

In the other hands, if you want to run microservices version, please checkout the microservices tag version with the command `git checkout tags/microservices -b microservices`

Great, now you are able to initialize your project and run the demo executing the following commands:
- `yarn setup`
- `yarn start`

Additional scripts are available in yarn:
- build all projects: `yarn build`
- clean all dependencies: `yarn clean`
- format the code: `yarn prettier:fix`
- typecheck typescript code: `yarn ts:check`

## Endpoints
When you run the demo, the following endpoints are available:
- website: `http://0.0.0.0:3001`
- backend: `http://0.0.0.0:3002`

## Technologies
The demo is implemented using the following technologies:
- python
  - Flask
  - Flask-Login
  - Flask_cors
  - PyJWT
- javascript/typescript
  - nextjs
  - restify
  - prettier
  - styled-components
  - jsonwebtoken

## Resources
- [Slides](http://gianluca.carucci.org/l/workingsoftware2023/gh/)
- [Code](https://github.com/rucka/workingsoftware2023#Code)
- [talk (italian)](http://gianluca.carucci.org/l/workingsoftware2023/gh/)

## External Resources
- [Codemotion Milan 2019 I Flat Organizations and Flat Architectures](https://www.youtube.com/watch?v=jEP5aMkarhE)
