package bark_test

import (
	"fmt"
	"testing"

	"github.com/afeiship/go-bark"
)

func TestNotify(f *testing.T) {
	client := bark.NewClient()

	res, _ := client.Notify(
		&bark.Message{
			Title: "Hello",
			Body:  "This is a test message from go-bark",
		},
	)

	fmt.Println("Response: ", res)
}

// go test ./__tests__ -run ^TestMsg$ -v
func TestMsg(t *testing.T) {
	bark.Msg("Hello, aric", "This is a test message from go-bark with title")
}

// go test ./__tests__ -run ^TestMsgOnlyBody -v
func TestMsgOnlyBody(t *testing.T) {
	bark.Msg("This is a test message from go-bark-only-body")
}
