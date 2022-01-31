# Ad Network Challenge

The objective of this project was to model and implement a simple Ad Network, using the following stack:

1. **Frontend:** [ReactJS](https://reactjs.org/)
2. **Backend:** APIs built in [NodeJS](https://nodejs.org/)
3. **Database:** [MongoDB](https://www.mongodb.com/)

The final result should consist in two components:
* **Console:** Web app (frontend + backend) to create and visualize ads
* **AdServer:** API (backend) that serves the ad, choosing the best ad given a set of requirements

---

## Frameworks used in this project

For the **backend APIs**, I opted to use **Express.js**. I also considered using Fastify but for the scope of this project, Express would handle well. For the MongoDB connection, I've used Mongoose.

For the **frontend**, I've created the **React app** with **Tailwind CSS** as the CSS framework. Tailwind is easy to use, and with [Tailwind UI](https://tailwindui.com) providing basic layout structures, it was blazing fast to build the pages. To "serve" the built (compiled) version of the React App, a Nginx server is used.

Also, to get up and running the final result with a minimum effort possible, I put everything (including the MongoDB database) inside a **Docker Compose** config file. Having Docker installed, with a single command, you can run the project (local, or even in a server).

---

## Changing configs

If you need to change any config (default ports, API url in frontend project), you can edit the `.env` files inside each project folder -- `adserver-backend`, `console-backend` or `console-frontend`

_(If you need to change the server ports only, just change the `docker-compose.yml` file in the root folder. For each project there is a `published: ####` parameter. **Change only** the number for this parameter, and the port will change.)_

---

## URLs, Ports used and API methods

As the project runs automatically through `docker-compose`, it's possible that the ports defined for each project by default is already taken. In this case, you can check the list below as reference to stop other apps from running in the same port, or change the **published port** for each application individually.

| App | Type | Port used | URL |
| ----------- | ----------- | ----------- | ----------- |
| AdServer | Backend | 3100 | http://localhost:3100 |
| Console | Backend | 3200 | http://localhost:3200 |
| Console | Frontend | 81 | http://localhost:81 |
| MongoDB | Database | 27017 | mongodb://localhost:27017/adserver |

For the API methods, you can use this table as reference:
| App | Type | URL | Description |
| ----------- | ----------- | ----------- | ----------- |
| AdServer | GET | http://localhost:3100/fetch?targeting=XX | Serves the best campaign, based on the campaign with the highest bid and respecting the country targeting |
| Console | GET | http://localhost:3200/campaign | Get the list of campaigns available in database |
| Console | POST | http://localhost:3200/campaign | Add a new campaign |

**For the `POST /campaign` request, please use the object below as reference:**
```json
{
	"publisherId": 123456789, // The id of the publisher. Can be anything.
	"bidLimit": 150000.00, // The BID limit for this campaign (in a real scenario, the campaign stops when reaching this limit)
	"bidPerConversionType": 3.45, // The bid amount, to be paid based on Conversion Type
	"conversionType": "CPM", // The conversion type. Should be CPI, CPM or CPC
	"targeting": "US" // The targeting country for this campaign
}
```

---

## Running the project

```bash

# Run the docker-compose with the build flag enabled
# (it'll force the build everytime it runs. useful if you have made changes)
$ docker-compose up --build -d

# If you want only to run the project without build
# (It'll always build if you are running for the first time)
$ docker-compose up -d

# If you want to stop the project (all containers inside the stack)
$ docker-compose down

```