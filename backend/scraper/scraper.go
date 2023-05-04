package main

import (
	"log"
  "net/http"
  "encoding/json"
  
	"github.com/gocolly/colly/v2"
)

type provider struct {
  Title string
  Address string
}

func handler(w http.ResponseWriter, r *http.Request) {
  URL := "https://www.circlemedical.com/circle-locations"

  c := colly.NewCollector(
		colly.AllowedDomains("www.circlemedical.com", "circlemedical.com"),
	)
  
  providers := make([]provider, 0)
	
  c.OnHTML("a.crm-location-item.w-inline-block", func(e *colly.HTMLElement) {
    p := provider{}
    p.Title = e.ChildText("h1.location")
    e.ForEach("div.locationspage-icon-text", func(i int, h *colly.HTMLElement) {
      if (i == 1) {
        p.Address = h.ChildText("p.paragraph-small")
        return
      }
    })
    providers = append(providers, p)
  })

  c.OnResponse(func(r *colly.Response) {
    log.Println("Response received", r.StatusCode)
  })

  c.OnError(func(r *colly.Response, err error) {
    log.Println("Error:", r.StatusCode, err)
  })
  
  c.Visit(URL)

  b, err := json.Marshal(providers)
  if err != nil {
    log.Println("failed to serialize response:", err)
    return
  }
  w.Header().Add("Content-Type", "application/json")
  w.Write(b)
}

func main() {
  
  addr := ":4041"

  http.HandleFunc("/", handler)

  log.Println("Listening on", addr)
  log.Fatal(http.ListenAndServe(addr, nil))
}

