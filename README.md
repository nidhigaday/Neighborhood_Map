# Neighborhood Map - Supernatural

![Part of the Udacity Front-End Web Development Nanodegree](https://img.shields.io/badge/Udacity-Front--End%20Web%20Developer%20Nanodegree-02b3e4.svg)

## Introduction

This is the **Udacity Neighborhood Map Project**. It's intended as a challenge to put together a SPA using Google Maps Javascript API along with third-party APIs.

This map displays some of the locations in Vancouver, BC where TV Series - [Supernatural](http://www.imdb.com/title/tt0460681/) was shot.

## Getting Started

* [Download]() or Clone, and open index.html
* **Alternative** [Live version](#)

## Preperation

* Download Udacity provided Repo
* Setup Google account and project to obtain API
* Setup local server. (I used browser_sync. [Help](https://spacevash.com/2017/08/10/why-should-i-install-a-local-server/))
* Learned and practiced [KockoutJS](http://knockoutjs.com/) framework on [Pup Clicker](https://github.com/nidhigaday/Pup-Clicker-KO)
* Reviewed project requirements
* Collected data required for project
* Implemented requirements as per project specifications

## Project specifications completed

### Interface

* Responsive (progress)
* Usability (pending)

### Functionality

* Map fullScreen Enabled
* Toggle between Custom Map and Hybrid mapTypes
* Filter locations using dropdown and error free
* List view displays all locations and filtered subset locations
* Map displays all locations by default and filtered subset locations
* Markers animation and InfoWindow display when clicked on pin and list item
* List functionality is responsive and error free

### App Structure

* Google Maps API loads asynchronously
* Asychronous request from third-party API (pending)
* Error handling (pending)
* Application runs without an error (in progress)

### Location Details Functionality

* Displays complete address of the location
* Episode and Season information
* Displays Panorama Image for device widths > 768px
* Displays Static Street View image for width < 768px

### Additional

* Code minification (pending)
* Ability to add Favourite (pending)
* Comments to explain functionality
* Code quality as per Udacity JS style guide (pending)

## Deployment

* Knockout handled list, filter, adding favourite (pending), click event on list
* Seprarate model function for Map marker, marker click events

## Issues during deployment:

* **Error:** Uncaught ReferenceError: google is not defined
  **Solution:** Script or Google Javascript API callback function, or any google.maps.* function is being called before Google Api. Any google function will not be defined until api request is made.
* **Issue:** Multiple InfoWindows will open but content was displayed in the very InfoWindow that was open in the map
  **Solution:** Keep the variable global (var windowInfo), and put defination in ViewModel or callback function
* **Issue:** After closing InfoWindow, it won't open again when clicked on list item or pin
  **Solution:** When used InfoWindow.close(), it removes the InfoWindow from the DOM, i.e. It set the value of global variable var windowInfo = null. We need to re-assign new google.maps.InfoWindow(); after calling close()
* **Deferred update:** When I entered search term in the input bar, it would update map and list only when I enter second letter or second key press. This caused delay and asynchronous update rendering.
  **Solution:** I noticed that when following is used for computed observablearray - value: computedObservableArray, valueUpdate: 'afterkeydown' or 'keydown'. textInput is better approach to get update with computed observablearray. [Source: Browser event quirks handling](http://knockoutjs.com/documentation/textinput-binding.html)


## Resources:
* [KockoutJS](http://knockoutjs.com/)
* [Google Maps Javascript API Documentation](https://developers.google.com/maps/documentation/javascript/reference)
* [StackOverflow](https://stackoverflow.com/questions/10656351/reopen-infowindow-after-its-closed-in-google-map)
* [Knockmeout.net](http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html)
* [Udacity Forums](https://discussions.udacity.com/c/nd001-neighborhood-map-project)
