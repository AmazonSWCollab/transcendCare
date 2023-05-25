package scraper

import (
  "encoding/json"
  "fmt"
  "log"
  "net/http"
	"net/url"
	"io"
  "os"

	"github.com/AmazonSWCollab/transcendCare/providers"
  "github.com/gocolly/colly/v2"
)

type Property struct {
	Accuracy  string `json:"accuracy"`
	Mapbox_id string `json:"mapbox_id"`
}

type GeoCoordinates struct {
	Type        string    `json:"type"`
	Coordinates []float32 `json:"coordinates"`
}

type Context struct {
	Id        string `json:"id"`
	Mapbox_id string `json:"mapbox_id"`
	Text      string `json:"text"`
}

type Feature struct {
	Id         string         `json:"id"`
	Type       string         `json:"type"`
	PlaceType  []string       `json:"place_type"`
	Relevance  float32        `json:"relevance"`
	Properties Property       `json:"properties"`
	Text       string         `json:"text"`
	PlaceName  string         `json:"place_name"`
	Center     []float64      `json:"center"`
	Geometry   GeoCoordinates `json:"geometry"`
	Address    string         `json:"address"`
	Contexts   []Context      `json:"context"`
}


func RunScrape() []providers.Provider {
  // will only be called when the request the store is empty
			URL := "https://www.circlemedical.com/circle-locations"

			c := colly.NewCollector(
				colly.AllowedDomains("www.circlemedical.com", "circlemedical.com"),
				colly.CacheDir(".colly.cache"),
			)

			providerArray := make([]providers.Provider, 0)
			c.OnHTML("a.crm-location-item.w-inline-block", func(e *colly.HTMLElement) {
				p := providers.Provider{}
				p.Title = fmt.Sprintf("Circle Medical - %s", e.ChildText("h1.location"))
				e.ForEach("div.locationspage-icon-text", func(i int, h *colly.HTMLElement) {
					if i == 1 {
						p.Address = h.ChildText("p.paragraph-small")
						return
					}
				})
				escapedSearchText := url.QueryEscape(p.Address)
				// CHANGE THIS TO YOUR MAPBOX API KEY
				path := fmt.Sprintf("https://api.mapbox.com/geocoding/v5/mapbox.places/%s.json?access_token=%s", escapedSearchText, os.Getenv("MAPBOX_TOKEN"))

				mapbox_response, err := http.Get(path)

				if err != nil {
					fmt.Print(err.Error())
					os.Exit(1)
				}

				geodata, err := io.ReadAll(mapbox_response.Body)
				if err != nil {
					log.Fatal(err)
				}
				var result struct {
					Type        string    `json:"type"`
					Query       []string  `json:"query"`
					Features    []Feature `json:"features"`
					Attribution string    `json:"attribuition"`
				}

				json.Unmarshal(geodata, &result)

				for _, r := range result.Features {
					p.Location = r.Center
					break
				}
				// TODO: figure out why the following line doesn't work
				// p.Location = result.Features[0].Center

				providerArray = append(providerArray, p)
			})

			c.OnResponse(func(r *colly.Response) {
				log.Println("Response received", r.StatusCode)
			})

			c.OnError(func(r *colly.Response, err error) {
				log.Println("Error:", r.StatusCode, err)
			})

			c.Visit(URL)

      return providerArray
}
