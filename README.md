![logo](/readme/logo.svg)

## Introduction

A social app for cycling enthusiasts. Users are able to plan their route to determine its accessibility (path width, crossings, obstacles etc). Users can also share their routes with friends, directly adding map features/annotations to reach one another. Friends can comment on each other's routes.

## Wireframe

![wireframe for app layout](/readme/wireframe.png)

## Schema

![Schema for app. 5 tables (User, route, comment, reply, friend)](/readme/schema.png)

## App Structure

### Frontend

**React Native**

| Components  | Description                                                                                |
| ----------- | ------------------------------------------------------------------------------------------ |
| Navbar      | App-wide top navbar                                                                        |
| LoginSignup | Form view for login or signup                                                              |
| ListTable   | Item-selectable list component for "friend's feed, route lists(own/friend), comment posts) |
| Map         | Map component to display routes                                                            |
| RouteR      | View to display specific routes (own/friend)                                               |
| RouteCU     | Form view for creating new route or editing existing routes                                |
| RouteIndex  | View index table of routes(own/friend)                                                     |
| Dashboard   | View user's dashboard                                                                      |

### Backend

**Django**

API routes

| API         | Route         |
| ----------- | ------------- |
| Create user | /api/user/new |

## Technologies

| Technology                                                                                    | Type                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [React Native](https://reactnative.dev/)                                                      | Front-end                                     |
| [Django (GeoDjango)](https://www.djangoproject.com/)                                          | Back-end                                      |
| PostGreSQL[(PostGIS)](https://postgis.net/)                                                   | Database                                      |
| [Leaflet.js](https://leafletjs.com/)                                                          | JS library for maps                           |
| [React-Leaflet]()                                                                             | React component library for maps              |
| [Leaflet-routing-machine](https://www.liedman.net/leaflet-routing-machine/api/)               | Leaflet plugins for routing controls          |
| [Leaflet.encoded](https://github.com/jieter/Leaflet.encoded)                                  | Leaflet plugin for encoding/decoding polyline |
| [Graphhopper](https://www.graphhopper.com/)                                                   | Map routing service                           |
| [Graphhopper API clients (for Python)](https://github.com/graphhopper/directions-api-clients) | API client libraries for Graphhopper          |
