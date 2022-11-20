![20221119_225447_0000](https://user-images.githubusercontent.com/52624380/202915790-2c1743d8-6f7b-48a1-a8be-316142c7eb3f.png)
## Inspiration

I have always needed a tool to browse activities or interesting things to do around my location, but I have never got a chance to implement such a thing. Most of the worldwide solutions for event-exploration don't have good coverage in my country, Israel, so even if such a service existed, it wasn't fully relevant for me. While browsing the hackathon's providers, I stumbled upon the PredictHQ API, and this old idea floated back into my mind. I saw the capabilities of this API, and thought it could be a perfect match for my idea. 

## What it does

E-Finder is a platform to browse and discover events everywhere: near your house, and even beyond the ocean. The user is presented with a friendly and intuitive UI to search and filter events by different factors. Categories, such as community driven events, performing arts, expos, and even topics like disasters or airport delays. The user can also filter for events at a certain radius from his location or by his own search query, and sort the results by date, rate or distance. The service is not limited to the user’s current location, and the requested location can be changed at any time from the search bar in the UI. The user is presented with a lot of valuable information about the requested events, such as the time of the event, exact location, venue, rank, and even more advanced information like predicted attendance and event privacy. There is also an option to view the exact pin point of the location in the map, and travel there by many traveling methods. The platform is suitable for regular users, who just want to explore events around them and get basic information like date and location, but also for advanced users who want to collect metrics and dive deeper into event data. The data is fully real-time and accurate, powered by the PredictHQ API from the AWS Data Exchange.

## How I built it

The app is powered by an integration between the PredictHQ Events API, from the AWS Data Exchange and the Google Maps API, to connect between locations and events, and provide the user with access to events everywhere. I have leveraged almost all of the provided functionality from the PredictHQ API to provide the user with the most relevant data. From the Google Maps API, I have used the Maps API, the Geocoder API and the Directions API. The app is built with the NextJS framework and written in TypeScript, utilizing the React library and additional utility libraries (like react-icons, react-scroll and react-simple-maps) for building the UI. The app is styled with TailwindCSS.

## Challenges I ran into

While designing the app, I wanted to make use of two more APIs from the AWS Data Exchange: Ursa Space’s SAR Virtual Constellation Catalog and Similar Web API. I wanted to use Ursa Space’s API to provide the user with SAR images of the event location, but found out that the API wasn’t suitable for this type of usage, and the coverage wasn’t focused on urban areas, at least in my country. I wanted to use the Similar Web API to retrieve related website addresses to the selected event, but the provided endpoints weren’t suitable for that usage either. I felt a bit frustrated, but to enrich the app and make up for the lack of those APIs, I took a deeper dive into the PredictHQ API, and brought more relevant data and information, and integrated it deeper with the Google Maps API to provide to user with maximum relevant event and location information.

## Accomplishments that I’m proud of

I’m proud of the deep integration between the PredictHQ API and the Google Maps API. It feels like it creates a new functionallity that I haven’t been able to create with the PredictHQ API alone - provide the user with location data, and filter events by exact locations, all around the world.
I’m also proud of the the friendly UI I was able to design.

## What I learned

I have never used an AWS service before, but wanted to do so for a long time. While developing the project, I learned a lot about Amazon Web Services in general, and about the AWS Data Exchange in particular, and I’m defienetely planning to use those services in the near future. I haven’t integrated an API so wide and diverse like the PredictHQ API in a web app before and I’m glad I got the chance to do so. I am an experienced Web Developer, but while developing the app, I learned to use many features of NextJS and React that I haven’t used before, and I was exposed to many amazing libraries I have never used before (like react-simple-maps).

## What's next for E-Finder

I see a lot of potential in E-Finder. It is simply a very intuitive and needed platform for many users, those who want to explore events for hanging out later, or those who want to collect rich data and use it for other purposes. E-Finder is also a great platform to promote non-profits and events with a positive impact on it's surroundings. I see a great benefit to the user in converting it to a mobile app in the future, in which every user can explore events everywhere straight from their pockets.

## Technologies Used

AWS, AWS SDK, AWS Data Exchange, NextJS, React, TypeScript, TailwindCSS, PredictHQ API, Google Maps API, Google Directions API, Google Geocoding API, axios, react-simple-maps, react-scroll, react-tooltip, react-icons, tailwind-merge.

## Screenshots

![Screenshot_20221120-191648_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917211-b8051dcf-ce0a-4b46-a999-fd68d6e4e745.jpg)

![Screenshot_20221120-191628_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917215-a7a1ab45-eac9-487c-accc-b6172e174d9f.jpg)

![Screenshot_20221120-191721_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917220-618a7692-5799-489c-8c0e-d6c80452211f.jpg)

![Screenshot_20221120-191731_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917225-1e0c5f4f-222b-4162-84e0-a6cbdd527e14.jpg)

![Screenshot_20221120-192228_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917563-535fc16d-348c-4b1d-9ebd-002f02207b6c.jpg)

![Screenshot_20221120-192251_Kiwi Browser](https://user-images.githubusercontent.com/52624380/202917237-980c9beb-37fd-4348-97ee-b9f54daefec9.jpg)

## Installation

### Clone
Clone this GitHub repository using the git CLI as shown below, or other methods.
```
git clone https://github.com/zivnadel/e-finder.git
```

### Install Dependencies
```
cd e-finder
npm install
```

### Run
The app will run on port 3000 on your local machine (localhost), make sure this port is free, and run:
```
npm run dev
```

### Environmental Variables
Those variables are required in order to run the app. Create a file named .env (in the root of the app) and fill those variables with your own data.
```
# AWS Credentials
ACCESS_KEY_ID=Your_AWS_Access_Key
SECRET_ACCESS_KEY=Your_AWS_Secret_Access_Key

# PredictHQ environment variables
PREDICTHQ_REGION=Your_PredictHQ_API_REGION
PREDICTHQ_DATASET_ID=Your_PredictHQ_API_DATASET_ID
PREDICTHQ_REVISION_ID=Your_PredictHQ_API_REVISION_ID
PREDICTHQ_ASSET_ID=Your_PredictHQ_API_ASSET_ID

# Google API Key
NEXT_PUBLIC_GOOGLE_API_KEY=Your_Google_API_Key
```

## License

E-Finder is open source software under [MIT License](https://github.com/zivnadel/e-finder/blob/master/LICENSE.md)
