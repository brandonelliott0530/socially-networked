# socially-networked

---

This api is an example of a back-end of a social network type app that allows the users to add friends, thoughts, and reactions to other users thoughts. It also allows users to delete their profile, and their associated thoughts, remove friends from their profile, as well as reactions. This project primarily uses express.js, mongodb, and mongoose.

## Requirements

---

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Usage

---

To use the api, the user needs to navigate to the folder where the program exists in their terminal and perform a Npm i to install the dependencies. After that, all the user needs to do, is run an node server command in the terminal, and then connect to localhost:3001 in a database program such as insomnia. The user will then see all of the available routes in the [routes](./routes) folder. The user will then need to go to the specified end points in order to Create, Read, Update, or Delete information. To view proper formatting of the information to be passed in on requests, the user can reference the [models](./models/) folder which contains all of the information that needs to be passed in.

## Challenges in Development

---

The biggest challenges that I faced were getting all of the routes to work properly. Specifically, deleting thoughts and reactions and getting the thoughts to display in the array of a user's thoughts.

## Demonstration Video

---

[Here is the link to the demonstration video](https://drive.google.com/file/d/1eCyEE2SSg6KtZ620ra2TAsy4j3VK3G68/view?usp=sharing)

## GitHub Repository

---

[GitHub link](https://github.com/brandonelliott0530/socially-networked)

## Contact Me

---

Email: brandonelliott0594@gmail.com
GitHub: https://github.com/brandonelliott0530
