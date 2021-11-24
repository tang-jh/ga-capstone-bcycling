![logo](/readme/logo.svg)

## Introduction

A social app for cycling enthusiasts. Users are able to plan their route to determine its accessibility (path width, crossings, obstacles etc). Users can also share their routes with friends, directly adding map features/annotations to reach one another. Friends can comment on each other's routes.

## Wireframe

![wireframe for app layout](/readme/wireframe.png)

## Schema

![Schema for app. 5 tables (User, route, comment, reply, friend)](/readme/schema.png)

## App Structure

### Frontend

**React**

| Components        | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| Navbar            | `Sub-component` - App-wide top navbar                                                      |
| LoginSignup       | `Page` - Page for login/signup                                                             |
| LoginSignup       | Form view for login or signup                                                              |
| ListTable         | Item-selectable list component for "friend's feed, route lists(own/friend), comment posts) |
| Map               | `Sub-component` - Map component to display routes                                          |
| RouteView         | `Page` - View to display specific routes (own/friend)                                      |
| RouteCreateUpdate | `Page` - Form view for creating new route or editing existing routes                       |
| RouteList         | `Page` - View index table of routes(own/friend)                                            |
| Dashboard         | `Page` - View user's dashboard                                                             |
| CommentReply      | `Sub-component` - Modal for showing and creating comments                                  |
| PeopleIndex       | `Page` - Page for showing list of people (friends list, people list, pending list)         |
| PeopleThumb       | `Sub-component` - Thumbnail for people cards                                               |
| PeopleProfile     | `Page` - Page for persons profile (friend request, accept/reject friend)                   |

**SiteMap**
![Sitemap](/readme/sitemap.png)

### Backend

**Django**

API routes

| API     | Route     |
| ------- | --------- |
| api.... | /api/.... |

## Technologies

| Technology                                                                                    | Type                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [React](https://reactjs.org/)                                                                 | Front-end                                     |
| [React Bootstrap](https://react-bootstrap.github.io/)                                         | React styling component library               |
| [Django (GeoDjango)](https://www.djangoproject.com/)                                          | Back-end                                      |
| PostGreSQL[(PostGIS)](https://postgis.net/)                                                   | Database                                      |
| [Leaflet.js](https://leafletjs.com/)                                                          | JS library for maps                           |
| [React-Leaflet](https://react-leaflet.js.org/)                                                | React component library for maps              |
| [Leaflet-routing-machine](https://www.liedman.net/leaflet-routing-machine/api/)               | Leaflet plugins for routing controls          |
| [Leaflet.encoded](https://github.com/jieter/Leaflet.encoded)                                  | Leaflet plugin for encoding/decoding polyline |
| [Jotai](https://jotai.org/)                                                                   | React library for global state management     |
| [SweetAlert2](https://sweetalert2.github.io/)                                                 | JS library for alerts and modals              |
| [jwt-decode](https://github.com/auth0/jwt-decode)                                             | JS library for decoding jwt                   |
| [Graphhopper](https://www.graphhopper.com/)                                                   | Map routing service                           |
| [Graphhopper API clients (for Python)](https://github.com/graphhopper/directions-api-clients) | API client libraries for Graphhopper          |
