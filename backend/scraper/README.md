# Provider Service
This service consists of a Go Fiber API that creates a list of provider objects along with geocoordinates to allow the frontend to then convert to Marker objects on a Mapbox map.
This service uses the MapboxAPI to lookup providers and forwards the geocoordinates obtained to the frontend without storing them in accordance with the terms of service.
To start this service simply navigate to the root directory `/scraper` and run `go run .`. Then in your browser or from a fetch function, make a request to http://127.0.0.1:4041/api/v1/providers.
You will receive a json object with the schema:

```json
[
  {
    "Title": "State - City",
    "Address": "full address",
    "Location": [
      longitude,
      latitude
     ]
  },
  ...
]
```
