package bark_test

import (
	"testing"

	"github.com/afeiship/go-bark"
)

func TestNotify(f *testing.T) {
	bark.Notify(&bark.MessageBody{
		Title: "Hello",
		Body:  "This is a test message from go-bark"
	})
}
