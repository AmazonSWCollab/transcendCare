package main

import (
  "github.com/AmazonSWCollab/transcedCare/backend/provider/server"
)

func main() {
  err := server.RunApp()
  if err != nil {
    panic(err)
  }
}

