package bark_test

import (
	"fmt"
	"testing"

	"github.com/afeiship/go-bark"
)

func TestNotify(f *testing.T) {
	client := bark.NewClient()

	res, _ := client.Notify(
		&bark.MessageBody{
			Title: "Hello",
			Body:  "This is a test message from go-bark",
		},
	)

	fmt.Println("Response: ", res)
}

// go test ./__tests__ -run ^TestMsg$ -v
func TestMsg(t *testing.T) {
	bark.Msg("Hello, go-bark", "This is a test message from go-bark")
}
