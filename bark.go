package bark

import (
	"fmt"
	"log"
	"os"

	"github.com/afeiship/go-fetch"
)

type MessageBody struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

const baseURL = "https://api.day.app"

var apiKey = os.Getenv("BARK_SDK_KEY")

func Notify(body *MessageBody) {
	apiURL := fmt.Sprintf("%s/%s", baseURL, apiKey)
	log.Printf("API url: %s", apiURL)
	log.Printf("Sending message to Bark: %s", body)
	fetch.Post(apiURL, &fetch.Config{
		DataType: "json",
		Body:     body,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	})
}
